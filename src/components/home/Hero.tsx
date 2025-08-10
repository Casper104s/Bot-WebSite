import { Bot, Sparkles, Users, Server, Gauge, ArrowRight, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site.config';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-32 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/30 via-purple-500/25 to-pink-500/20 rounded-full blur-[150px] animate-pulse-slow" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-[60px] animate-float-delayed" />
        <div className="absolute top-3/4 left-3/4 w-32 h-32 bg-pink-500/15 rounded-full blur-[40px] animate-float" style={{ animationDelay: '1s' }} />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse" style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Enhanced Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6 animate-fade-in">
            <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-gray-300">Next-Generation Discord Bot</span>
            <Zap className="w-4 h-4 text-blue-400" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 relative">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300% relative">
              {siteConfig.botName}
            </span>
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl -z-10 animate-pulse-slow" />
          </h1>
        </div>

        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          {siteConfig.botDescription}
        </p>

        {/* Enhanced Bot Avatar */}
        <div className="relative mx-auto mb-6 group">
          <div className="w-32 h-32 rounded-full glass flex items-center justify-center mx-auto shadow-2xl border border-white/20 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/10 overflow-hidden relative group-hover:scale-105 transition-all duration-500">
            {/* Rotating border effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" style={{ padding: '2px' }}>
              <div className="w-full h-full rounded-full bg-gray-900" />
            </div>
            
            {siteConfig.botAvatarUrl ? (
              <img
                src={siteConfig.botAvatarUrl}
                alt={siteConfig.botName + ' avatar'}
                className="w-full h-full object-cover rounded-full border-4 border-white/10 shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <Bot className="w-16 h-16 text-white drop-shadow-lg relative z-10 group-hover:rotate-12 transition-transform duration-500" />
            )}
          </div>
          
          {/* Pulsing rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-blue-500/30 animate-ping opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-purple-500/20 animate-ping opacity-10" style={{ animationDelay: '1s' }} />
        </div>

        {/* Enhanced Status Badge */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass text-sm font-medium border border-green-500/20 bg-green-500/5">
            <div className="relative">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse block" />
              <span className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
            </div>
            <span className="text-gray-300">Online & Ready</span>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-green-400 font-semibold">{siteConfig.totalServers}+ Servers</span>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <a
            href="#"
            className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-[0_0_2rem_-0.5rem_#3b82f6] transition-all duration-500 text-white font-semibold text-base flex items-center gap-3 transform hover:scale-105 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-3">
              <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Add to Discord
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </a>
          
          {siteConfig.features.enableCommands && (
            <Link
              to="/commands"
              className="group relative overflow-hidden px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-500 text-white font-semibold text-base flex items-center gap-3 backdrop-blur-xl transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative flex items-center gap-3">
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                View Commands
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          )}
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto relative z-10 mb-16">
          <div className="group text-center transform hover:scale-110 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 mb-3 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 border-0">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-300 mb-1">{siteConfig.totalUsers}K+</div>
            <div className="text-xs text-gray-400 font-medium">Active Users</div>
          </div>
          
          <div className="group text-center transform hover:scale-110 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/20 mb-3 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 border-0">
              <Server className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-purple-300 mb-1">{siteConfig.totalServers}+</div>
            <div className="text-xs text-gray-400 font-medium">Servers</div>
          </div>
          
          <div className="group text-center transform hover:scale-110 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-600/20 mb-3 group-hover:shadow-lg group-hover:shadow-pink-500/25 transition-all duration-300 border-0">
              <Gauge className="w-6 h-6 text-pink-400" />
            </div>
            <div className="text-2xl font-bold text-pink-300 mb-1">99.9%</div>
            <div className="text-xs text-gray-400 font-medium">Uptime</div>
          </div>
          
          <div className="group text-center transform hover:scale-110 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/20 mb-3 group-hover:shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300 border-0">
              <Bot className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-indigo-300 mb-1">v{siteConfig.botVersion}</div>
            <div className="text-xs text-gray-400 font-medium">Version</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}