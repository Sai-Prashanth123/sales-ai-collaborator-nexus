export interface Participant {
  id: string;
  email: string;
  name: string;
  role: "host" | "participant";
  joinedAt?: string;
  isOnline?: boolean;
  hasVideo?: boolean;
  hasAudio?: boolean;
}

export interface AISuggestion {
  id: string;
  type: "objection_response" | "follow_up" | "value_prop" | "closing";
  title: string;
  text: string;
  confidence: number;
  timestamp: string;
  used?: boolean;
}

export interface TranscriptionSegment {
  id: string;
  participantId: string;
  participantName: string;
  text: string;
  timestamp: string;
  isFinal: boolean;
  confidence?: number;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: string;
  participants: Participant[];
  status: "scheduled" | "live" | "completed" | "cancelled";
  
  // LiveKit Integration
  roomName: string;
  meetingUrl: string;
  livekitToken?: string;
  
  // AI Features
  aiEnabled: boolean;
  transcriptionEnabled: boolean;
  recordingEnabled: boolean;
  
  // Live Meeting Data
  isLive?: boolean;
  participantCount?: number;
  startedAt?: string;
  
  // Post-Meeting Data
  aiSuggestions?: AISuggestion[];
  aiSuggestionsCount?: number;
  outcome?: string;
  transcriptSummary?: string;
  recording?: {
    url: string;
    duration: string;
    size: string;
  };
  
  // Meeting Analytics
  engagementScore?: number;
  talkTimeDistribution?: Record<string, number>;
  keyMoments?: Array<{
    timestamp: string;
    type: "objection" | "interest" | "decision_point";
    description: string;
  }>;
}

export interface CreateMeetingRequest {
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: string;
  participantEmails: string[];
  aiEnabled: boolean;
  transcriptionEnabled: boolean;
  recordingEnabled: boolean;
}

export interface JoinMeetingRequest {
  meetingId: string;
  participantName: string;
  participantEmail: string;
}

export interface MeetingStats {
  totalMeetings: number;
  liveMeetings: number;
  scheduledMeetings: number;
  completedMeetings: number;
  averageDuration: string;
  successRate: number;
}

export type MeetingStatus = Meeting['status'];
export type ParticipantRole = Participant['role'];
export type AISuggestionType = AISuggestion['type']; 