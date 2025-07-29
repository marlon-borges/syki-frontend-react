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
            'bg-purple-500 text-t-inverted hover:bg-purple-600 hover:dark:bg-purple-400 disabled:bg-gray-200 disabled:text-t-disabled disabled:cursor-default dark:disabled:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'light',
          class:
            'bg-b-accent text-t-accent hover:bg-b-accent-muted disabled:bg-gray-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'outline',
          class:
            'bg-transparent text-t-accent border border-purple-200 hover:bg-b-accent disabled:border-gray-200 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-b-default focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'ghost',
          class:
            'bg-transparent text-t-accent hover:bg-b-accent disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'filled',
          class:
            'bg-gray-900 dark:bg-gray-300 hover:dark:bg-gray-200 text-t-inverted hover:bg-gray-800 dark:disabled:bg-gray-200 disabled:bg-gray-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'light',
          class:
            'bg-b-muted dark:bg-gray-200 hover:dark:bg-gray-300 text-t-muted hover:bg-b-emphasized dark:disabled:bg-gray-200 disabled:bg-gray-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'outline',
          class:
            'bg-transparent dark:bg-transparent border border-gray-200 dark:border-gray-300 hover:dark:bg-gray-200 text-t-muted hover:bg-gray-100 disabled:bg-transparent dark:disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'ghost',
          class:
            'bg-transparent dark:bg-transparent hover:dark:bg-gray-200 text-t-muted hover:bg-gray-100 disabled:bg-transparent dark:disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'filled',
          class:
            'bg-green-500 text-t-inverted hover:bg-green-600 dark:hover:bg-green-400 disabled:bg-gray-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 dark:disabled:bg-gray-200 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'light',
          class:
            'bg-b-success text-t-success hover:bg-b-success-muted disabled:bg-gray-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'outline',
          class:
            'bg-transparent text-t-success border border-green-200 hover:bg-b-success-muted dark:hover:bg-green-50 disabled:border-gray-200 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-b-default focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'ghost',
          class:
            'bg-transparent text-t-success hover:bg-b-success-muted hover:dark:bg-b-success disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'filled',
          class:
            'bg-red-500 text-t-inverted hover:bg-red-600 dark:hover:bg-red-400 disabled:bg-gray-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 dark:disabled:bg-gray-200 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'light',
          class:
            'bg-b-error text-t-error hover:bg-b-error-muted disabled:bg-gray-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'outline',
          class:
            'bg-transparent text-t-error border border-red-200 hover:bg-b-error-muted hover:dark:bg-red-50 disabled:border-gray-200 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-b-default focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'ghost',
          class:
            'bg-transparent text-t-error hover:bg-b-error-muted hover:dark:bg-b-error disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'filled',
          class:
            'bg-orange-500 text-t-inverted hover:bg-orange-600 dark:hover:bg-orange-400 disabled:bg-gray-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 dark:disabled:bg-gray-200 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'light',
          class:
            'bg-b-warning text-t-warning hover:bg-b-warning-muted disabled:bg-gray-200 disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default  focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'outline',
          class:
            'bg-transparent text-t-warning border border-orange-200 hover:bg-b-warning-muted hover:dark:bg-b-warning disabled:border-gray-200 disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-b-default focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'ghost',
          class:
            'bg-transparent text-t-warning hover:bg-b-warning-muted hover:dark:bg-b-warning disabled:bg-transparent disabled:text-t-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none',
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
