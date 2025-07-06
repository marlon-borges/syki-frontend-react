import { Show } from '@/components/Show';
import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import { IconCheck, IconX } from '@tabler/icons-react';

type CharacterVerificationProps = {
  isValid: boolean;
  mainText: string;
  leftText: string;
};

export function CharacterVerification(props: CharacterVerificationProps): JSX.Element {
  return (
    <div className="flex w-full items-center gap-2">
      <Show when={props.isValid} fallback={<IconX size={18} stroke="2.25" className="text-low" />}>
        <IconCheck stroke="2.25" className="text-action-success" size={18} />
      </Show>
      <span
        className={twMerge(
          'w-full text-sm font-normal',
          props.isValid ? 'text-action-success' : 'text-normal',
        )}
      >
        {props.mainText}
      </span>
      <span
        className={twMerge(
          'text-sm font-normal whitespace-nowrap',
          props.isValid ? 'text-action-success' : 'text-low',
        )}
      >
        {props.leftText}
      </span>
    </div>
  );
}
