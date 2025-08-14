import { Header } from '@/components/header/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { MyToast } from '@/components/Toast';
import { useAuthContext } from '@/context/auth/useAuthContext';
import { LayoutContextProvider } from '@/context/layout/useLayoutContext';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { Navigate, Outlet } from 'react-router';

const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  return (
    <LayoutContextProvider>
      <NuqsAdapter>
        {!isLoading && !isAuthenticated ? <Navigate to="/login" /> : <Layout />}
      </NuqsAdapter>
    </LayoutContextProvider>
  );
};

const Layout = () => {
  return (
    <section className="flex h-dvh w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <MyToast />
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default AppLayout;
