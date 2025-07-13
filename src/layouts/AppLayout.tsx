import { Header } from '@/components/header/Header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { LayoutContextProvider } from '@/context/layout/useLayoutContext';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <LayoutContextProvider>
      <Layout />
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
