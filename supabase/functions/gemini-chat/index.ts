import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, subject, chapter } = await req.json();
    
    if (!question) {
      return new Response(
        JSON.stringify({ error: 'Question is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    console.log('Processing question:', question);
    console.log('Subject:', subject, 'Chapter:', chapter);

    // Prepare system context for Algerian BAC curriculum
    const systemContext = `You are an AI tutor specialized in the Algerian BAC (Baccalauréat) curriculum. 
    IMPORTANT RESPONSE RULES:
    - ALWAYS answer in Arabic with clear structured explanations
    - Keep responses SHORT and DIRECT (maximum 150 words)
    - Use BULLET POINTS instead of long paragraphs
    - When writing mathematical functions, expressions, or equations, format them using LaTeX
    - Wrap inline math with \\( ... \\) and block math with \\[ ... \\]
    - Write all physics/math units in FRENCH (e.g., m/s², kg, N, etc.)
    - Be concise and go straight to the point
    - Provide step-by-step solutions in bullet format
    - Use examples but keep them brief
    - Present content like a teacher explaining in Arabic while showing math symbols and equations neatly
    
    Current context: Subject: ${subject || 'General'}, Chapter: ${chapter || 'General'}`;

    const prompt = `${systemContext}\n\nStudent Question: ${question}\n\nPlease provide a comprehensive answer:`;

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    console.log('Gemini response received');
    
    const aiAnswer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';

    // Store the conversation in database
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Extract user ID from auth header
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      
      if (user) {
        const { error: insertError } = await supabase
          .from('ai_learning_conversations')
          .insert({
            user_id: user.id,
            question_text: question,
            answer_text: aiAnswer,
            subject: subject || null,
            chapter: chapter || null
          });

        if (insertError) {
          console.error('Error storing conversation:', insertError);
        } else {
          console.log('Conversation stored successfully');
        }
      }
    }

    return new Response(
      JSON.stringify({ answer: aiAnswer }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in gemini-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});