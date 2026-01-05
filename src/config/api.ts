export const API_CONFIG = {
  BASE_URL: 'https://api.allorigins.win/raw?url=http://176.118.198.241:1510',
  ENDPOINTS: {
    BOT_INFO: '/bot-info'
  },
  DEFAULT_HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
} as const;
