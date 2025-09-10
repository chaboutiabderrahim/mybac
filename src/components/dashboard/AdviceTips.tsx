import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, BookOpen, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdviceTip {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: number;
}

const AdviceTips = () => {
  const [tips, setTips] = useState<AdviceTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      // Get today's date as a seed for randomness
      const today = new Date();
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
      
      const { data, error } = await supabase
        .from('advice_tips')
        .select('*')
        .eq('active', true);

      if (error) {
        console.error('Error fetching tips:', error);
        return;
      }

      if (data && data.length > 0) {
        // Use day of year as seed for consistent daily randomness
        const shuffled = [...data].sort(() => 0.5 - Math.sin(dayOfYear * 9999));
        setTips(shuffled.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Study Tips':
        return <BookOpen className="h-4 w-4" />;
      case 'Wellness':
        return <Heart className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Study Tips':
        return 'bg-blue-100 text-blue-700';
      case 'Wellness':
        return 'bg-green-100 text-green-700';
      case 'Exam Preparation':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-warning" />
            Daily Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">Loading tips...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-warning" />
          Daily Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tips.map((tip) => (
          <div key={tip.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm">{tip.title}</h4>
              <Badge className={`text-xs ${getCategoryColor(tip.category)}`}>
                <div className="flex items-center gap-1">
                  {getCategoryIcon(tip.category)}
                  {tip.category}
                </div>
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {tip.content}
            </p>
          </div>
        ))}
        {tips.length === 0 && (
          <div className="text-center text-muted-foreground text-sm">
            No tips available at the moment
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdviceTips;