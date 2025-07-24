import { Show } from '@/components/Show';
import { IconX, type TablerIcon } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: TablerIcon;
  title: string;
  actionTitle?: string;
  onClose?: (event: MouseEvent) => void;
  onAction?: (event: MouseEvent) => void;
  showActionButton?: boolean;
  showCloseButton?: boolean;
  isVisible?: boolean;
  color?: 'primary' | 'info' | 'error' | 'success' | 'warning' | 'neutral';
  variant?: 'filled' | 'light';
  size?: 'small' | 'default' | 'large';
}

export const Alert = (props: AlertProps) => {
  const [internalVisible, setInternalVisible] = useState<boolean>(props.isVisible ?? true);

  const handleClose = (event: MouseEvent) => {
    {
      setInternalVisible(false);
      props.onClose?.(event);
    }
  };

  const alertCva = cva('rounded-lg flex items-center gap-2', {
    variants: {
      color: {
        primary: '',
        info: '',
        error: '',
        success: '',
        warning: '',
        neutral: '',
      },
      variant: {
        filled: '',
        light: '',
      },
      size: {
        small: 'px-2.5 py-1.5',
        default: 'px-3 py-2',
        large: 'px-3 py-2.5',
      },
    },
    compoundVariants: [
      {
        color: 'primary',
        variant: 'filled',
        class: 'bg-purple-500 text-t-inverted',
      },
      {
        color: 'primary',
        variant: 'light',
        class: 'bg-b-accent-muted text-purple-800',
      },
      {
        color: 'info',
        variant: 'filled',
        class: 'bg-blue-500 text-t-inverted',
      },
      {
        color: 'info',
        variant: 'light',
        class: 'bg-b-info-muted text-blue-800',
      },
      {
        color: 'error',
        variant: 'filled',
        class: 'bg-red-500 text-t-inverted',
      },
      {
        color: 'error',
        variant: 'light',
        class: 'bg-b-error-muted text-red-800',
      },
      {
        color: 'success',
        variant: 'filled',
        class: 'bg-green-500 text-t-inverted',
      },
      {
        color: 'success',
        variant: 'light',
        class: 'bg-b-success-muted text-green-800',
      },
      {
        color: 'warning',
        variant: 'filled',
        class: 'bg-orange-500 text-t-inverted',
      },
      {
        color: 'warning',
        variant: 'light',
        class: 'bg-b-warning-muted text-orange-900',
      },
      {
        color: 'neutral',
        variant: 'filled',
        class: 'bg-neutral-950 dark:bg-neutral-400 text-t-inverted',
      },
      {
        color: 'neutral',
        variant: 'light',
        class: 'bg-b-muted text-t-default',
      },
    ],
    defaultVariants: {
      color: 'primary',
      variant: 'filled',
      size: 'default',
    },
  });

  return (
    <Show when={internalVisible}>
      <div
        className={twMerge(
          '',
          alertCva({ color: props.color, size: props.size, variant: props.variant }),
        )}
        {...props}
      >
        <props.icon size={18} stroke="2.25" className="shrink-0" />
        <span className="w-full truncate px-0.5 text-sm font-medium">
          {props.title ?? 'Alert title'}
        </span>
        <Show when={props.showActionButton}>
          <button
            className="cursor-pointer px-0.5 text-sm font-medium underline hover:decoration-2"
            onClick={() => props.onAction}
          >
            {props.actionTitle ?? 'Action'}
          </button>
        </Show>
        <Show when={props.showCloseButton !== false}>
          <button onClick={() => handleClose} className="cursor-pointer">
            <IconX size={18} />
          </button>
        </Show>
      </div>
    </Show>
  );
};
