import { useState, useEffect } from 'react';

export interface BotInfo {
  success: boolean;
  bot: {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    createdAt: string;
    verified: boolean;
  };
  stats: {
    guilds: number;
    users: number;
    channels: number;
    commands: number;
    uptime: number;
    memory: number;
    ping: number;
  };
  features: {
    music: boolean;
    moderation: boolean;
    economy: boolean;
    leveling: boolean;
    welcome: boolean;
    tickets: boolean;
  };
  presence: {
    status: string;
    activities: Array<{
      name: string;
      type: number;
      state?: string;
      details?: string;
    }>;
  };
  version: {
    node: string;
    discordjs: string;
    platform: string;
  };
}

export function useBotInfo() {
  const [botData, setBotData] = useState<BotInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBotInfo = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const targetUrl = 'http://176.118.198.241:1510/bot-info';
        
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: BotInfo = await response.json();
        setBotData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBotInfo();
  }, []);

  return { botData, loading, error };
}
