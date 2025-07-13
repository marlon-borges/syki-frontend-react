import placeholderLogo from '@/assets/placeholder-logo.svg';
import { Dropdown } from '@/components/Dropdown';
import { IconButton } from '@/components/IconButton';
import { Show } from '@/components/Show';
import { ChildOption } from '@/components/sidebar/ChildOption';
import { InstitutionOption } from '@/components/sidebar/InstitutionOption';
import { Option } from '@/components/sidebar/Option';
import { ParentOption } from '@/components/sidebar/ParentOption';
import { Tooltip } from '@/components/Tooltip';
import { useLayoutContext } from '@/context/layout/useLayoutContext';
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
import { useState } from 'react';
import { NavLink } from 'react-router';
import { twMerge } from 'tailwind-merge';

const Divider = () => (
  <div className="flex items-center justify-center px-6 py-3">
    <div
      className="h-0.5 w-full"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to right, var(--color-s-default) 0, var(--color-s-default) 4px, transparent 2px, transparent 9px)',
      }}
    ></div>
  </div>
);

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
    to: '/academic/enrollment-periods',
  },
];

export const Sidebar = () => {
  const { sidebarOpen, toggleOpen } = useLayoutContext();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <aside
      className={twMerge(
        'z-(--index-main) flex w-3xs flex-col border-r border-s-default bg-b-default',
        sidebarOpen ? 'w-3xs' : 'w-[4.375rem]',
      )}
    >
      <div className={twMerge('', sidebarOpen ? 'pt-5 pr-4 pb-0.5 pl-6' : 'pt-6 pb-1.5')}>
        <div
          className={twMerge(
            'flex items-center',
            sidebarOpen ? 'justify-between' : 'justify-center',
          )}
        >
          <div role="logo" className="flex items-center gap-2">
            <img
              src={placeholderLogo}
              alt="Syki Logo"
              width={24}
              height={24}
              loading="lazy"
              className="max-h-6 min-h-6 max-w-6 min-w-6 shrink-0"
            />
            <Show when={sidebarOpen}>
              <span className="text-xl font-semibold text-t-default">Syki</span>
            </Show>
          </div>
          <Show when={sidebarOpen}>
            <IconButton
              icon={IconLayoutSidebar}
              variant="outline"
              color="neutral"
              size="small"
              onClick={toggleOpen}
            />
          </Show>
        </div>
      </div>
      <Divider />
      <nav className="relative flex-1 overflow-y-auto">
        {options.map((option, i) => {
          if (option.children) {
            if (!sidebarOpen) {
              return (
                <Dropdown.Root
                  key={`menu-dropdown-${i}`}
                  open={menuOpen}
                  positioning={{ gutter: 0, placement: 'right-start' }}
                >
                  <Dropdown.Trigger>
                    <ParentOption
                      icon={option.icon}
                      label={option.label}
                      hasArrow={option.hasArrow}
                      isActive={true}
                      opened={sidebarOpen}
                      onPointerEnter={() => setMenuOpen(true)}
                      onPointerLeave={() => setMenuOpen(false)}
                    />
                  </Dropdown.Trigger>
                  <Dropdown.Content
                    onPointerEnter={() => setMenuOpen(true)}
                    onPointerLeave={() => setMenuOpen(false)}
                  >
                    <Dropdown.CustomItem className="flex h-8 items-center px-2">
                      <span className="px-0.5 text-sm font-medium text-t-default">
                        Gestão Acadêmica
                      </span>
                    </Dropdown.CustomItem>
                    <Dropdown.Separator />
                    {option.children.map((item, j) => (
                      <NavLink to={item.to} key={`dropdown-item-sidebar-${j}`}>
                        {link => (
                          <Dropdown.Item
                            key={`menu-dropdown-child-${j}`}
                            value={item.label}
                            variant={link.isActive ? 'active' : 'default'}
                          >
                            {item.label}
                          </Dropdown.Item>
                        )}
                      </NavLink>
                    ))}
                  </Dropdown.Content>
                </Dropdown.Root>
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
                        opened={sidebarOpen}
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
              disabled={sidebarOpen}
              placement="right"
              openDelay={50}
            >
              <Option
                icon={option.icon}
                label={option.label}
                to={option.to}
                isActive={sidebarOpen}
                opened={sidebarOpen}
              />
            </Tooltip>
          );
        })}
        <div className="sticky bottom-0 h-4 w-full bg-gradient-to-t from-white via-white/50 to-white/0"></div>
      </nav>
      <nav className="pb-4">
        <Tooltip label="Configurações" placement="right" openDelay={50} disabled={sidebarOpen}>
          <Option
            icon={IconSettings}
            label="Configurações"
            to={'/academic/settings'}
            isActive={sidebarOpen}
            opened={sidebarOpen}
          />
        </Tooltip>
        <Divider />
        <Tooltip label="Instituição" placement="right" openDelay={50} disabled={sidebarOpen}>
          <InstitutionOption label="Universidade Vale Azul" opened={sidebarOpen} />
        </Tooltip>
      </nav>
    </aside>
  );
};
