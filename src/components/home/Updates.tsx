import { Clock, Sparkles } from 'lucide-react';
import { updates, UpdateChange } from '../../config/updates.config';

const getChangeIcon = (type: UpdateChange['type']) => {
  const size = 'w-3 h-3';
  switch (type) {
    case 'feature':
      return <Sparkles className={`${size} text-blue-500`} />;
    case 'fix':
      return <Sparkles className={`${size} text-green-500`} />;
    case 'improvement':
      return <Sparkles className={`${size} text-purple-500`} />;
    case 'security':
      return <Sparkles className={`${size} text-red-500`} />;
    default:
      return <Sparkles className={`${size} text-gray-500`} />;
  }
};

export function Updates() {
  return (
    <section id="updates" className="w-full py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass text-[11px] font-medium mb-3">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span className="text-gray-300">What's New</span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-100">
            Latest Updates
          </h2>
          <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed">
            Stay up to date with the latest features and improvements
          </p>
        </div>

        <div className="space-y-4">
          {updates.map((update, index) => {
            const Icon = update.icon;
            return (
              <div
                key={index}
                className={`glass rounded-lg p-4 hover:scale-[1.01] transition-all duration-200 ${
                  update.isHighlighted ? 'border border-blue-500/20' : ''
                }`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`p-2 rounded-md bg-gradient-to-br ${
                        update.isHighlighted
                          ? 'from-blue-500 to-purple-500'
                          : 'from-gray-500 to-gray-600'
                      } bg-opacity-10`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold">{update.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full glass text-[10px] font-medium text-blue-400">
                          {update.version}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Clock className="w-3 h-3" />
                          {update.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 mb-2">
                      {update.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-2">
                      {update.changes.map((change, i) => (
                        <div key={i} className="flex items-start gap-1.5 group">
                          <div className="flex-shrink-0 mt-[2px]">
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
