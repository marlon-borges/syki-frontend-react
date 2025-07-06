import { Show } from '@/components/Show';
import { PinInput, Field } from '@ark-ui/react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface MyPinInputProps extends Field.RootProps {
  helperText?: string;
  errorText?: string;
  pinRootClassName?: string;
}

export function MyPinInput(props: MyPinInputProps) {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <Field.Root {...props} className={twMerge('flex flex-col gap-1.5', props.className)}>
      <PinInput.Root className={twMerge('flex w-full justify-center', props.pinRootClassName)}>
        <PinInput.Control
          className={twMerge(
            'flex w-fit rounded-lg border border-bd_neutral_primary',
            focus &&
              'border-neutral-600 ring-2 ring-neutral-200 ring-offset-2 ring-offset-bg_primary',
            props.invalid && 'border-bd_error bg-red-50 ring-red-200 *:text-action-error',
          )}
        >
          {Array.from({ length: 6 }).map((_, index) => {
            if (index == 0) {
              return (
                <PinInput.Input
                  key={`my-pin-input-${index}`}
                  className="h-10 w-8 pr-1 pl-3 text-center text-lg font-bold text-normal placeholder:text-low focus:outline-none"
                  placeholder="•"
                  index={index}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                />
              );
            } else if (index == 5) {
              return (
                <PinInput.Input
                  key={`my-pin-input-${index}`}
                  className="h-10 w-8 pr-3 pl-1 text-center text-lg font-bold text-normal placeholder:text-low focus:outline-none"
                  placeholder="•"
                  index={index}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                />
              );
            }
            return (
              <PinInput.Input
                key={`my-pin-input-${index}`}
                className="h-10 w-6 text-center text-lg font-bold text-normal placeholder:text-low focus:outline-none"
                placeholder="•"
                index={index}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
            );
          })}
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.Root>
      <Show when={props.helperText}>
        <Field.HelperText className="text-center text-xs text-low">
          {props.helperText}
        </Field.HelperText>
      </Show>
      <Field.ErrorText className="text-center text-xs text-action-error">
        {props.errorText}
      </Field.ErrorText>
    </Field.Root>
  );
}
