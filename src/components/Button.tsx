import { Show } from '@/components/Show';
import type { TablerIcon } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  size?: 'small' | 'default' | 'large';
  color?: 'primary' | 'neutral' | 'success' | 'error' | 'warning';
  variant?: 'filled' | 'light' | 'outline' | 'ghost' | 'link';
  children: ReactNode;
  leftIcon?: TablerIcon;
  rightIcon?: TablerIcon;
  classNames?: string;
}

export function Button({
  size,
  color,
  variant,
  children,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  classNames,
  ...buttonProps
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const buttonCva = cva(
    'rounded-lg flex items-center justify-center w-fit shrink-0 gap-1.5 cursor-pointer',
    {
      variants: {
        size: {
          small: 'py-1.5 h-8 px-2.5',
          default: 'py-2 h-9 px-2.5',
          large: 'py-2.5 h-10 px-3',
        },
        color: {
          primary: '',
          neutral: '',
          success: '',
          error: '',
          warning: '',
        },
        variant: {
          filled: '',
          light: '',
          outline: '',
          ghost: '',
          link: '',
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'filled',
          class:
            'bg-purple-500 text-t-inverted hover:bg-purple-600 hover:dark:bg-purple-400 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default dark:disabled:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'light',
          class:
            'bg-purple-50 text-t-accent hover:bg-purple-100 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'outline',
          class:
            'bg-transparent text-t-accent border border-purple-200 hover:bg-purple-50 disabled:border-neutral-200 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-b-default focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'ghost',
          class:
            'bg-transparent text-t-accent hover:bg-purple-50 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'link',
          class:
            'bg-transparent text-t-accent px-0! hover:underline disabled:bg-transparent disabled:text-t-disabled disabled:no-underline disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'filled',
          class:
            'bg-neutral-900 dark:bg-neutral-300 hover:dark:bg-neutral-200 text-t-inverted hover:bg-neutral-800 dark:disabled:bg-neutral-200 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'light',
          class:
            'bg-neutral-50 dark:bg-neutral-200 hover:dark:bg-neutral-300 text-t-muted hover:bg-neutral-100 dark:disabled:bg-neutral-200 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'outline',
          class:
            'bg-transparent dark:bg-transparent border border-neutral-200 dark:border-neutral-300 hover:dark:bg-neutral-200 text-t-muted hover:bg-neutral-100 disabled:bg-transparent dark:disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'ghost',
          class:
            'bg-transparent dark:bg-transparent hover:dark:bg-neutral-200 text-t-muted hover:bg-neutral-100 disabled:bg-transparent dark:disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'link',
          class:
            'bg-transparent dark:bg-transparent px-0! hover:dark:underline text-t-muted hover:underline disabled:bg-transparent dark:disabled:bg-transparent disabled:text-t-disabled dark:disabled:no-underline disabled:no-underline disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'filled',
          class:
            'bg-green-500 text-t-inverted hover:bg-green-600 dark:hover:bg-green-400 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 dark:disabled:bg-neutral-200 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'light',
          class:
            'bg-green-50 text-t-success hover:bg-green-100 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'outline',
          class:
            'bg-transparent text-t-success border border-green-200 hover:bg-green-100 dark:hover:bg-green-50 disabled:border-neutral-200 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-b-default focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'ghost',
          class:
            'bg-transparent text-t-success hover:bg-green-100 hover:dark:bg-green-50 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'link',
          class:
            'bg-transparent text-t-success px-0! hover:underline disabled:bg-transparent disabled:text-t-disabled disabled:no-underline disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'filled',
          class:
            'bg-red-500 text-t-inverted hover:bg-red-600 dark:hover:bg-red-400 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 dark:disabled:bg-neutral-200 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'light',
          class:
            'bg-red-50 text-t-error hover:bg-red-100 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'outline',
          class:
            'bg-transparent text-t-error border border-red-200 hover:bg-red-100 hover:dark:bg-red-50 disabled:border-neutral-200 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-b-default focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'ghost',
          class:
            'bg-transparent text-t-error hover:bg-red-100 hover:dark:bg-red-50 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'link',
          class:
            'bg-transparent text-t-error px-0! hover:underline disabled:bg-transparent disabled:text-t-disabled disabled:no-underline disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'filled',
          class:
            'bg-orange-500 text-t-inverted hover:bg-orange-600 dark:hover:bg-orange-400 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 dark:disabled:bg-neutral-200 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'light',
          class:
            'bg-orange-50 text-t-warning hover:bg-orange-100 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'outline',
          class:
            'bg-transparent text-t-warning border border-orange-200 hover:bg-orange-100 hover:dark:bg-orange-50 disabled:border-neutral-200 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-b-default focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'ghost',
          class:
            'bg-transparent text-t-warning hover:bg-orange-100 hover:dark:bg-orange-50 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'link',
          class:
            'bg-transparent text-t-warning px-0! hover:underline disabled:bg-transparent disabled:text-t-disabled disabled:no-underline disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
      ],
      defaultVariants: {
        size: 'default',
        color: 'primary',
        variant: 'filled',
      },
    },
  );

  return (
    <button
      className={twMerge(
        '',
        buttonCva({
          size: size,
          color: color,
          variant: variant,
        }),
        classNames,
      )}
      {...buttonProps}
    >
      <Show when={!!LeftIcon}>
        {LeftIcon && <LeftIcon stroke="2.25" size={18} className="shrink-0" />}
      </Show>
      <span className="px-0.5 text-sm font-medium">{children}</span>
      <Show when={!!RightIcon}>
        {RightIcon && <RightIcon stroke="2.25" size={18} className="shrink-0" />}
      </Show>
    </button>
  );
}
