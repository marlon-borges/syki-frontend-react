import { Show } from '@/components/Show';
import React from 'react';
import { NavLink } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface OptionProps extends React.ComponentProps<typeof NavLink> {
  label: string;
}

export const ChildOption = (props: OptionProps) => {
  return (
    <div className="pr-4 pl-[5px]">
      <NavLink
        className={({ isActive }) =>
          twMerge(
            'relative flex items-center rounded-lg border px-2 py-1.5',
            isActive
              ? 'border-s-muted bg-b-subtle *:text-t-default'
              : 'border-transparent bg-b-default *:text-t-muted hover:bg-b-subtle',
          )
        }
        {...props}
      >
        {({ isActive }) => (
          <>
            <Show when={isActive}>
              <div className="absolute top-1/2 -left-2 h-4 w-[3px] shrink-0 -translate-y-1/2 rounded-lg bg-f-accent"></div>
            </Show>
            <span className="w-full truncate px-0.5 text-sm font-medium">{props.label}</span>
          </>
        )}
      </NavLink>
    </div>
  );
};
