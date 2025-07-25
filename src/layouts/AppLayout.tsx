import { Header } from '@/components/header/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { useAuthContext } from '@/context/auth/useAuthContext';
import { LayoutContextProvider } from '@/context/layout/useLayoutContext';
import { Navigate, Outlet } from 'react-router';

const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  return (
    <LayoutContextProvider>
      {!isLoading && !isAuthenticated ? <Navigate to="/login" /> : <Layout />}
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
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default AppLayout;
