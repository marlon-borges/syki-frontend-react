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

export function Button(props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
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
            'bg-purple-primary-500 text-white hover:bg-purple-primary-600 hover:dark:bg-purple-primary-400 disabled:bg-neutral-200 disabled:text-disabled disabled:cursor-default dark:disabled:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary  focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'light',
          class:
            'bg-purple-primary-50 text-action-primary hover:bg-purple-primary-100 disabled:bg-neutral-200 disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary  focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'outline',
          class:
            'bg-transparent text-action-primary border border-purple-primary-200 hover:bg-purple-primary-50 disabled:border-neutral-200 disabled:bg-transparent disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-bg_primary focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'ghost',
          class:
            'bg-transparent text-action-primary hover:bg-purple-primary-50 disabled:bg-transparent disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'primary',
          variant: 'link',
          class:
            'bg-transparent text-action-primary px-0! hover:underline disabled:bg-transparent disabled:text-disabled disabled:no-underline disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'filled',
          class:
            'bg-neutral-900 dark:bg-neutral-300 hover:dark:bg-neutral-200 text-white hover:bg-neutral-800 dark:disabled:bg-neutral-200 disabled:bg-neutral-200 disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'light',
          class:
            'bg-neutral-50 dark:bg-neutral-200 hover:dark:bg-neutral-300 text-normal hover:bg-neutral-100 dark:disabled:bg-neutral-200 disabled:bg-neutral-200 disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'outline',
          class:
            'bg-transparent dark:bg-transparent border border-neutral-200 dark:border-neutral-300 hover:dark:bg-neutral-200 text-normal hover:bg-neutral-100 disabled:bg-transparent dark:disabled:bg-transparent disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'ghost',
          class:
            'bg-transparent dark:bg-transparent hover:dark:bg-neutral-200 text-normal hover:bg-neutral-100 disabled:bg-transparent dark:disabled:bg-transparent disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'neutral',
          variant: 'link',
          class:
            'bg-transparent dark:bg-transparent px-0! hover:dark:underline text-normal hover:underline disabled:bg-transparent dark:disabled:bg-transparent disabled:text-disabled dark:disabled:no-underline disabled:no-underline disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'filled',
          class:
            'bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-400 disabled:bg-neutral-200 disabled:text-disabled disabled:cursor-default focus-visible:ring-2 dark:disabled:bg-neutral-200 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary  focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'light',
          class:
            'bg-green-50 text-action-success hover:bg-green-100 disabled:bg-neutral-200 disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary  focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'outline',
          class:
            'bg-transparent text-action-success border border-green-200 hover:bg-green-100 dark:hover:bg-green-50 disabled:border-neutral-200 disabled:bg-transparent disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-bg_primary focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'ghost',
          class:
            'bg-transparent text-action-success hover:bg-green-100 hover:dark:bg-green-50 disabled:bg-transparent disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'success',
          variant: 'link',
          class:
            'bg-transparent text-action-success px-0! hover:underline disabled:bg-transparent disabled:text-disabled disabled:no-underline disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'filled',
          class:
            'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-400 disabled:bg-neutral-200 disabled:text-disabled disabled:cursor-default focus-visible:ring-2 dark:disabled:bg-neutral-200 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary  focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'light',
          class:
            'bg-red-50 text-action-error hover:bg-red-100 disabled:bg-neutral-200 disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary  focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'outline',
          class:
            'bg-transparent text-action-error border border-red-200 hover:bg-red-100 hover:dark:bg-red-50 disabled:border-neutral-200 disabled:bg-transparent disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-bg_primary focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'ghost',
          class:
            'bg-transparent text-action-error hover:bg-red-100 hover:dark:bg-red-50 disabled:bg-transparent disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'error',
          variant: 'link',
          class:
            'bg-transparent text-action-error px-0! hover:underline disabled:bg-transparent disabled:text-disabled disabled:no-underline disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'filled',
          class:
            'bg-orange-500 text-white hover:bg-orange-600 dark:hover:bg-orange-400 disabled:bg-neutral-200 disabled:text-disabled disabled:cursor-default focus-visible:ring-2 dark:disabled:bg-neutral-200 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary  focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'light',
          class:
            'bg-orange-50 text-action-warning hover:bg-orange-100 disabled:bg-neutral-200 disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary  focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'outline',
          class:
            'bg-transparent text-action-warning border border-orange-200 hover:bg-orange-100 hover:dark:bg-orange-50 disabled:border-neutral-200 disabled:bg-transparent disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-bg_primary focus-visible:ring-offset-2 focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'ghost',
          class:
            'bg-transparent text-action-warning hover:bg-orange-100 hover:dark:bg-orange-50 disabled:bg-transparent disabled:text-disabled disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
        },
        {
          color: 'warning',
          variant: 'link',
          class:
            'bg-transparent text-action-warning px-0! hover:underline disabled:bg-transparent disabled:text-disabled disabled:no-underline disabled:cursor-default focus-visible:ring-2 focus-visible:ring-neutral-200 focus-visible:ring-offset-2 focus-visible:ring-offset-bg_primary focus-visible:outline-none',
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
          size: props.size,
          color: props.color,
          variant: props.variant,
        }),
        props.classNames,
      )}
      {...props}
    >
      <Show when={props.leftIcon}>
        {props.leftIcon && <props.leftIcon stroke="2.25" size={18} className="shrink-0" />}
      </Show>
      <span className="px-0.5 text-sm font-medium">{props.children}</span>
      <Show when={props.rightIcon}>
        {props.rightIcon && <props.rightIcon stroke="2.25" size={18} className="shrink-0" />}
      </Show>
    </button>
  );
}
