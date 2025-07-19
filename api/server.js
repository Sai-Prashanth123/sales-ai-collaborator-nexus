const express = require('express');
const cors = require('cors');
const { AccessToken } = require('livekit-server-sdk');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// LiveKit configuration from environment variables
const LIVEKIT_CONFIG = {
  wsURL: process.env.LIVEKIT_WS_URL || 'wss://gaap-xh71ra4n.livekit.cloud',
  apiKey: process.env.LIVEKIT_API_KEY || 'APIYT4h6NUqk4TF',
  apiSecret: process.env.LIVEKIT_API_SECRET || 'eJUnjALM2DEyZKf90BjfPdlfoOikZyIjd6Pf1RtnTqmB',
};

console.log('🚀 LiveKit Config:', {
  wsURL: LIVEKIT_CONFIG.wsURL,
  apiKey: LIVEKIT_CONFIG.apiKey,
  apiSecretLength: LIVEKIT_CONFIG.apiSecret.length
});

// In-memory storage for development (use a database in production)
const meetings = new Map();

// Generate LiveKit token
app.post('/livekit/token', async (req, res) => {
  try {
    const { roomName, participantName, isHost } = req.body;
    
    console.log('📝 Token request:', { roomName, participantName, isHost });

    if (!roomName || !participantName) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    console.log('🔑 Creating token with config:', {
      apiKey: LIVEKIT_CONFIG.apiKey,
      serverUrl: LIVEKIT_CONFIG.wsURL
    });

    const token = new AccessToken(LIVEKIT_CONFIG.apiKey, LIVEKIT_CONFIG.apiSecret, {
      identity: participantName,
    });

    // Grant permissions
    token.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
      roomAdmin: isHost,
    });

    const jwt = await token.toJwt();
    
    console.log('✅ Generated JWT token:', {
      tokenType: typeof jwt,
      hasToken: !!jwt,
      tokenStart: jwt ? String(jwt).substring(0, 50) + '...' : 'null'
    });
    
    res.json({ token: jwt });
  } catch (error) {
    console.error('❌ Error generating token:', error);
    res.status(500).json({ error: 'Failed to generate token: ' + error.message });
  }
});

// Create LiveKit room
app.post('/livekit/rooms', async (req, res) => {
  try {
    const { roomName, maxParticipants } = req.body;
    
    // In a real implementation, you would create the room on LiveKit server
    // For now, we'll just acknowledge the request
    console.log(`Creating room: ${roomName} with max participants: ${maxParticipants}`);
    
    res.json({ 
      success: true, 
      roomName,
      message: 'Room created successfully' 
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// Create meeting
app.post('/meetings', (req, res) => {
  try {
    const meeting = {
      ...req.body,
      id: req.body.id || `meeting-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    meetings.set(meeting.id, meeting);
    
    res.json(meeting);
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ error: 'Failed to create meeting' });
  }
});

// Get meeting details
app.get('/meetings/:id', (req, res) => {
  try {
    const { id } = req.params;
    const meeting = meetings.get(id);
    
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }
    
    res.json(meeting);
  } catch (error) {
    console.error('Error getting meeting:', error);
    res.status(500).json({ error: 'Failed to get meeting' });
  }
});

// Update meeting status
app.patch('/meetings/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const meeting = meetings.get(id);
    if (!meeting) {
      return res.status(404).json({ error: 'Meeting not found' });
    }
    
    const updatedMeeting = {
      ...meeting,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    meetings.set(id, updatedMeeting);
    
    res.json(updatedMeeting);
  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ error: 'Failed to update meeting' });
  }
});

// Test endpoint for debugging
app.get('/test-token', async (req, res) => {
  try {
    console.log('🧪 Test token generation...');
    
    const token = new AccessToken(LIVEKIT_CONFIG.apiKey, LIVEKIT_CONFIG.apiSecret, {
      identity: 'test-user',
    });

    token.addGrant({
      room: 'test-room',
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });

    const jwt = await token.toJwt();
    
    console.log('✅ Test JWT generated:', {
      tokenType: typeof jwt,
      hasToken: !!jwt,
      tokenStart: jwt ? String(jwt).substring(0, 50) + '...' : 'null'
    });
    
    res.json({ 
      success: true,
      token: jwt,
      tokenType: typeof jwt,
      hasToken: !!jwt
    });
  } catch (error) {
    console.error('❌ Test token error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Root route for API
app.get('/', (req, res) => {
  res.json({ 
    message: 'Sales AI Collaborator API',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/health',
      '/livekit/token',
      '/livekit/rooms',
      '/meetings',
      '/meetings/:id',
      '/test-token'
    ]
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Only start server if not in serverless environment (for local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`LiveKit API server running at http://localhost:${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
  });
}

module.exports = app; 