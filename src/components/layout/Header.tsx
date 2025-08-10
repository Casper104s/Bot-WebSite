import { useState } from 'react';
import { Bot, Menu, X, LayoutDashboard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/site.config';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 my-4 glass-border rounded-2xl">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between h-16 px-6">
            <Link to="/" className="flex items-center gap-3">
              <Bot className="w-8 h-8 text-blue-500" />
              <span className="font-bold text-xl">{siteConfig.siteName}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => handleNavClick('features')} 
                className="text-gray-400 hover:text-white transition-colors font-medium px-2 py-1 rounded-md hover:bg-white/10"
              >
                Features
              </button>
              {siteConfig.features.enableCommands && (
                <Link to="/commands" className="text-gray-400 hover:text-white transition-colors font-medium px-2 py-1 rounded-md hover:bg-white/10">
                  Commands
                </Link>
              )}
              <Link to="/premium" className="text-gray-400 hover:text-white transition-colors font-medium px-2 py-1 rounded-md hover:bg-white/10">
                Premium
              </Link>
              <button 
                onClick={() => handleNavClick('stats')} 
                className="text-gray-400 hover:text-white transition-colors font-medium px-2 py-1 rounded-md hover:bg-white/10"
              >
                Stats
              </button>
              <button 
                onClick={() => handleNavClick('updates')} 
                className="text-gray-400 hover:text-white transition-colors font-medium px-2 py-1 rounded-md hover:bg-white/10"
              >
                Updates
              </button>
              {siteConfig.features.enableDashboard && (
                <a 
                  href="/dashboard/login" 
                  className="relative overflow-hidden group px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl hover:shadow-[0_0_2rem_-0.5rem_#3b82f6] transition-all duration-300 border border-white/10 font-medium text-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2 text-sm font-medium">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </span>
                </a>
              )}
            </nav>

            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <nav className="md:hidden p-4 border-t border-white/10">
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => handleNavClick('features')} 
                  className="text-left text-gray-400 hover:text-white transition-colors font-medium px-2 py-1 rounded-md hover:bg-white/10"
                >
                  Features
                </button>
                {siteConfig.features.enableCommands && (
                  <Link to="/commands" className="text-gray-400 hover:text-white transition-colors font-medium px-2 py-1 rounded-md hover:bg-white/10">
                    Commands
                  </Link>
                )}
                <Link to="/premium" className="text-gray-400 hover:text-white transition-colors font-medium px-2 py-1 rounded-md hover:bg-white/10">
                  Premium
                </Link>
                <button 
                  onClick={() => handleNavClick('stats')} 
                  className="text-left text-gray-400 hover:text-white transition-colors font-medium px-2 py-1 rounded-md hover:bg-white/10"
                >
                  Stats
                </button>
                <button 
                  onClick={() => handleNavClick('updates')} 
                  className="text-left text-gray-400 hover:text-white transition-colors font-medium px-2 py-1 rounded-md hover:bg-white/10"
                >
                  Updates
                </button>
                {siteConfig.features.enableDashboard && (
                  <a 
                    href="/dashboard/login" 
                    className="relative overflow-hidden group px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl hover:shadow-[0_0_2rem_-0.5rem_#3b82f6] transition-all duration-300 border border-white/10 text-center font-medium text-white"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center justify-center gap-2 text-sm font-medium">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </span>
                  </a>
                )}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}