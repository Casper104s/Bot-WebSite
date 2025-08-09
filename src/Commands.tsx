import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Shield, Sparkles, Zap, Star, ArrowRight, Bot, Command } from 'lucide-react';
import { commandCategories } from './data/commands';
import type { Command as CommandType } from './types/commands';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

function Commands() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [foundCommand, setFoundCommand] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const isCommandVisible = (command: CommandType) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      command.name.toLowerCase().includes(searchLower) ||
      command.description.toLowerCase().includes(searchLower) ||
      command.usage.toLowerCase().includes(searchLower)
    );
  };

  useEffect(() => {
    if (searchTerm) {
      for (const category of commandCategories) {
        const matchingCommand = category.commands.find(isCommandVisible);
        if (matchingCommand) {
          if (!expandedCategories.includes(category.name)) {
            setExpandedCategories(prev => [...prev, category.name]);
          }
          setFoundCommand(matchingCommand.name);
          break;
        }
      }
    } else {
      setFoundCommand(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (foundCommand) {
      const element = document.getElementById(foundCommand);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight-command');
        setTimeout(() => {
          element.classList.remove('highlight-command');
        }, 2000);
      }
    }
  }, [foundCommand]);

  const totalCommands = commandCategories.reduce((total, category) => total + category.commands.length, 0);
  const visibleCommands = commandCategories.reduce((total, category) => 
    total + category.commands.filter(isCommandVisible).length, 0
  );

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
          {[...Array(15)].map((_, i) => (
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
              <Command className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">Comprehensive Command Library</span>
              <Zap className="w-4 h-4 text-purple-400" />
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mb-6 relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300%">
                Bot Commands
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl -z-10 animate-pulse-slow" />
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover all {totalCommands} powerful commands to enhance your Discord server experience
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300 mb-1">{commandCategories.length}</div>
                <div className="text-sm text-gray-400 font-medium">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-300 mb-1">{totalCommands}</div>
                <div className="text-sm text-gray-400 font-medium">Total Commands</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-300 mb-1">24/7</div>
                <div className="text-sm text-gray-400 font-medium">Available</div>
              </div>
            </div>
          </div>

          {/* Enhanced Search Section */}
          <div className="mb-16">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-50 rounded-2xl"></div>
              <div className="relative glass-border rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="flex items-center px-6 py-5">
                  <Search className="w-6 h-6 text-gray-400 mr-4" />
                  <input
                    type="text"
                    placeholder="Search commands, descriptions, or usage..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                  />
                  {searchTerm && (
                    <div className="ml-4 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
                      {visibleCommands} found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Commands Grid */}
          <div className="space-y-8">
            {commandCategories.map((category, categoryIndex) => {
              const visibleCategoryCommands = category.commands.filter(isCommandVisible);
              if (visibleCategoryCommands.length === 0) return null;

              const isExpanded = expandedCategories.includes(category.name);
              const Icon = category.icon;

              return (
                <div 
                  key={category.name} 
                  className="glass-border rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.01] group"
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="w-full p-8 flex items-center justify-between hover:bg-white/5 transition-all duration-300 group/header"
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover/header:scale-110 group-hover/header:rotate-6 transition-all duration-500 shadow-lg border border-white/10">
                          <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover/header:opacity-100 transition-opacity duration-300 blur-xl" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl font-bold mb-2 group-hover/header:text-white transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-gray-400 group-hover/header:text-gray-300 transition-colors duration-300 text-lg">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="px-3 py-1 rounded-full bg-white/5 text-sm font-medium text-blue-400">
                            {visibleCategoryCommands.length} commands
                          </span>
                          {isExpanded && (
                            <span className="text-sm text-gray-500">Click to collapse</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <ArrowRight className={`w-6 h-6 text-gray-400 transition-all duration-300 ${isExpanded ? 'rotate-90' : 'group-hover/header:translate-x-1'}`} />
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-gray-400 group-hover/header:text-white transition-colors" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400 group-hover/header:text-white transition-colors" />
                      )}
                    </div>
                  </button>

                  {/* Commands List */}
                  {isExpanded && (
                    <div className="border-t border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                      <div className="grid gap-4 p-8">
                        {visibleCategoryCommands.map((command, commandIndex) => (
                          <div
                            key={command.name}
                            id={command.name}
                            className="group/command p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 border border-white/5 hover:border-white/10 hover:scale-[1.02] hover:-translate-y-1"
                            style={{ animationDelay: `${commandIndex * 0.05}s` }}
                          >
                            <div className="space-y-4">
                              {/* Command Header */}
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover/command:scale-110 transition-transform duration-300">
                                    <Bot className="w-5 h-5 text-blue-400" />
                                  </div>
                                  <div>
                                    <code className="text-lg font-mono text-blue-400 font-semibold group-hover/command:text-blue-300 transition-colors">
                                      {command.name}
                                    </code>
                                    {command.permissions && (
                                      <div className="flex items-center gap-2 mt-2">
                                        <Shield className="w-4 h-4 text-yellow-500" />
                                        <div className="flex flex-wrap gap-1">
                                          {command.permissions.map((perm, i) => (
                                            <span key={i} className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium border border-yellow-500/20">
                                              {perm}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <Sparkles className="w-5 h-5 text-purple-400 opacity-0 group-hover/command:opacity-100 transition-opacity duration-300" />
                              </div>

                              {/* Command Description */}
                              <p className="text-gray-300 group-hover/command:text-white transition-colors duration-300 leading-relaxed">
                                {command.description}
                              </p>

                              {/* Usage and Examples */}
                              <div className="space-y-3">
                                <div>
                                  <span className="text-sm font-semibold text-gray-400 mb-2 block">Usage:</span>
                                  <code className="text-gray-300 bg-black/20 px-3 py-2 rounded-lg text-sm font-mono border border-white/10 block">
                                    {command.usage}
                                  </code>
                                </div>
                                {command.examples && (
                                  <div>
                                    <span className="text-sm font-semibold text-gray-400 mb-2 block">Examples:</span>
                                    <div className="flex flex-wrap gap-2">
                                      {command.examples.map((example, i) => (
                                        <code key={i} className="text-gray-300 bg-black/20 px-3 py-2 rounded-lg text-sm font-mono border border-white/10 hover:bg-black/30 transition-colors">
                                          {example}
                                        </code>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* No Results */}
            {commandCategories.every(category => 
              category.commands.every(cmd => !isCommandVisible(cmd))
            ) && (
              <div className="text-center py-20">
                <div className="glass-border rounded-3xl p-12 max-w-2xl mx-auto">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-50 rounded-full"></div>
                    <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-float">
                      <Search className="w-10 h-10 text-gray-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">No Commands Found</h3>
                  <p className="text-gray-400 mb-8">
                    We couldn't find any commands matching "{searchTerm}". Try adjusting your search terms.
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 font-medium"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="glass-border rounded-3xl p-12 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-6 animate-pulse" />
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Add Razor Bot to your Discord server and start using these powerful commands today!
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:shadow-[0_0_3rem_-0.5rem_#3b82f6] transition-all duration-300 font-bold text-lg transform hover:scale-105"
                >
                  <Bot className="w-6 h-6" />
                  Add to Discord
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Commands;