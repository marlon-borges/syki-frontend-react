import placeholderLogo from '@/assets/placeholder-logo.svg';
import { IconButton } from '@/components/IconButton';
import { Option } from '@/components/sidebar/Option';
import { IconBackpack, IconChartBarPopular, IconLayoutSidebar } from '@tabler/icons-react';

const Divider = () => (
  <div className="flex items-center justify-center px-6 py-3">
    <div
      className="h-0.5 w-full"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to right, #e1e7e9 0, #e1e7e9 4px, transparent 2px, transparent 12px)',
      }}
    ></div>
  </div>
);

export const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-3xs border-r border-bd_neutral_primary bg-bg_primary">
      <div className="pt-5 pr-4 pb-0.5 pl-6">
        <div className="flex items-center justify-between">
          <div role="logo" className="flex items-center gap-2">
            <img
              src={placeholderLogo}
              alt="Syki Logo"
              width={24}
              height={24}
              loading="lazy"
              className="max-h-6 max-w-6"
            />
            <span className="text-xl font-semibold text-high">Syki</span>
          </div>
          <IconButton icon={IconLayoutSidebar} variant="outline" color="neutral" size="small" />
        </div>
      </div>
      <Divider />
      <nav>
        <Option icon={IconChartBarPopular} label="Insights" to={'/academic/insights'} />
        <Option icon={IconBackpack} label="Estudantes" to={'/academic/students'} />
      </nav>
    </aside>
  );
};
