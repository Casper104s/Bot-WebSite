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

export function UpdatesWidget() {
  return (
    <div className="glass rounded-lg p-4 w-full max-w-md h-80 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-200">
          <Sparkles className="w-3 h-3 text-yellow-400" />
          What's New
        </div>
      </div>

      <div className="overflow-y-auto pr-1 space-y-3">
        {updates.map((update, index) => {
          const Icon = update.icon;
          return (
            <div
              key={index}
              className={`rounded-md p-3 ${
                update.isHighlighted
                  ? 'border border-blue-500/20'
                  : 'border border-gray-700/30'
              }`}
            >
              <div className="flex gap-2">
                <div
                  className={`p-1.5 rounded bg-gradient-to-br ${
                    update.isHighlighted
                      ? 'from-blue-500 to-purple-500'
                      : 'from-gray-500 to-gray-600'
                  } bg-opacity-10 flex items-center justify-center`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-1">
                    <h3 className="text-sm font-semibold">{update.title}</h3>
                    <span className="px-1.5 py-0.5 rounded-full glass text-[10px] font-medium text-blue-400">
                      {update.version}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock className="w-3 h-3" />
                      {update.date}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {update.description}
                  </p>

                  <div className="mt-2 space-y-1">
                    {update.changes.slice(0, 2).map((change, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <div className="flex-shrink-0 mt-[1px]">
                          {getChangeIcon(change.type)}
                        </div>
                        <span className="text-xs text-gray-300">
                          {change.description}
                        </span>
                      </div>
                    ))}
                    {update.changes.length > 2 && (
                      <span className="text-[10px] text-gray-500">
                        +{update.changes.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
