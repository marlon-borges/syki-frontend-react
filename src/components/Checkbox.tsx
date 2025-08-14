import { Checkbox as CheckboxArk } from '@ark-ui/react';

const CheckIcon = () => {
  return (
    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.70711 0.292893C8.09763 0.683417 8.09763 1.31658 7.70711 1.70711L3.70711 5.70711C3.31658 6.09763 2.68342 6.09763 2.29289 5.70711L0.292893 3.70711C-0.0976311 3.31658 -0.0976311 2.68342 0.292893 2.29289C0.683417 1.90237 1.31658 1.90237 1.70711 2.29289L3 3.58579L6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893Z"
        fill="white"
      />
    </svg>
  );
};

const IndeterminateIcon = () => {
  return (
    <svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1C0 0.447715 0.447715 0 1 0H7C7.55228 0 8 0.447715 8 1C8 1.55228 7.55228 2 7 2H1C0.447715 2 0 1.55228 0 1Z"
        fill="white"
      />
    </svg>
  );
};

export const Checkbox = ({ ...checkboxProps }: CheckboxArk.RootProps) => {
  return (
    <CheckboxArk.Root {...checkboxProps}>
      <CheckboxArk.Control className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border-2 border-s-default bg-b-default hover:border-s-emphasized data-[focus]:ring-2 data-[focus]:ring-s-default data-[focus]:ring-offset-2 data-[focus]:ring-offset-b-default data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500 data-[state=indeterminate]:border-purple-500 data-[state=indeterminate]:bg-purple-500">
        <CheckboxArk.Indicator className="flex h-4 w-4 animate-bt-in items-center justify-center">
          <CheckIcon />
        </CheckboxArk.Indicator>
        <CheckboxArk.Indicator
          className="flex h-4 w-4 animate-bt-in items-center justify-center"
          indeterminate
        >
          <IndeterminateIcon />
        </CheckboxArk.Indicator>
      </CheckboxArk.Control>
      <CheckboxArk.HiddenInput />
    </CheckboxArk.Root>
  );
};
