import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Play,
  Download,
  Share,
  Clock,
  Users,
  Brain,
  Mic,
  Search,
  Calendar,
  VideoIcon,
  TrendingUp,
  MessageSquare,
  Target,
  Lightbulb
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Meeting } from "@/types/meeting";
import { getMeetingDetails } from "@/services/livekitService";

interface TranscriptSegment {
  id: string;
  speaker: string;
  text: string;
  timestamp: string;
  duration: number;
  confidence: number;
}

interface AIInsight {
  id: string;
  type: "objection" | "opportunity" | "sentiment" | "action_item";
  title: string;
  description: string;
  timestamp: string;
  confidence: number;
}

const TranscriptView = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  // Mock transcript data
  const [transcript] = useState<TranscriptSegment[]>([
    {
      id: "1",
      speaker: "Host (You)",
      text: "Hello everyone, thank you for joining our demo today. I'm excited to show you how our AI-powered sales platform can help streamline your sales process.",
      timestamp: "00:00:15",
      duration: 8,
      confidence: 0.98
    },
    {
      id: "2", 
      speaker: "John Smith",
      text: "Thank you for having us. We're particularly interested in understanding how this integrates with our existing CRM system.",
      timestamp: "00:00:23",
      duration: 6,
      confidence: 0.95
    },
    {
      id: "3",
      speaker: "Host (You)",
      text: "Great question! Our platform offers native integrations with over 50 CRM systems including Salesforce, HubSpot, and Pipedrive. We can typically have you up and running within 24 hours.",
      timestamp: "00:00:29",
      duration: 12,
      confidence: 0.97
    },
    {
      id: "4",
      speaker: "Sarah Johnson",
      text: "That sounds promising, but what about the cost? We're a small team and budget is always a concern for us.",
      timestamp: "00:00:41",
      duration: 7,
      confidence: 0.93
    },
    {
      id: "5",
      speaker: "Host (You)",
      text: "I completely understand budget constraints. Let me show you our ROI calculator. Most clients see a return on investment within the first quarter through increased conversion rates and time savings.",
      timestamp: "00:00:48",
      duration: 11,
      confidence: 0.96
    }
  ]);

  const [aiInsights] = useState<AIInsight[]>([
    {
      id: "1",
      type: "objection",
      title: "Budget Concern Raised",
      description: "Sarah expressed budget constraints. Opportunity to present ROI data and flexible pricing options.",
      timestamp: "00:00:41",
      confidence: 0.89
    },
    {
      id: "2",
      type: "opportunity",
      title: "Integration Interest",
      description: "Strong interest in CRM integration capabilities. Good opportunity to schedule technical demo.",
      timestamp: "00:00:23",
      confidence: 0.92
    },
    {
      id: "3",
      type: "action_item",
      title: "Follow-up Required",
      description: "Send ROI calculator and pricing options to Sarah within 24 hours.",
      timestamp: "00:00:48",
      confidence: 0.85
    },
    {
      id: "4",
      type: "sentiment",
      title: "Positive Engagement",
      description: "Overall positive sentiment detected. Participants are engaged and asking relevant questions.",
      timestamp: "00:01:00",
      confidence: 0.94
    }
  ]);

  useEffect(() => {
    if (meetingId) {
      loadMeetingDetails();
    }
  }, [meetingId]);

  const loadMeetingDetails = async () => {
    if (!meetingId) return;
    
    setLoading(true);
    try {
      const meetingData = await getMeetingDetails(meetingId);
      setMeeting(meetingData);
    } catch (error) {
      console.error("Failed to load meeting details:", error);
      toast({
        title: "Failed to load meeting",
        description: "Could not load meeting details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredTranscript = transcript.filter(segment =>
    segment.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.speaker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case "objection": return <Target className="h-4 w-4 text-red-500" />;
      case "opportunity": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "sentiment": return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "action_item": return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      default: return <Brain className="h-4 w-4 text-gray-500" />;
    }
  };

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case "objection": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "opportunity": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "sentiment": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "action_item": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your transcript is being prepared for download.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Meeting transcript link copied to clipboard.",
    });
  };

  const playFromTimestamp = (timestamp: string) => {
    toast({
      title: "Playing from " + timestamp,
      description: "This would start the recording from the selected timestamp.",
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading transcript...</h2>
          <p className="text-muted-foreground">Please wait while we load the meeting details</p>
        </div>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Meeting not found</h2>
          <p className="text-muted-foreground mb-4">Could not load the meeting transcript</p>
          <Button onClick={() => navigate("/meetings")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Meetings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/meetings")}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Meetings
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{meeting.title}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground mt-1">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {meeting.date} at {meeting.time}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {meeting.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {meeting.participants.length} participants
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {meeting.recording && (
            <Button variant="outline" onClick={() => playFromTimestamp("00:00:00")}>
              <Play className="w-4 h-4 mr-2" />
              Play Recording
            </Button>
          )}
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Meeting Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">AI Insights</p>
                <p className="text-2xl font-bold">{aiInsights.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Transcript Lines</p>
                <p className="text-2xl font-bold">{transcript.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Engagement Score</p>
                <p className="text-2xl font-bold">{meeting.engagementScore || 'N/A'}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Outcome</p>
                <p className="text-sm font-semibold">{meeting.outcome || 'Pending'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Transcript */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="h-5 w-5" />
                    Meeting Transcript
                  </CardTitle>
                  <CardDescription>
                    Real-time transcription with speaker identification
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {meeting.transcriptionEnabled && (
                    <Badge variant="secondary">
                      <Mic className="w-3 h-3 mr-1" />
                      Live Transcription
                    </Badge>
                  )}
                  {meeting.aiEnabled && (
                    <Badge variant="secondary">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Analysis
                    </Badge>
                  )}
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search transcript..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {filteredTranscript.map((segment) => (
                <div
                  key={segment.id}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    selectedSegment === segment.id 
                      ? 'bg-primary/10 border-primary' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedSegment(segment.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{segment.speaker}</span>
                      <Badge variant="outline" className="text-xs">
                        {segment.timestamp}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {segment.confidence * 100}% confidence
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        playFromTimestamp(segment.timestamp);
                      }}
                    >
                      <Play className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed">{segment.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Insights
              </CardTitle>
              <CardDescription>
                Automatically generated insights and action items
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-3 rounded-lg border"
                >
                  <div className="flex items-start space-x-2">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <Badge className={getInsightColor(insight.type)} variant="secondary">
                          {insight.type.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {insight.timestamp}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {insight.description}
                      </p>
                      <div className="mt-2">
                        <span className="text-xs text-muted-foreground">
                          Confidence: {Math.round(insight.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Meeting Features */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <VideoIcon className="h-5 w-5" />
                Meeting Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Assistant</span>
                <Badge variant={meeting.aiEnabled ? "default" : "secondary"}>
                  {meeting.aiEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Live Transcription</span>
                <Badge variant={meeting.transcriptionEnabled ? "default" : "secondary"}>
                  {meeting.transcriptionEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Recording</span>
                <Badge variant={meeting.recordingEnabled ? "default" : "secondary"}>
                  {meeting.recordingEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              {meeting.recording && (
                <>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{meeting.recording.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>File size:</span>
                      <span>{meeting.recording.size}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TranscriptView; 