import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Shield, Sparkles } from 'lucide-react';
import { commandCategories } from './data/commands';
import type { Command } from './types/commands';
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

  const isCommandVisible = (command: Command) => {
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

  return (
    <div className="min-h-screen bg-mesh text-white">
      <Header />

      <main className="pt-32 pb-20 max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-50"></div>
            <div className="relative glass rounded-2xl overflow-hidden">
              <div className="flex items-center px-6 py-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search commands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* lista  */}
        <div className="space-y-6">
          {commandCategories.map((category) => {
            const visibleCommands = category.commands.filter(isCommandVisible);
            if (visibleCommands.length === 0) return null;

            const isExpanded = expandedCategories.includes(category.name);
            const Icon = category.icon;

            return (
              <div key={category.name} className="glass rounded-2xl overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <Icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-white/5">
                    {visibleCommands.map((command, index) => (
                      <div
                        key={command.name}
                        id={command.name}
                        className={`p-6 transition-all duration-300 hover:bg-white/5 ${
                          index !== visibleCommands.length - 1 ? 'border-b border-white/5' : ''
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            <code className="text-blue-400 font-mono">{command.name}</code>
                            {command.permissions && (
                              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-xs">
                                <Shield className="w-3 h-3" />
                                <span>{command.permissions.join(', ')}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-300 pl-7">{command.description}</p>
                          <div className="pl-7 space-y-2">
                            <div className="text-sm">
                              <span className="text-gray-400">Usage: </span>
                              <code className="text-gray-300 bg-white/5 px-2 py-1 rounded">{command.usage}</code>
                            </div>
                            {command.examples && (
                              <div className="text-sm">
                                <span className="text-gray-400">Examples: </span>
                                {command.examples.map((example, i) => (
                                  <code key={i} className="text-gray-300 bg-white/5 px-2 py-1 rounded mr-2">
                                    {example}
                                  </code>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {commandCategories.every(category => 
            category.commands.every(cmd => !isCommandVisible(cmd))
          ) && (
            <div className="text-center py-12">
              <div className="glass rounded-2xl p-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No commands found matching your search</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Commands;