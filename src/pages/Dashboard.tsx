// chmqp dashboard enjoy
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Users, Shield, Music, Crown, Bot, Server, Wrench, AlertTriangle } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { DiscordService } from '../services/discordService';
import { DiscordUser, DiscordGuild } from '../types/discord';

export default function Dashboard() {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [guilds, setGuilds] = useState<DiscordGuild[]>([]);
  const [selectedGuild, setSelectedGuild] = useState<DiscordGuild | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('discord_token');
    if (!token) {
      navigate('/dashboard/login');
      return;
    }

    loadUserData(token);
  }, [navigate]);

  const loadUserData = async (token: string) => {
    try {
      setIsLoading(true);
      const [userData, guildsData] = await Promise.all([
        DiscordService.getCurrentUser(token),
        DiscordService.getUserGuilds(token)
      ]);
      
      setUser(userData);
      setGuilds(guildsData.filter(guild => 
        (parseInt(guild.permissions) & 0x20) === 0x20 // MANAGE_GUILD permission
      ));
    } catch (err) {
      setError('Failed to load dashboard data');
      localStorage.removeItem('discord_token');
      navigate('/dashboard/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('discord_token');
    setUser(null);
    setGuilds([]);
    setSelectedGuild(null);
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mesh text-white">
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="glass rounded-2xl p-12">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">Loading Dashboard...</h2>
              <p className="text-gray-400">Please wait while we fetch your data</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-mesh text-white">
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="glass rounded-2xl p-12">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
              <p className="text-gray-400 mb-6">{error}</p>
              <button
                onClick={() => navigate('/dashboard/login')}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* User Header */}
          <div className="glass rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={user ? DiscordService.getAvatarUrl(user) : '/default-avatar.png'}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full border-2 border-blue-500/20"
                />
                <div>
                  <h1 className="text-2xl font-bold">
                    Welcome back, {user?.username}!
                  </h1>
                  <p className="text-gray-400">
                    Manage your servers and bot settings
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Server List */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Server className="w-5 h-5 text-blue-500" />
                  Your Servers
                </h2>
                <div className="space-y-3">
                  {guilds.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                      No servers found with manage permissions
                    </p>
                  ) : (
                    guilds.map((guild) => (
                      <button
                        key={guild.id}
                        onClick={() => setSelectedGuild(guild)}
                        className={`w-full p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                          selectedGuild?.id === guild.id
                            ? 'bg-blue-500/20 border border-blue-500/30'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <img
                          src={DiscordService.getGuildIconUrl(guild)}
                          alt={guild.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium truncate">
                          {guild.name}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {selectedGuild ? (
                <div className="space-y-6">
                  {/* Server Header */}
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={DiscordService.getGuildIconUrl(selectedGuild)}
                        alt={selectedGuild.name}
                        className="w-16 h-16 rounded-full border-2 border-blue-500/20"
                      />
                      <div>
                        <h2 className="text-2xl font-bold">{selectedGuild.name}</h2>
                        <p className="text-gray-400">Server ID: {selectedGuild.id}</p>
                      </div>
                    </div>

                    {/* Work in Progress Notice */}
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <Wrench className="w-5 h-5 text-yellow-500" />
                        <div>
                          <h3 className="font-semibold text-yellow-400">Work in Progress</h3>
                          <p className="text-sm text-gray-300">
                            This dashboard is currently under development. More features coming soon!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <FeatureCard
                        icon={Settings}
                        title="General Settings"
                        description="Configure basic bot settings"
                        status="Coming Soon"
                        gradient="from-blue-500 to-indigo-500"
                      />
                      <FeatureCard
                        icon={Shield}
                        title="Moderation"
                        description="Auto-mod and moderation tools"
                        status="Coming Soon"
                        gradient="from-indigo-500 to-purple-500"
                      />
                      <FeatureCard
                        icon={Music}
                        title="Music Settings"
                        description="Configure music preferences"
                        status="Coming Soon"
                        gradient="from-purple-500 to-pink-500"
                      />
                      <FeatureCard
                        icon={Users}
                        title="Welcome System"
                        description="Setup welcome messages"
                        status="Coming Soon"
                        gradient="from-pink-500 to-rose-500"
                      />
                      <FeatureCard
                        icon={Crown}
                        title="Premium Features"
                        description="Access premium settings"
                        status="Coming Soon"
                        gradient="from-rose-500 to-orange-500"
                      />
                      <FeatureCard
                        icon={Bot}
                        title="AI Configuration"
                        description="Configure AI responses"
                        status="Coming Soon"
                        gradient="from-orange-500 to-yellow-500"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass rounded-2xl p-12 text-center">
                  <Server className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Select a Server</h2>
                  <p className="text-gray-400">
                    Choose a server from the left sidebar to manage its settings
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  status: string;
  gradient: string;
}

function FeatureCard({ icon: Icon, title, description, status, gradient }: FeatureCardProps) {
  return (
    <div className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer">
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10 mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-3">{description}</p>
      <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
        {status}
      </span>
    </div>
  );
}