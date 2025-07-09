import { Show } from '@/components/Show';
import { IconChevronDown, type TablerIcon } from '@tabler/icons-react';
import React from 'react';
import { NavLink } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface OptionProps extends React.ComponentProps<typeof NavLink> {
  icon: TablerIcon;
  label: string;
  hasArrow?: boolean;
}

export const Option = (props: OptionProps) => {
  return (
    <div className="px-4">
      <NavLink
        className={({ isActive }) =>
          twMerge(
            'flex items-center gap-1.5 rounded-lg border px-2.5 py-2',
            isActive
              ? 'border-s-muted bg-b-subtle *:text-t-default'
              : 'border-transparent bg-b-default *:text-t-muted hover:bg-b-default',
          )
        }
        {...props}
      >
        {({ isActive }) => (
          <>
            <props.icon stroke={2.25} size={18} className="shrink-0" />
            <span className="w-full truncate px-0.5 text-sm font-medium">{props.label}</span>
            <Show when={props.hasArrow}>
              <IconChevronDown
                stroke={2.25}
                size={16}
                className={twMerge('shrink-0 text-t-subtle!', isActive && 'rotate-180')} // ATUALIZAR OS ESTILOS PARA COMPORTAR TEXT-SUBTLE POR EXEMPLO
              />
            </Show>
          </>
        )}
      </NavLink>
    </div>
  );
};
