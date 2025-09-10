import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle, Crown, Youtube } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useActivityTracking } from "@/hooks/useActivityTracking";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface Video {
  id: string;
  title: string;
  subject: string;
  chapter?: string;
  type: "youtube" | "premium";
  url?: string;
  file_path?: string;
  duration?: number;
  watched?: boolean;
}

const Videos = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoProgress, setVideoProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const { trackVideoActivity } = useActivityTracking();
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    fetchVideos();
    if (user) {
      fetchVideoProgress();
    }
  }, [user]);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: "Error",
        description: "Failed to load videos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchVideoProgress = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('video_progress')
        .select('video_id, watched')
        .eq('student_id', user.id);

      if (error) throw error;
      
      const progressMap: Record<string, boolean> = {};
      data?.forEach(progress => {
        progressMap[progress.video_id] = progress.watched;
      });
      setVideoProgress(progressMap);
    } catch (error) {
      console.error('Error fetching video progress:', error);
    }
  };

  const handleWatchVideo = async (video: Video) => {
    if (!user) return;

    console.log('User watching video:', video.title);

    // Track video activity first
    try {
      await trackVideoActivity(
        video.id,
        "started",
        video.title,
        video.subject,
        video.chapter
      );
    } catch (error) {
      console.error('Error tracking video activity:', error);
    }

    // Open video based on device and type
    if (video.url) {
      try {
        // For YouTube videos, create an embedded player or open in popup
        if (video.type === 'youtube') {
          // Extract video ID from URL
          let videoId = '';
          if (video.url.includes('youtube.com/watch?v=')) {
            videoId = video.url.split('v=')[1]?.split('&')[0];
          } else if (video.url.includes('youtu.be/')) {
            videoId = video.url.split('youtu.be/')[1]?.split('?')[0];
          }
          
          if (videoId) {
            // Direct link to YouTube without embedding to avoid blocking
            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
            window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
          } else {
            // Fallback: just open the URL
            window.open(video.url, '_blank', 'noopener,noreferrer');
          }
          
          // Update video progress after opening
          try {
            const { error } = await supabase
              .from('video_progress')
              .upsert({
                student_id: user.id,
                video_id: video.id,
                watched: true,
                completed_at: new Date().toISOString()
              }, {
                onConflict: 'student_id,video_id'
              });

            if (error) throw error;
            
            // Update local state
            setVideoProgress(prev => ({
              ...prev,
              [video.id]: true
            }));

            // Track video completion for scoring
            console.log('Marking video as completed:', video.title);
            await trackVideoActivity(
              video.id,
              "completed",
              video.title,
              video.subject,
              video.chapter
            );

            toast({
              title: "Success",
              description: "Video opened and progress tracked!",
            });

          } catch (error) {
            console.error('Error updating video progress:', error);
          }
        } else {
          // For premium videos, handle file storage
          const { data } = await supabase.storage
            .from('videos')
            .createSignedUrl(video.file_path || '', 3600);

          if (data?.signedUrl) {
            window.open(data.signedUrl, '_blank', 'noopener,noreferrer');
          } else {
            throw new Error('Failed to get video URL');
          }
        }
      } catch (error) {
        console.error('Error opening video:', error);
        toast({
          title: "Error",
          description: "Failed to open video. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Video Unavailable",
        description: "This video is not available at the moment.",
        variant: "destructive",
      });
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "Unknown";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const filteredVideos = videos.filter(video => {
    return (!selectedSubject || selectedSubject === "all" || video.subject === selectedSubject) &&
           (!selectedChapter || selectedChapter === "all" || video.chapter === selectedChapter) &&
           (!selectedType || selectedType === "all" || video.type === selectedType);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Educational Videos
            </h1>
            <p className="text-muted-foreground text-lg">
              Learn from structured video content and expert explanations
            </p>
          </div>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" />
                Filter Videos
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Math">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Chapter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chapters</SelectItem>
                  <SelectItem value="Limits">Limits</SelectItem>
                  <SelectItem value="Mechanics">Mechanics</SelectItem>
                  <SelectItem value="Derivatives">Derivatives</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Video Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="youtube">Free (YouTube)</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 border-primary/10 overflow-hidden">
                  <div className="relative">
                    <img 
                      src="/placeholder.svg"
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute top-2 right-2">
                      {video.type === "premium" ? (
                        <Badge variant="default" className="gap-1 bg-gradient-to-r from-warning to-accent text-white">
                          <Crown className="h-3 w-3" />
                          Premium
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-background/80 gap-1">
                          <Youtube className="h-3 w-3" />
                          Free
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="bg-black/70 text-white">
                        {formatDuration(video.duration)}
                      </Badge>
                    </div>
                    {videoProgress[video.id] && (
                      <div className="absolute top-2 left-2">
                        <CheckCircle className="h-6 w-6 text-success bg-background rounded-full" />
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                    <CardDescription>
                      {video.subject} • {video.chapter || "General"}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <Button 
                      onClick={() => handleWatchVideo(video)}
                      className={`w-full ${video.type === "premium" ? "bg-gradient-to-r from-warning to-accent text-white" : ""}`}
                      variant="default"
                      disabled={video.type === "premium" && false} // TODO: Check user premium status
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {videoProgress[video.id] ? "Watch Again" : "Watch Video"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {filteredVideos.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">No videos found matching your filters.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Videos;