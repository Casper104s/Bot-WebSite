import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Commands from './Commands.tsx';
import Premium from './pages/Premium.tsx';
import Dashboard from './pages/Dashboard.tsx';
import DashboardLogin from './pages/DashboardLogin.tsx';
import DashboardCallback from './pages/DashboardCallback.tsx';
import TermsOfService from './pages/TermsOfService.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import NotFound from './pages/NotFound.tsx';
import './index.css';

function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-mesh text-white">
      <div className="container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-8">
            {error.message || 'An unexpected error occurred. Please try refreshing the page.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary error={new Error('Failed to load the application')} />,
    shouldRevalidate: () => false
  },
  {
    path: "/commands",
    element: <Commands />
  },
  {
    path: "/premium",
    element: <Premium />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/dashboard/login",
    element: <DashboardLogin />
  },
  {
    path: "/dashboard/callback",
    element: <DashboardCallback />
  },
  {
    path: "/terms",
    element: <TermsOfService />
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider 
      router={router}
      fallbackElement={
        <div className="min-h-screen bg-mesh text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      }
    />
  </StrictMode>
);