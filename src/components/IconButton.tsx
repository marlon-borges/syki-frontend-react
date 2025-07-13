import type { TablerIcon } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

interface IconButtonProps {
  size?: 'small' | 'default' | 'large';
  color?: 'primary' | 'neutral' | 'success' | 'error' | 'warning';
  variant?: 'filled' | 'light' | 'outline' | 'ghost';
  icon: TablerIcon;
  classNames?: string;
}

export function IconButton({
  icon: Icon,
  size,
  color,
  variant,
  classNames,
  ...buttonProps
}: IconButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const buttonCva = cva(
    'rounded-lg flex items-center justify-center w-fit shrink-0 gap-1.5 cursor-pointer',
    {
      variants: {
        size: {
          small: ' h-8 w-8',
          default: 'h-9 w-9',
          large: 'h-10 w-10',
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
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'filled',
          class:
            'bg-purple-500 text-t-inverted hover:bg-purple-600 hover:dark:bg-purple-400 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default dark:disabled:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'light',
          class:
            'bg-purple-50 text-t-accent hover:bg-purple-100 disabled:bg-neutral-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
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
      <Icon stroke="2.25" size={18} className="shrink-0" />
    </button>
  );
}
