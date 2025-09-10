import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageCircle, BookOpen, Lightbulb, Sparkles } from "lucide-react";
import Navigation from "@/components/layout/Navigation";

interface StudyTopic {
  id: string;
  subject: string;
  chapter: string;
  keyConcepts: string[];
  tips: string[];
}

const studyTopics: StudyTopic[] = [
  {
    id: "1",
    subject: "Math",
    chapter: "Limits",
    keyConcepts: [
      "Definition of limits and continuity",
      "L'Hôpital's rule for indeterminate forms",
      "Limit properties and theorems",
      "Infinite limits and limits at infinity"
    ],
    tips: [
      "Practice identifying indeterminate forms first",
      "Master basic limit laws before complex problems",
      "Draw graphs to visualize limit behavior"
    ]
  },
  {
    id: "2", 
    subject: "Physics",
    chapter: "Mechanics",
    keyConcepts: [
      "Newton's three laws of motion",
      "Force analysis and free body diagrams",
      "Kinematic equations for motion",
      "Work, energy, and power relationships"
    ],
    tips: [
      "Always start with a clear free body diagram",
      "Identify all forces before applying equations",
      "Practice unit conversions regularly"
    ]
  }
];

const LearnAI = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [currentTopic, setCurrentTopic] = useState<StudyTopic | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    setSelectedChapter("");
    setCurrentTopic(null);
  };

  const handleChapterChange = (chapter: string) => {
    setSelectedChapter(chapter);
    const topic = studyTopics.find(t => t.subject === selectedSubject && t.chapter === chapter);
    setCurrentTopic(topic || null);
  };

  const handleAskQuestion = () => {
    if (!question.trim()) return;
    
    setChatMessages(prev => [
      ...prev,
      { role: 'user', content: question },
      { role: 'ai', content: `Great question about ${selectedChapter}! Based on the Algerian BAC curriculum, here's a detailed explanation... (AI integration coming soon)` }
    ]);
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Learn with AI
            </h1>
            <p className="text-muted-foreground text-lg">
              Get personalized study guidance powered by artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Select Topic
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedSubject} onValueChange={handleSubjectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Math">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedChapter} onValueChange={handleChapterChange} disabled={!selectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedSubject === "Math" && (
                        <>
                          <SelectItem value="Limits">Limits</SelectItem>
                          <SelectItem value="Derivatives">Derivatives</SelectItem>
                          <SelectItem value="Integrals">Integrals</SelectItem>
                        </>
                      )}
                      {selectedSubject === "Physics" && (
                        <>
                          <SelectItem value="Mechanics">Mechanics</SelectItem>
                          <SelectItem value="Thermodynamics">Thermodynamics</SelectItem>
                          <SelectItem value="Electricity">Electricity</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {currentTopic && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-accent" />
                      Key Concepts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentTopic.keyConcepts.map((concept, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm">{concept}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {currentTopic && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-warning" />
                      Study Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {currentTopic.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    AI Study Assistant
                  </CardTitle>
                  <CardDescription>
                    Ask questions about {selectedChapter || "any topic"} and get detailed explanations
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 bg-muted/20 rounded-lg p-4 mb-4 overflow-y-auto">
                    {chatMessages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                        <div className="space-y-2">
                          <Brain className="h-12 w-12 mx-auto text-primary/50" />
                          <p>Select a topic and ask your first question!</p>
                          <p className="text-sm">I'm here to help you understand BAC concepts step by step.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {chatMessages.map((message, index) => (
                          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-card border'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <Textarea
                      placeholder={selectedChapter ? `Ask a question about ${selectedChapter}...` : "Select a topic first, then ask your question..."}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      disabled={!selectedChapter}
                      className="min-h-[80px]"
                    />
                    <Button 
                      onClick={handleAskQuestion}
                      disabled={!question.trim() || !selectedChapter}
                      className="w-full"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Ask AI Assistant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnAI;