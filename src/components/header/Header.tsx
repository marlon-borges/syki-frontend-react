import { Profile } from '@/components/header/Profile';
import { Title } from '@/components/header/Title';
import { IconButton } from '@/components/IconButton';
import { Show } from '@/components/Show';
import { useLayoutContext } from '@/context/layout/useLayoutContext';
import { IconBell, IconDoorExit, IconLayoutSidebar } from '@tabler/icons-react';
import institutionPlaceholder from '@/assets/institution-placeholder.jpg';
import { useAuthContext } from '@/context/auth/useAuthContext';

const Divider = () => (
  <div className="absolute bottom-0 flex w-[calc(100%-48px)] items-center justify-center">
    <div
      className="h-0.5 w-full"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to right, var(--color-s-default) 0, var(--color-s-default) 4px, transparent 2px, transparent 9px)',
      }}
    ></div>
  </div>
);

export const Header = () => {
  const { sidebarOpen, toggleOpen } = useLayoutContext();

  const { logout } = useAuthContext();

  return (
    <nav className="relative h-[4.25rem] px-6">
      <div className="flex h-[4.25rem] items-center py-4">
        <div className="flex w-full items-center gap-3">
          <Show when={!sidebarOpen}>
            <IconButton
              icon={IconLayoutSidebar}
              variant="outline"
              color="neutral"
              size="small"
              onClick={toggleOpen}
            />
          </Show>
          <Title />
        </div>
        <div className="flex items-center gap-2">
          <IconButton icon={IconBell} variant="ghost" color="neutral" size="small" />
          <IconButton
            icon={IconDoorExit}
            variant="outline"
            color="error"
            size="small"
            onClick={logout}
          />
          <Profile src={institutionPlaceholder} alt="profile" />
        </div>
      </div>
      <Divider />
    </nav>
  );
};
