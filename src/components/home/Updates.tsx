import { Clock, Sparkles } from 'lucide-react';
import { updates, UpdateChange } from '../../config/updates.config';

const getChangeIcon = (type: UpdateChange['type']) => {
  switch (type) {
    case 'feature':
      return <Sparkles className="w-4 h-4 text-blue-500" />;
    case 'fix':
      return <Sparkles className="w-4 h-4 text-green-500" />;
    case 'improvement':
      return <Sparkles className="w-4 h-4 text-purple-500" />;
    case 'security':
      return <Sparkles className="w-4 h-4 text-red-500" />;
    default:
      return <Sparkles className="w-4 h-4 text-gray-500" />;
  }
};

export function Updates() {
  return (
    <section id="updates" className="w-full py-32">
      <div className="max-w-[1800px] mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-300">What's New</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Latest Updates
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Stay up to date with the latest features and improvements
          </p>
        </div>

        <div className="space-y-8">
          {updates.map((update, index) => {
            const Icon = update.icon;
            return (
              <div
                key={index}
                className={`glass rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 ${
                  update.isHighlighted ? 'border border-blue-500/20' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${
                      update.isHighlighted 
                        ? 'from-blue-500 to-purple-500' 
                        : 'from-gray-500 to-gray-600'
                    } bg-opacity-10`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold">{update.title}</h3>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-full glass text-sm font-medium text-blue-400">
                          {update.version}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          {update.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-400 mb-6">{update.description}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      {update.changes.map((change, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 group"
                        >
                          <div className="flex-shrink-0 mt-1">
                            {getChangeIcon(change.type)}
                          </div>
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            {change.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}