import { Clock, Sparkles } from 'lucide-react';
import { updates, UpdateChange } from '../../config/updates.config';

const getChangeIcon = (type: UpdateChange['type']) => {
  switch (type) {
    case 'feature':
      return <Sparkles className="w-3 h-3 text-blue-500" />;
    case 'fix':
      return <Sparkles className="w-3 h-3 text-green-500" />;
    case 'improvement':
      return <Sparkles className="w-3 h-3 text-purple-500" />;
    case 'security':
      return <Sparkles className="w-3 h-3 text-red-500" />;
    default:
      return <Sparkles className="w-3 h-3 text-gray-500" />;
  }
};

export function Updates() {
  return (
    <section id="updates" className="w-full py-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span className="text-gray-300">What's New</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Latest Updates
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stay up to date with the latest features and improvements
          </p>
        </div>

        <div className="space-y-6">
          {updates.map((update, index) => {
            const Icon = update.icon;
            return (
              <div
                key={index}
                className={`glass rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 ${
                  update.isHighlighted ? 'border border-blue-500/20' : ''
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${
                        update.isHighlighted
                          ? 'from-blue-500 to-purple-500'
                          : 'from-gray-500 to-gray-600'
                      } bg-opacity-10`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{update.title}</h3>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded-full glass text-xs font-medium text-blue-400">
                          {update.version}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {update.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">
                      {update.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-3">
                      {update.changes.map((change, i) => (
                        <div key={i} className="flex items-start gap-2 group">
                          <div className="flex-shrink-0 mt-0.5">
                            {getChangeIcon(change.type)}
                          </div>
                          <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
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
