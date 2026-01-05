import React, { useState, useEffect } from 'react';
import { BotInfo } from '../../types/bot';
import { Users, Server, Layout, Zap, Terminal, Clock, Bot, Activity } from 'lucide-react';
import { formatUptime } from '../../utils/time';

interface StatsProps {
  stats: BotInfo | null;
}

export function Stats({ stats }: StatsProps) {
  return (
    <section id="stats" className="w-full py-32">
      <div className="max-w-[1800px] mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">Live Performance Metrics</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Real-time Statistics
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Monitor Razor's performance and impact across Discord

          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <StatCard
            icon={Users}
            value={stats?.totalUsers}
            label="Active Users"
            gradient="from-blue-500 to-indigo-500"
            delay={0}
          />
          <StatCard
            icon={Server}
            value={stats?.totalServers}
            label="Total Servers"
            gradient="from-indigo-500 to-purple-500"
            delay={0.1}
          />
          <StatCard
            icon={Layout}
            value={stats?.channels}
            label="Active Channels"
            gradient="from-purple-500 to-pink-500"
            delay={0.2}
          />
          <StatCard
            icon={Terminal}
            value={stats?.command}
            label="Commands Executed"
            gradient="from-pink-500 to-rose-500"
            delay={0.3}
          />
          <StatCard
            icon={Zap}
            value={stats?.ping}
            label="Current Ping"
            suffix="ms"
            gradient="from-rose-500 to-orange-500"
            delay={0.4}
          />
          <StatCard
            icon={Clock}
            value={stats?.uptime}
            label="Uptime"
            formatter={(value) => formatUptime(value)}
            gradient="from-orange-500 to-amber-500"
            delay={0.5}
          />
          <StatCard
            icon={Bot}
            value={0}
            label="Node Version"
            formatter={() => stats?.nodeVersion || 'v18.20.5'}
            gradient="from-amber-500 to-yellow-500"
            delay={0.6}
          />
          <StatCard
            icon={Activity}
            value={99.9}
            label="Availability"
            suffix="%"
            gradient="from-yellow-500 to-lime-500"
            delay={0.7}
          />
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number | undefined;
  label: string;
  gradient: string;
  delay: number;
  suffix?: string;
  formatter?: (value: number) => string;
}

function StatCard({ icon: Icon, value, label, gradient, suffix = "+", formatter }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (value === undefined) {
      setIsLoading(true);
      return;
    }

    setIsLoading(false);
    
    const duration = 2000;
    const steps = 50;
    const stepValue = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.min(Math.floor(stepValue * currentStep), value));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="glass-border rounded-2xl p-8 hover:scale-105 transition-all duration-300">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-10 mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold tracking-tight">
          {isLoading ? (
            <div className="h-8 w-24 bg-white/10 rounded animate-pulse" />
          ) : formatter ? formatter(count) : (
            <div className="flex items-baseline gap-1">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {count.toLocaleString()}
              </span>
              {suffix && (
                <span className="text-gray-400 text-lg">{suffix}</span>
              )}
            </div>
          )}
        </div>
        <div className="text-gray-400 text-sm font-medium tracking-wide uppercase">
          {label}
        </div>
      </div>
    </div>
  );
}
