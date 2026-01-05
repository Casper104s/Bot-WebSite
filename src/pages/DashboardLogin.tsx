// chmqp dashboard enjoy
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Shield, Zap, ArrowRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { DiscordService } from '../services/discordService';

export default function DashboardLogin() {
  const handleDiscordLogin = () => {
    window.location.href = DiscordService.getAuthUrl();
  };

  return (
    <div className="min-h-screen bg-mesh text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="relative mb-12">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-[120px] animate-pulse-slow" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-0.5 mb-6 animate-float">
                  <div className="w-full h-full rounded-full glass flex items-center justify-center">
                    <Bot className="w-10 h-10 text-blue-400" />
                  </div>
                </div>
                
                <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  Dashboard Access
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                  Connect with Discord to manage your servers and configure Razor Bot settings
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-6">Why Connect with Discord?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-blue-500/10 mb-4">
                    <Shield className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Secure Access</h3>
                  <p className="text-sm text-gray-400">
                    OAuth2 authentication ensures your account stays secure
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-purple-500/10 mb-4">
                    <Bot className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Server Management</h3>
                  <p className="text-sm text-gray-400">
                    Manage all your servers with Razor Bot in one place
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-pink-500/10 mb-4">
                    <Zap className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-semibold mb-2">Easy Configuration</h3>
                  <p className="text-sm text-gray-400">
                    Configure bot settings with an intuitive interface
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <button
                onClick={handleDiscordLogin}
                className="relative overflow-hidden group px-8 py-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/10 hover:shadow-[0_0_2rem_-0.5rem_#3b82f6] transition-all duration-300 text-white font-semibold text-lg flex items-center gap-3 backdrop-blur-xl mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  Login with Discord
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              <p className="text-sm text-gray-400">
                Don't have Razor Bot in your server yet?{' '}
                <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Add it now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}