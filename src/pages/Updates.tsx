import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, Sparkles, Star, Zap, Settings, CheckCircle, AlertTriangle, Shield, Plus, ArrowRight, Calendar, Tag, User, GitBranch } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { updates, UpdateChange } from '../config/updates.config';

const getChangeIcon = (type: UpdateChange['type']) => {
  switch (type) {
    case 'feature':
      return <Plus className="w-4 h-4 text-blue-500" />;
    case 'fix':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'improvement':
      return <Zap className="w-4 h-4 text-purple-500" />;
    case 'security':
      return <Shield className="w-4 h-4 text-red-500" />;
    default:
      return <Sparkles className="w-4 h-4 text-gray-500" />;
  }
};

const getChangeColor = (type: UpdateChange['type']) => {
  switch (type) {
    case 'feature':
      return 'from-blue-500 to-indigo-500';
    case 'fix':
      return 'from-green-500 to-emerald-500';
    case 'improvement':
      return 'from-purple-500 to-pink-500';
    case 'security':
      return 'from-red-500 to-rose-500';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

export default function Updates() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const totalUpdates = updates.length;
  const totalChanges = updates.reduce((total, update) => total + update.changes.length, 0);
  const latestUpdate = updates[0];

  return (
    <div className="min-h-screen bg-mesh text-white">
      <Header />
      
      <main className="w-full pt-32 pb-20 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-[150px]" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 -z-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6 animate-fade-in">
              <GitBranch className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">Latest Development Updates</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-6 relative">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300%">
                What's New
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl -z-10 animate-pulse-slow" />
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Stay up to date with the latest features, improvements, and fixes for Razor Bot
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-300 mb-1">{totalUpdates}</div>
                <div className="text-xs text-gray-400 font-medium">Updates</div>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/20 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-300 mb-1">{totalChanges}</div>
                <div className="text-xs text-gray-400 font-medium">Changes</div>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-600/20 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-pink-400" />
                </div>
                <div className="text-2xl font-bold text-pink-300 mb-1">Latest</div>
                <div className="text-xs text-gray-400 font-medium">{latestUpdate?.version}</div>
              </div>
            </div>
          </div>

          {/* Latest Update Highlight */}
          {latestUpdate && (
            <div className="mb-12">
              <div className="glass-border rounded-2xl overflow-hidden relative group hover:scale-[1.01] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Highlight Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xs flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4" />
                    Latest Update
                  </div>
                </div>

                <div className="relative p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Update Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg border border-white/10">
                          <latestUpdate.icon className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                      </div>
                    </div>

                    {/* Update Content */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h2 className="text-2xl font-bold">{latestUpdate.title}</h2>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 rounded-full glass text-base font-bold text-blue-400 border border-blue-500/20">
                            {latestUpdate.version}
                          </span>
                          <span className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" />
                            {latestUpdate.date}
                          </span>
                        </div>
                      </div>

                      <p className="text-base text-gray-300 mb-6 leading-relaxed">{latestUpdate.description}</p>

                      {/* Latest Changes Grid */}
                      <div className="grid md:grid-cols-2 gap-3">
                        {latestUpdate.changes.map((change, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group/change"
                          >
                            <div className="flex-shrink-0 mt-1">
                              {getChangeIcon(change.type)}
                            </div>
                            <span className="text-sm text-gray-300 group-hover/change:text-white transition-colors">
                              {change.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gradient Border */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              </div>
            </div>
          )}

          {/* All Updates Timeline */}
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Update Timeline
              </h2>
              <p className="text-gray-400 text-base">Complete history of all updates and improvements</p>
            </div>

            {updates.map((update, index) => {
              const Icon = update.icon;
              const isLatest = index === 0;
              
              return (
                <div
                  key={index}
                  className={`glass-border rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.01] group ${
                    isLatest ? 'ring-2 ring-blue-500/20' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative p-6">
                    {/* Timeline Connector */}
                    {index < updates.length - 1 && (
                      <div className="absolute left-10 top-16 w-0.5 h-12 bg-gradient-to-b from-blue-500/50 to-transparent" />
                    )}

                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Update Icon & Version */}
                      <div className="flex-shrink-0 flex items-start gap-4">
                        <div className="relative">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${
                            isLatest 
                              ? 'from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30' 
                              : 'from-gray-500/10 to-gray-600/10'
                          } group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          {isLatest && (
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        
                        <div className="text-center lg:text-left">
                          <div className={`px-3 py-1 rounded-full text-base font-bold mb-2 ${
                            isLatest 
                              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30' 
                              : 'glass text-gray-300'
                          }`}>
                            {update.version}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="w-4 h-4" />
                            {update.date}
                          </div>
                        </div>
                      </div>

                      {/* Update Content */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                          {update.title}
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-4 text-base leading-relaxed">
                          {update.description}
                        </p>

                        {/* Changes */}
                        <div className="space-y-2">
                          <h4 className="text-base font-semibold text-gray-300 mb-3 flex items-center gap-2">
                            <Tag className="w-4 h-4 text-blue-400" />
                            Changes & Improvements
                          </h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {update.changes.map((change, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 p-2 rounded bg-white/5 hover:bg-white/10 transition-all duration-300 group/change"
                              >
                                <div className="flex-shrink-0 mt-0.5">
                                  {getChangeIcon(change.type)}
                                </div>
                                <div className="flex-grow">
                                  <span className="text-sm text-gray-300 group-hover/change:text-white transition-colors">
                                    {change.description}
                                  </span>
                                  <div className={`mt-0.5 h-0.5 w-0 group-hover/change:w-full bg-gradient-to-r ${getChangeColor(change.type)} transition-all duration-500 rounded-full`} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="glass-border rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.01] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Sparkles className="w-10 h-10 text-blue-400 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
                <p className="text-gray-400 mb-6 max-w-xl mx-auto text-base">
                  Join our Discord server to get notified about new updates and features as soon as they're released!
                </p>
                <div className="flex flex-wrap gap-6 justify-center">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:shadow-[0_0_2rem_-0.5rem_#3b82f6] transition-all duration-300 font-semibold text-base transform hover:scale-105"
                  >
                    <User className="w-5 h-5" />
                    Join Discord
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all duration-300 font-semibold text-base transform hover:scale-105"
                  >
                    <GitBranch className="w-5 h-5" />
                    View Changelog
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}