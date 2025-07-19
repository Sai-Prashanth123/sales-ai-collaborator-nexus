export const LIVEKIT_CONFIG = {
  wsURL: import.meta.env.VITE_LIVEKIT_WS_URL || 'wss://gaap-xh71ra4n.livekit.cloud',
  // Note: apiKey and apiSecret should only be used on the backend for security
  // Frontend should only need the WebSocket URL for connections
} as const;

export const MEETING_CONFIG = {
  defaultDuration: '60 min',
  maxParticipants: 10,
  defaultRoomPrefix: 'sales-meeting-',
} as const;

// Production configuration - no more mocks!
export const DEV_CONFIG = {
  useMockData: false,
  mockTokens: false,
  autoJoinAsHost: false,
} as const; 