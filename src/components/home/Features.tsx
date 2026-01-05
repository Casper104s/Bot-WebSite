import { Shield, Settings, Music, DollarSign, Wrench, Gift, Ticket, BarChart, MessageSquare, Gamepad, Image, Bot, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "MODERATION",
    description: "Powerful moderation tools with auto-mod capabilities",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    icon: Settings,
    title: "ADMIN TOOLS",
    description: "Fully customizable admin settings and configurations",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Music,
    title: "MUSIC",
    description: "High-quality audio playback for your server",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: DollarSign,
    title: "ECONOMY",
    description: "Advanced economy system with ranking features",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    icon: Wrench,
    title: "UTILITIES",
    description: "Comprehensive toolkit for server management",
    gradient: "from-rose-500 to-orange-500"
  },
  {
    icon: Gift,
    title: "GIVEAWAYS",
    description: "Run engaging giveaways for your community",
    gradient: "from-orange-500 to-amber-500"
  },
  {
    icon: Ticket,
    title: "TICKETS",
    description: "Efficient support ticket system",
    gradient: "from-amber-500 to-yellow-500"
  },
  {
    icon: BarChart,
    title: "STATISTICS",
    description: "Track and display detailed server stats",
    gradient: "from-yellow-500 to-lime-500"
  },
  {
    icon: MessageSquare,
    title: "SUGGESTIONS",
    description: "Member feedback and suggestion system",
    gradient: "from-lime-500 to-green-500"
  },
  {
    icon: Gamepad,
    title: "FUN",
    description: "Entertaining commands and mini-games",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Image,
    title: "IMAGE TOOLS",
    description: "Creative image manipulation tools",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Bot,
    title: "AUTO SETUP",
    description: "Easy server setup and configuration",
    gradient: "from-teal-500 to-cyan-500"
  }
];

export function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">Comprehensive Feature Set</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Everything you need to create an engaging Discord community
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group feature-card relative"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="relative p-8 glass-border rounded-2xl hover:bg-white/[0.08] transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
                  
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <Icon className={`w-7 h-7 text-white drop-shadow-lg`} />
                    </div>
                    <h3 className="text-xl font-bold tracking-wide group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="mt-6 text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>

                  <div className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 rounded-full`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}