import { Show } from '@/components/Show';
import {
  Field,
  type FieldErrorTextProps,
  type FieldHelperTextProps,
  type FieldInputProps,
  type FieldLabelProps,
  type FieldRootProps,
} from '@ark-ui/react';
import type { TablerIcon } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

function Root(props: FieldRootProps) {
  return <Field.Root {...props} className={twMerge('flex flex-col gap-1.5', props.className)} />;
}

function Label(props: FieldLabelProps) {
  return (
    <Field.Label
      {...props}
      className={twMerge('text-sm font-medium text-t-muted dark:text-t-muted', props.className)}
    >
      {props.children}
    </Field.Label>
  );
}

interface InputProps extends FieldInputProps {
  icon?: TablerIcon;
  sizes?: 'small' | 'default' | 'large';
  ref?: React.Ref<HTMLInputElement>;
}

function Input(props: InputProps) {
  const inputCva = cva(
    [
      'placeholder:text-t-subtle border-s-default rounded-lg border text-sm focus:border-neutral-600 focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 focus:ring-offset-b-default focus:outline-none',
    ],
    {
      variants: {
        state: {
          default: 'bg-b-default text-t-muted',
          disabled: 'bg-b-default text-t-disabled cursor-default placeholder:text-t-disabled',
          error: 'bg-red-50 border-s-error text-t-error focus:border-b-error focus:ring-red-200',
        },
        size: {
          small: 'h-8 px-2.5 py-1.5',
          default: 'h-9 px-3 py-2',
          large: 'h-10 px-3 py-2.5',
        },
        hasIcon: {
          true: 'pl-10 pr-3',
          false: '',
        },
      },
      defaultVariants: {
        state: 'default',
        size: 'default',
      },
    },
  );

  const iconCva = cva('pointer-events-none absolute top-1/2 left-3 -translate-y-1/2', {
    variants: {
      state: {
        default: 'text-t-muted',
        disabled: 'text-t-disabled',
        error: 'text-t-error',
      },
    },
  });

  return (
    <div className="relative">
      <Field.Context>
        {context => {
          const state = () =>
            context.invalid ? 'error' : context.disabled ? 'disabled' : 'default';

          return (
            <>
              <Show when={props.icon}>
                {props.icon && (
                  <props.icon
                    stroke="2.25"
                    className={twMerge(
                      iconCva({
                        state: state(),
                      }),
                    )}
                    size={18}
                  />
                )}
              </Show>
              <Field.Input
                {...props}
                ref={props.ref}
                className={twMerge(
                  'w-full',
                  inputCva({
                    state: state(),
                    size: props.sizes,
                    hasIcon: !!props.icon,
                  }),
                  props.className,
                )}
              />
            </>
          );
        }}
      </Field.Context>
    </div>
  );
}

function HelperText(props: FieldHelperTextProps) {
  return (
    <Field.HelperText {...props} className={twMerge('text-xs text-t-subtle', props.className)}>
      {props.children}
    </Field.HelperText>
  );
}

function ErrorText(props: FieldErrorTextProps) {
  return (
    <Field.ErrorText {...props} className={twMerge('text-xs text-t-error', props.className)}>
      {props.children}
    </Field.ErrorText>
  );
}

export const MyField = {
  /** Container principal */
  Root,
  /** Label do campo */
  Label,
  /** Campo de texto */
  Input,
  /** Texto auxiliar */
  HelperText,
  /** Texto de erro */
  ErrorText,
} as const;
