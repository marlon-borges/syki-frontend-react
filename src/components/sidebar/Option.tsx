import { Show } from '@/components/Show';
import { type TablerIcon } from '@tabler/icons-react';
import React from 'react';
import { NavLink } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface OptionProps extends React.ComponentPropsWithoutRef<typeof NavLink> {
  icon: TablerIcon;
  label: string;
  isActive?: boolean;
  opened?: boolean;
}

export const Option = ({ icon: Icon, label, isActive, opened, ...optionProps }: OptionProps) => {
  return (
    <div className="px-4">
      <NavLink
        className={({ isActive }) =>
          twMerge(
            'flex items-center gap-1.5 rounded-lg border',
            opened ? 'px-2.5 py-2' : 'justify-center px-2.5 py-[0.5625rem]',
            isActive
              ? 'border-s-muted bg-b-subtle *:text-t-default'
              : 'border-transparent bg-b-default *:text-t-muted hover:bg-b-subtle',
          )
        }
        {...optionProps}
      >
        <Icon stroke={2.25} size={18} className="shrink-0" />
        <Show when={opened}>
          <span className="w-full truncate px-0.5 text-sm font-medium">{label}</span>
        </Show>
      </NavLink>
    </div>
  );
};
