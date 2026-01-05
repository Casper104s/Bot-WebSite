// chmqp dashboard enjoy
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Bot, AlertTriangle } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { DiscordService } from '../services/discordService';

export default function DashboardCallback() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setError('Authorization was denied or cancelled');
        return;
      }

      if (!code) {
        setStatus('error');
        setError('No authorization code received');
        return;
      }

      try {
        // In a real implementation, this should be handled by your backend
        // For now, we'll simulate the token exchange
        setStatus('success');
        
        // Store a mock token (in production, get this from your backend)
        localStorage.setItem('discord_token', 'mock_token_' + Date.now());
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } catch (err) {
        setStatus('error');
        setError('Failed to authenticate with Discord');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-mesh text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass rounded-2xl p-12">
            {status === 'loading' && (
              <>
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h2 className="text-2xl font-semibold mb-4">Authenticating...</h2>
                <p className="text-gray-400">
                  Please wait while we verify your Discord account
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6">
                  <Bot className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Authentication Successful!</h2>
                <p className="text-gray-400 mb-6">
                  Redirecting you to the dashboard...
                </p>
                <div className="w-48 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Authentication Failed</h2>
                <p className="text-gray-400 mb-6">{error}</p>
                <button
                  onClick={() => navigate('/dashboard/login')}
                  className="btn-primary"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}