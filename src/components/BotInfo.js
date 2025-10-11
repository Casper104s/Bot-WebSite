import React, { useState, useEffect } from 'react';

function BotInfo() {
  const [botData, setBotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBotInfo = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const targetUrl = 'http://176.118.198.241:1510/bot-info';
        
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const data = await response.json();
        
        setBotData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBotInfo();
  }, []);

  if (loading) return <div>Loading bot information...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!botData) return <div>No data found</div>;

  return (
    <div className="bot-info">
      <h2>{botData.bot.username}</h2>
      <img src={botData.bot.avatar} alt="Bot Avatar" />
      <p>Servers: {botData.stats.guilds}</p>
      <p>Users: {botData.stats.users}</p>
      <p>Uptime: {Math.floor(botData.stats.uptime / 60)} minutes</p>
    </div>
  );
}

export default BotInfo;
