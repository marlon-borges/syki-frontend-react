import placeholderLogo from '@/assets/placeholder-logo.svg';
import { IconButton } from '@/components/IconButton';
import { Show } from '@/components/Show';
import { ChildOption } from '@/components/sidebar/ChildOption';
import { InstitutionOption } from '@/components/sidebar/InstitutionOption';
import { Option } from '@/components/sidebar/Option';
import { ParentOption } from '@/components/sidebar/ParentOption';
import { Tooltip } from '@/components/Tooltip';
import { Collapsible } from '@ark-ui/react';
import {
  IconBackpack,
  IconChalkboard,
  IconChartBarPopular,
  IconChecklist,
  IconLayoutSidebar,
  IconSchool,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Divider = () => (
  <div className="flex items-center justify-center px-6 py-3">
    <div
      className="h-0.5 w-full"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to right, var(--color-s-default) 0, var(--color-s-default) 4px, transparent 2px, transparent 12px)',
      }}
    ></div>
  </div>
);

export const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const toggleSidebarOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const options = [
    {
      icon: IconChartBarPopular,
      label: 'Insights',
      to: '/academic/insights',
    },
    {
      icon: IconSchool,
      label: 'Gestão Acadêmica',
      hasArrow: true,
      children: [
        { label: 'Campi', to: '/academic/campi' },
        { label: 'Cursos', to: '/academic/courses' },
        { label: 'Disciplinas', to: '/academic/disciplines' },
        { label: 'Grades Curriculares', to: '/academic/course-curriculums' },
        { label: 'Ofertas de disciplinas', to: '/academic/course-offerings' },
        { label: 'Períodos Letivos', to: '/academic/academic-periods' },
      ],
    },
    {
      icon: IconBackpack,
      label: 'Estudantes',
      to: '/academic/students',
    },
    {
      icon: IconUsers,
      label: 'Professores',
      to: '/academic/teachers',
    },
    {
      icon: IconChalkboard,
      label: 'Turmas',
      to: '/academic/classes',
    },
    {
      icon: IconChecklist,
      label: 'Matrículas',
      to: '/academic/course-curriculums',
    },
  ];

  return (
    <aside
      className={twMerge(
        'flex w-3xs flex-col border-r border-s-default bg-b-default',
        open ? 'w-3xs' : 'w-[4.375rem]',
      )}
    >
      <div className={twMerge('', open ? 'pt-5 pr-4 pb-0.5 pl-6' : 'pt-6 pb-1.5')}>
        <div className={twMerge('flex items-center', open ? 'justify-between' : 'justify-center')}>
          <div role="logo" className="flex items-center gap-2">
            <img
              src={placeholderLogo}
              alt="Syki Logo"
              width={24}
              height={24}
              loading="lazy"
              className="max-h-6 min-h-6 max-w-6 min-w-6 shrink-0"
            />
            <Show when={open}>
              <span className="text-xl font-semibold text-t-default">Syki</span>
            </Show>
          </div>
          <Show when={open}>
            <IconButton
              icon={IconLayoutSidebar}
              variant="outline"
              color="neutral"
              size="small"
              onClick={() => toggleSidebarOpen()}
            />
          </Show>
        </div>
      </div>
      <Divider />
      <nav className="relative flex-1 overflow-y-auto">
        {options.map((option, i) => {
          if (option.children) {
            if (!open) {
              return (
                <Tooltip
                  label={option.label}
                  key={`parent-option-${i}`}
                  placement="right"
                  openDelay={50}
                >
                  <ParentOption
                    icon={option.icon}
                    label={option.label}
                    hasArrow={option.hasArrow}
                    isActive={false}
                    opened={open}
                  />
                </Tooltip>
              );
            }
            return (
              <Collapsible.Root key={`collapsible-${i}`}>
                <Collapsible.Context>
                  {context => (
                    <Collapsible.Trigger asChild>
                      <ParentOption
                        icon={option.icon}
                        label={option.label}
                        hasArrow={option.hasArrow}
                        isActive={context.open}
                        opened={open}
                      />
                    </Collapsible.Trigger>
                  )}
                </Collapsible.Context>
                <Collapsible.Content className="ml-9 space-y-1 border-l border-s-default pb-1">
                  {option.children.map((child, j) => (
                    <ChildOption key={j} label={child.label} to={child.to} />
                  ))}
                </Collapsible.Content>
              </Collapsible.Root>
            );
          }
          return (
            <Tooltip
              label={option.label}
              key={`option-${i}`}
              disabled={open}
              placement="right"
              openDelay={50}
            >
              <Option
                icon={option.icon}
                label={option.label}
                to={option.to}
                isActive={open}
                opened={open}
              />
            </Tooltip>
          );
        })}
        <div className="sticky bottom-0 h-4 w-full bg-gradient-to-t from-white via-white/50 to-white/0"></div>
      </nav>
      <nav className="pb-4">
        <Option
          icon={IconSettings}
          label="Configurações"
          to={'/academic/settings'}
          isActive={open}
          opened={open}
        />
        <Divider />
        <Tooltip label="Instituição" placement="right" openDelay={50} disabled={open}>
          <InstitutionOption label="Universidade Vale Azul" opened={open} />
        </Tooltip>
      </nav>
    </aside>
  );
};
