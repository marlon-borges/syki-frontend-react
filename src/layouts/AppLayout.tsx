import { Sidebar } from '@/components/sidebar/Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <section className="flex h-dvh w-full">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <Outlet />
    </section>
  );
};

export default AppLayout;
