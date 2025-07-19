export const LIVEKIT_CONFIG = {
  wsURL: 'wss://gaap-xh71ra4n.livekit.cloud',
  apiKey: 'APIYT4h6NUqk4TF',
  apiSecret: 'eJUnjALM2DEyZKf90BjfPdlfoOikZyIjd6Pf1RtnTqmB',
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