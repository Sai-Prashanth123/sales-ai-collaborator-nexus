import { LIVEKIT_CONFIG, DEV_CONFIG, MEETING_CONFIG } from '@/config/livekit';
import { Meeting, CreateMeetingRequest, JoinMeetingRequest } from '@/types/meeting';

// API base URL - automatically switches between development and production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // In production, API routes are served from the same domain
  : 'http://localhost:3001'; // Local development server

// Generate a unique room name for meetings
export const generateRoomName = (meetingId: string): string => {
  return `${MEETING_CONFIG.defaultRoomPrefix}${meetingId}`;
};

// Generate meeting URL for sharing
export const generateMeetingUrl = (meetingId: string): string => {
  const baseUrl = window.location.origin;
  // Participants should go through the join page first
  return `${baseUrl}/meetings/${meetingId}/join`;
};

// Generate LiveKit token (calls backend API)
export const generateLivekitToken = async (
  roomName: string, 
  participantName: string,
  isHost: boolean = false
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/livekit/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomName,
        participantName,
        isHost,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate LiveKit token');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Token generation error:', error);
    throw new Error('Unable to generate access token');
  }
};

// Create a new meeting room
export const createMeetingRoom = async (meetingData: CreateMeetingRequest): Promise<Meeting> => {
  const meetingId = `meeting-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const roomName = generateRoomName(meetingId);
  
  try {
    // Create room on LiveKit server
    const roomResponse = await fetch(`${API_BASE_URL}/api/livekit/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomName,
        maxParticipants: MEETING_CONFIG.maxParticipants,
      }),
    });

    if (!roomResponse.ok) {
      throw new Error('Failed to create LiveKit room');
    }

    const newMeeting: Meeting = {
      id: meetingId,
      title: meetingData.title,
      description: meetingData.description,
      date: meetingData.date,
      time: meetingData.time,
      duration: meetingData.duration,
      status: "scheduled",
      participants: [],
      participantCount: 0,
      meetingUrl: generateMeetingUrl(meetingId),
      roomName,
      aiEnabled: meetingData.aiEnabled,
      transcriptionEnabled: meetingData.transcriptionEnabled,
      recordingEnabled: meetingData.recordingEnabled,
    };

    // Save meeting to backend
    const meetingResponse = await fetch(`${API_BASE_URL}/api/meetings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMeeting),
    });

    if (!meetingResponse.ok) {
      throw new Error('Failed to save meeting');
    }

    return newMeeting;
  } catch (error) {
    console.error('Failed to create meeting:', error);
    throw new Error('Unable to create meeting room');
  }
};

// Get meeting details
export const getMeetingDetails = async (meetingId: string): Promise<Meeting> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meetings/${meetingId}`);
    
    if (!response.ok) {
      throw new Error('Meeting not found');
    }

    const meeting = await response.json();
    return meeting;
  } catch (error) {
    console.error('Failed to get meeting details:', error);
    // Return a placeholder meeting for now - in production this should fail
    return {
      id: meetingId,
      title: "Sales Demo Meeting",
      description: "Video conference with AI transcription",
      date: new Date().toISOString().split('T')[0],
      time: "14:00",
      duration: "60 min",
      status: "scheduled",
      participants: [],
      participantCount: 0,
      meetingUrl: generateMeetingUrl(meetingId),
      roomName: generateRoomName(meetingId),
      aiEnabled: true,
      transcriptionEnabled: true,
      recordingEnabled: true,
    };
  }
};

// Join a meeting room
export const joinMeetingRoom = async (joinData: JoinMeetingRequest): Promise<string> => {
  const roomName = generateRoomName(joinData.meetingId);
  return await generateLivekitToken(roomName, joinData.participantName, false);
};

// Update meeting status
export const updateMeetingStatus = async (meetingId: string, status: Meeting['status']): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/meetings/${meetingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update meeting status');
    }

    console.log(`Meeting ${meetingId} status updated to ${status}`);
  } catch (error) {
    console.error('Failed to update meeting status:', error);
    // For now, just log the status change
    console.log(`Would update meeting ${meetingId} status to ${status}`);
  }
};

// Utility function to check if a meeting can be joined
export const canJoinMeeting = (meeting: Meeting): boolean => {
  const now = new Date();
  const meetingDateTime = new Date(`${meeting.date}T${meeting.time}`);
  const timeDiff = now.getTime() - meetingDateTime.getTime();
  
  // Allow joining 15 minutes before and up to the duration after start time
  const fifteenMinutes = 15 * 60 * 1000;
  const durationMs = parseInt(meeting.duration) * 60 * 1000; // Assuming duration is in minutes
  
  return timeDiff >= -fifteenMinutes && timeDiff <= durationMs;
};

// Check if meeting is currently live
export const isMeetingLive = (meeting: Meeting): boolean => {
  return meeting.status === 'live' && meeting.isLive === true;
}; 