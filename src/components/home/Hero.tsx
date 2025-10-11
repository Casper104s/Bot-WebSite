import React, { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';

interface BotInfo {
  success: boolean;
  bot: {
    username: string;
    avatar: string;
    discriminator: string;
  };
  stats: {
    guilds: number;
    users: number;
    commands: number;
    uptime: number;
  };
  features: {
    music: boolean;
    moderation: boolean;
    economy: boolean;
  };
}

export function Hero() {
  const [botInfo, setBotInfo] = useState<BotInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBotInfo = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const targetUrl = 'http://176.118.198.241:1510/bot-info';
        
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const data: BotInfo = await response.json();
        
        setBotInfo(data);
      } catch (error) {
        console.error('Error fetching bot info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBotInfo();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-100 p-4 rounded-full">
            <Bot className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
          Your Ultimate
          <span className="text-blue-600 block">Discord Bot</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Powerful, feature-rich Discord bot with music, moderation, economy, and more. 
          Enhance your server experience with seamless integration.
        </p>

        {/* Bot Stats Display */}
        {!loading && botInfo && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{botInfo.stats.guilds}</div>
              <div className="text-sm text-gray-600">Servers</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{botInfo.stats.users}</div>
              <div className="text-sm text-gray-600">Users</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">{botInfo.stats.commands}</div>
              <div className="text-sm text-gray-600">Commands</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-blue-600">
                {Math.floor(botInfo.stats.uptime / 3600)}h
              </div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        )}

        {loading && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="text-gray-600">Loading bot statistics...</div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Add to Discord
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            View Commands
          </button>
        </div>
      </div>
    </section>
  );
}
