import { Show } from '@/components/Show';
import { IconChevronDown, type TablerIcon } from '@tabler/icons-react';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

interface ParentOptionProps extends React.ComponentPropsWithoutRef<'button'> {
  icon: TablerIcon;
  label: string;
  hasArrow?: boolean;
  isActive?: boolean;
  opened?: boolean;
}

export const ParentOption = (props: ParentOptionProps) => {
  return (
    <div className="px-4">
      <button
        className={twMerge(
          'flex w-full cursor-pointer items-center justify-start gap-1.5 rounded-lg border border-transparent bg-b-default *:text-t-muted hover:bg-b-subtle',
          props.opened ? 'px-2.5 py-2' : 'justify-center px-2.5 py-[0.5625rem]',
        )}
        type="button"
        {...props}
      >
        <props.icon stroke={2.25} size={18} className="shrink-0" />
        <Show when={props.opened}>
          <span className="w-full truncate px-0.5 text-left text-sm font-medium">
            {props.label}
          </span>
        </Show>
        <Show when={props.hasArrow && props.opened}>
          <IconChevronDown
            stroke={2.25}
            size={16}
            className={twMerge('shrink-0 text-t-subtle!', props.isActive && 'rotate-180')}
          />
        </Show>
      </button>
    </div>
  );
};
