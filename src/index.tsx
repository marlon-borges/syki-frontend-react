import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';
import IndexRoutes from '@/routes/IndexRoutes';
import { AxiosAuthInterceptor } from '@/components/auth/AxiosAuthInterceptor';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient();

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <CookiesProvider>
            <AxiosAuthInterceptor />
            <IndexRoutes />
          </CookiesProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
