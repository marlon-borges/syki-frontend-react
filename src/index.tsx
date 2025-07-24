import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import IndexRoutes from '@/routes/IndexRoutes';
import { AuthProvider } from '@/context/auth/useAuthContext';

const queryClient = new QueryClient();

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <IndexRoutes />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
