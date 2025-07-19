import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  Settings,
  Users,
  MessageSquare,
  Brain,
  ArrowLeft,
  Copy,
  MoreVertical,
  Volume2,
  VolumeX
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Meeting } from "@/types/meeting";
import { 
  getMeetingDetails, 
  generateLivekitToken, 
  generateRoomName,
  updateMeetingStatus 
} from "@/services/livekitService";

// LiveKit React Components  
import { 
  LiveKitRoom, 
  VideoTrack,
  AudioTrack,
  useParticipants,
  useLocalParticipant,
  useTracks,
  TrackReference
} from '@livekit/components-react';
import { 
  Room, 
  RoomEvent, 
  Track,
  LocalParticipant,
  Participant,
  ConnectionState,
  DisconnectReason
} from 'livekit-client';

import '@livekit/components-styles';
import { LIVEKIT_CONFIG } from '@/config/livekit';

const VideoConferenceRoom = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>("");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(true);

  const isHost = searchParams.get("host") === "true";

  useEffect(() => {
    if (meetingId) {
      loadMeetingAndConnect();
    }
  }, [meetingId]);

  const loadMeetingAndConnect = async () => {
    if (!meetingId) return;
    
    setLoading(true);
    try {
      // Get meeting details
      const meetingData = await getMeetingDetails(meetingId);
      setMeeting(meetingData);
      
      // Generate LiveKit token
      const roomName = generateRoomName(meetingId);
      const participantName = isHost ? "Host" : "Participant";
      const livekitToken = await generateLivekitToken(roomName, participantName, isHost);
      setToken(livekitToken);
      
      // Update meeting status to live if host is starting
      if (isHost) {
        await updateMeetingStatus(meetingId, "live");
      }
      
      toast({
        title: "Connected to meeting",
        description: `Welcome to ${meetingData.title}`,
      });
    } catch (error) {
      console.error("Failed to connect to meeting:", error);
      toast({
        title: "Connection failed",
        description: "Could not connect to the meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveMeeting = async () => {
    if (meetingId && isHost) {
      await updateMeetingStatus(meetingId, "completed");
    }
    navigate("/meetings");
  };

  const copyMeetingLink = () => {
    if (meeting) {
      navigator.clipboard.writeText(meeting.meetingUrl);
      toast({
        title: "Link copied!",
        description: "Meeting link has been copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-300 mt-4">Connecting to meeting...</p>
        </div>
      </div>
    );
  }

  if (!meeting || !token) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 mb-4">Could not connect to the meeting room</p>
          <Button onClick={() => navigate("/meetings")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Meetings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/meetings")}
              className="text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div>
              <h1 className="text-white font-semibold">{meeting.title}</h1>
              <div className="text-gray-400 text-sm flex items-center gap-2">
                <span>Video Conference</span>
                {meeting.aiEnabled && (
                  <Badge variant="secondary" className="text-xs">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Enabled
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyMeetingLink}
              className="text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Test browser audio
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 440;
                gainNode.gain.value = 0.1;
                
                oscillator.start();
                setTimeout(() => oscillator.stop(), 200);
                
                toast({
                  title: "Audio Test",
                  description: "If you heard a beep, your audio output is working",
                });
              }}
              className="text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Test Audio
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setShowParticipants(!showParticipants)}>
                  <Users className="w-4 h-4 mr-2" />
                  {showParticipants ? "Hide" : "Show"} Participants
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowChat(!showChat)}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {showChat ? "Hide" : "Show"} Chat
                </DropdownMenuItem>
                {meeting.aiEnabled && (
                  <DropdownMenuItem onClick={() => setShowAIPanel(!showAIPanel)}>
                    <Brain className="w-4 h-4 mr-2" />
                    {showAIPanel ? "Hide" : "Show"} AI Assistant
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className="flex-1 p-4">
          <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={LIVEKIT_CONFIG.wsURL}
            data-lk-theme="default"
            style={{ height: '100%' }}
            connect={true}
            onConnected={() => {
              console.log('Connected to LiveKit room');
              console.log('🔊 Audio should be enabled for remote participants');
              toast({
                title: "Connected",
                description: "You're now connected to the meeting. Audio from remote participants should be audible.",
              });
            }}
            onDisconnected={(reason) => {
              console.log('Disconnected from LiveKit room:', reason);
              if (reason !== DisconnectReason.CLIENT_INITIATED) {
                toast({
                  title: "Disconnected",
                  description: "You've been disconnected from the meeting",
                  variant: "destructive",
                });
              }
            }}
          >
            {/* Video Grid */}
            <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <VideoComponents />
            </div>
            
            {/* Transcription Overlay */}
            {meeting.transcriptionEnabled && <TranscriptionOverlay />}
          </LiveKitRoom>
        </div>

        {/* AI Assistant Panel */}
        {meeting.aiEnabled && showAIPanel && <AIAssistantPanel />}
      </div>
    </div>
  );
};

// Real video components with LiveKit tracks
const VideoComponents = () => {
  const participants = useParticipants();
  const localParticipant = useLocalParticipant();
  
  // Get camera tracks for all participants
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
  ]);

  // Get audio tracks for remote participants
  const audioTracks = useTracks([
    { source: Track.Source.Microphone, withPlaceholder: false },
  ]);

  return (
    <>
      {/* Render audio tracks for remote participants */}
      {audioTracks
        .filter(track => track.participant.identity !== localParticipant.localParticipant.identity)
        .map((audioTrack) => (
          <AudioTrack 
            key={`audio-${audioTrack.participant.identity}`}
            trackRef={audioTrack as TrackReference}
          />
        ))}

      {/* Render all video tracks */}
      {tracks.map((trackRef) => {
        const isLocal = trackRef.participant.identity === localParticipant.localParticipant.identity;
        
        return (
          <div key={trackRef.participant.identity} className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
            {trackRef.publication ? (
              <VideoTrack 
                trackRef={trackRef as TrackReference}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-xl">
                  {isLocal ? "You" : (trackRef.participant.name?.[0] || trackRef.participant.identity[0] || 'P')}
                </div>
              </div>
            )}
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
              {isLocal ? "You (Local)" : (trackRef.participant.name || trackRef.participant.identity)}
            </div>
            {trackRef.participant.isMicrophoneEnabled === false && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <MicOff className="w-3 h-3 text-white" />
              </div>
            )}
            {/* Audio indicator */}
            {!isLocal && trackRef.participant.isMicrophoneEnabled && (
              <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Volume2 className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        );
      })}
      
      {/* Show placeholder if no tracks */}
      {tracks.length === 0 && (
        <div className="relative bg-gray-700 rounded-lg overflow-hidden aspect-video border-2 border-dashed border-gray-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Camera access needed</p>
              <p className="text-xs text-gray-500 mt-1">Allow camera permission to start video</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Show waiting message if only local participant */}
      {tracks.length === 1 && tracks[0].participant.identity === localParticipant.localParticipant.identity && (
        <div className="relative bg-gray-700 rounded-lg overflow-hidden aspect-video border-2 border-dashed border-gray-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Waiting for participants...</p>
              <p className="text-xs text-gray-500 mt-1">Share the meeting link to invite others</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Transcription overlay component
const TranscriptionOverlay = () => {
  return (
    <div className="lk-transcription-overlay">
      <Card className="bg-black/70 text-white backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Live Transcription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-xs">
          <div className="flex gap-2">
            <span className="text-gray-400">You:</span>
            <span>Hello everyone, welcome to our sales demo today...</span>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-400">Participant:</span>
            <span>Thank you for having us. We're excited to learn more about your solution.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// AI Assistant panel component
const AIAssistantPanel = () => {
  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-blue-400" />
          <h3 className="font-semibold text-white">AI Assistant</h3>
        </div>

        {/* Real-time suggestions */}
        <Card className="bg-gray-900 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">Live Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-2 bg-blue-900/50 rounded text-sm">
              <div className="font-medium text-blue-200">Value Proposition</div>
              <div className="text-gray-300 text-xs">
                "Our solution can reduce your processing time by 40% based on similar implementations."
              </div>
            </div>
            <div className="p-2 bg-green-900/50 rounded text-sm">
              <div className="font-medium text-green-200">Objection Response</div>
              <div className="text-gray-300 text-xs">
                "I understand your concern about integration. Let me show you our plug-and-play setup."
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meeting insights */}
        <Card className="bg-gray-900 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">Meeting Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-gray-300">
            <div>• Participant engagement: High</div>
            <div>• Key topics discussed: Integration, ROI</div>
            <div>• Next action: Demo scheduling</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoConferenceRoom; 