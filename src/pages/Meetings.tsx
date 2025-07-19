
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar,
  Clock,
  Users,
  Video,
  Plus,
  Copy,
  ExternalLink,
  Play,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Brain,
  Mic,
  VideoIcon,
  Circle,
  PhoneCall,
  CalendarPlus
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Meeting, CreateMeetingRequest } from "@/types/meeting";
import { 
  createMeetingRoom, 
  joinMeeting, 
  canJoinMeeting, 
  isMeetingLive,
  generateMeetingUrl 
} from "@/services/livekitService";

const Meetings = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
  const [pastMeetings, setPastMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingMeetings, setIsLoadingMeetings] = useState(true);
  
  // Form state for better control
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "60",
    participants: "",
    aiEnabled: true,
    transcriptionEnabled: true,
    recordingEnabled: true,
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  // Load meetings on component mount
  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    setIsLoadingMeetings(true);
    try {
      // TODO: Replace with actual API calls
      // const upcoming = await fetchUpcomingMeetings();
      // const past = await fetchPastMeetings();
      // setUpcomingMeetings(upcoming);
      // setPastMeetings(past);
      
      // For now, set empty arrays
      setUpcomingMeetings([]);
      setPastMeetings([]);
    } catch (error) {
      toast({
        title: "Failed to load meetings",
        description: "There was an error loading your meetings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingMeetings(false);
    }
  };

  const getStatusColor = (status: Meeting['status']) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "live": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "completed": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (meeting: Meeting) => {
    if (meeting.status === "live") {
      return <Circle className="h-2 w-2 fill-green-500 text-green-500 animate-pulse" />;
    }
    return null;
  };

  const copyMeetingLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied!",
      description: "Meeting link has been copied to clipboard.",
    });
  };

  const handleJoinMeeting = async (meeting: Meeting) => {
    if (!canJoinMeeting(meeting) && meeting.status !== "live") {
      toast({
        title: "Cannot join meeting",
        description: "Meeting is not available to join at this time.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // For now, we'll navigate directly to the meeting room
      // In production, this would generate a token first
      navigate(`/meetings/${meeting.id}/room`);
    } catch (error) {
      toast({
        title: "Failed to join meeting",
        description: "There was an error joining the meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartMeeting = async (meeting: Meeting) => {
    setLoading(true);
    try {
      // Update meeting status to live and navigate
      navigate(`/meetings/${meeting.id}/room?host=true`);
    } catch (error) {
      toast({
        title: "Failed to start meeting",
        description: "There was an error starting the meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMeeting = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMeetingData: CreateMeetingRequest = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      duration: `${formData.duration} min`,
      participantEmails: (formData.participants as string).split(",").map(email => email.trim()),
      aiEnabled: formData.aiEnabled,
      transcriptionEnabled: formData.transcriptionEnabled,
      recordingEnabled: formData.recordingEnabled,
    };

    setLoading(true);
    try {
      const newMeeting = await createMeetingRoom(newMeetingData);
      
      // Add the new meeting to the local state immediately
      setUpcomingMeetings(prev => [newMeeting, ...prev]);
      
      toast({
        title: "Meeting scheduled!",
        description: `${newMeeting.title} has been scheduled successfully.`,
      });
      setIsCreateDialogOpen(false);
      
      // Reset the form
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        duration: "60",
        participants: "",
        aiEnabled: true,
        transcriptionEnabled: true,
        recordingEnabled: true,
      });
    } catch (error) {
      toast({
        title: "Failed to create meeting",
        description: "There was an error creating the meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from actual data
  const upcomingCount = upcomingMeetings.filter(m => m.status === "scheduled").length;
  const liveCount = upcomingMeetings.filter(m => m.status === "live").length;
  const totalParticipants = upcomingMeetings.reduce((acc, m) => acc + m.participants.length, 0);
  const totalMeetings = upcomingMeetings.length + pastMeetings.length;

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground">
            Schedule and manage AI-assisted sales meetings
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
              <DialogDescription>
                Create a new AI-assisted sales meeting with video conferencing
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateMeeting} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Meeting Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="Sales Demo - Client Name" 
                  required 
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Meeting objectives and agenda..."
                  className="min-h-[60px]"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    name="date" 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    id="time" 
                    name="time" 
                    type="time" 
                    required 
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input 
                  id="duration" 
                  name="duration" 
                  type="number" 
                  placeholder="60" 
                  required 
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="participants">Participants (comma-separated emails)</Label>
                <Textarea
                  id="participants"
                  name="participants"
                  placeholder="john@client.com, sarah@client.com"
                  className="min-h-[80px]"
                  required
                  value={formData.participants}
                  onChange={(e) => setFormData(prev => ({ ...prev, participants: e.target.value }))}
                />
              </div>
              
              {/* AI Features */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Features
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="aiEnabled">AI Assistant</Label>
                      <p className="text-sm text-muted-foreground">
                        Real-time suggestions and objection handling
                      </p>
                    </div>
                    <Switch 
                      id="aiEnabled" 
                      name="aiEnabled" 
                      defaultChecked={formData.aiEnabled}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, aiEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="transcriptionEnabled">Live Transcription</Label>
                      <p className="text-sm text-muted-foreground">
                        Real-time speech-to-text with speaker identification
                      </p>
                    </div>
                    <Switch 
                      id="transcriptionEnabled" 
                      name="transcriptionEnabled" 
                      defaultChecked={formData.transcriptionEnabled}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, transcriptionEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="recordingEnabled">Meeting Recording</Label>
                      <p className="text-sm text-muted-foreground">
                        Record meeting for later analysis and training
                      </p>
                    </div>
                    <Switch 
                      id="recordingEnabled" 
                      name="recordingEnabled" 
                      defaultChecked={formData.recordingEnabled}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, recordingEnabled: checked }))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Schedule Meeting"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Video className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium">Live Now</p>
                <p className="text-2xl font-bold">{liveCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Total Participants</p>
                <p className="text-2xl font-bold">{totalParticipants}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Total Meetings</p>
                <p className="text-2xl font-bold">{totalMeetings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Meetings</CardTitle>
          <CardDescription>
            Your scheduled AI-assisted sales meetings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingMeetings ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading meetings...</p>
              </div>
            </div>
          ) : upcomingMeetings.length === 0 ? (
            <div className="text-center py-8">
              <CalendarPlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No upcoming meetings</h3>
              <p className="text-muted-foreground mb-4">
                Get started by scheduling your first AI-assisted sales meeting.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Meeting</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingMeetings.map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{meeting.title}</p>
                        <p className="text-sm text-muted-foreground">{meeting.duration}</p>
                        {meeting.description && (
                          <p className="text-xs text-muted-foreground mt-1">{meeting.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{meeting.date}</p>
                        <p className="text-sm text-muted-foreground">{meeting.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {meeting.participants.slice(0, 2).map((participant) => (
                          <p key={participant.id} className="text-sm">{participant.name}</p>
                        ))}
                        {meeting.participants.length > 2 && (
                          <p className="text-sm text-muted-foreground">
                            +{meeting.participants.length - 2} more
                          </p>
                        )}
                        {meeting.status === "live" && meeting.participantCount && (
                          <p className="text-xs text-green-600 font-medium">
                            {meeting.participantCount} joined
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(meeting)}
                        <Badge className={getStatusColor(meeting.status)}>
                          {meeting.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {meeting.aiEnabled && (
                          <Badge variant="secondary" className="text-xs">
                            <Brain className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        )}
                        {meeting.transcriptionEnabled && (
                          <Badge variant="secondary" className="text-xs">
                            <Mic className="h-3 w-3 mr-1" />
                            Transcript
                          </Badge>
                        )}
                        {meeting.recordingEnabled && (
                          <Badge variant="secondary" className="text-xs">
                            <VideoIcon className="h-3 w-3 mr-1" />
                            Record
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyMeetingLink(meeting.meetingUrl)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Link
                        </Button>
                        
                        {meeting.status === "live" ? (
                          <Button 
                            size="sm" 
                            onClick={() => handleJoinMeeting(meeting)}
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <PhoneCall className="h-3 w-3 mr-1" />
                            Join Live
                          </Button>
                        ) : meeting.status === "scheduled" ? (
                          <div className="flex gap-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleJoinMeeting(meeting)}
                              disabled={loading || !canJoinMeeting(meeting)}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Join
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleStartMeeting(meeting)}
                              disabled={loading}
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Start
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/meetings/${meeting.id}/transcript`)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Past Meetings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Meetings</CardTitle>
          <CardDescription>
            Completed meetings with AI insights and recordings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingMeetings ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading past meetings...</p>
              </div>
            </div>
          ) : pastMeetings.length === 0 ? (
            <div className="text-center py-8">
              <Eye className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No past meetings</h3>
              <p className="text-muted-foreground">
                Your completed meetings with AI insights will appear here.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Meeting</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Outcome</TableHead>
                  <TableHead>AI Insights</TableHead>
                  <TableHead>Recording</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastMeetings.map((meeting) => (
                  <TableRow key={meeting.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{meeting.title}</p>
                        <p className="text-sm text-muted-foreground">{meeting.duration}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{meeting.date}</p>
                        <p className="text-sm text-muted-foreground">{meeting.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{meeting.outcome}</p>
                        {meeting.engagementScore && (
                          <p className="text-xs text-muted-foreground">
                            Engagement: {meeting.engagementScore}%
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{meeting.aiSuggestionsCount} suggestions</p>
                        <p className="text-xs text-muted-foreground">AI-powered insights</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {meeting.recording ? (
                        <div>
                          <p className="text-sm font-medium">{meeting.recording.duration}</p>
                          <p className="text-xs text-muted-foreground">{meeting.recording.size}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No recording</p>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/meetings/${meeting.id}/transcript`)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        {meeting.recording && (
                          <Button variant="outline" size="sm">
                            <Play className="h-3 w-3 mr-1" />
                            Play Recording
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Meetings;
