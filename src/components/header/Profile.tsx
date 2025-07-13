import { IconChevronDown } from '@tabler/icons-react';
import type React from 'react';
import { twMerge } from 'tailwind-merge';

interface ProfileProps extends React.ComponentProps<'button'> {
  src: string;
  alt: string;
  isActive?: boolean;
}

export const Profile = ({ isActive, src, alt, ...buttonProps }: ProfileProps) => {
  return (
    <button
      {...buttonProps}
      className="flex cursor-pointer items-center gap-2 rounded-lg bg-b-default py-0.5 pr-1.5 pl-0.5 hover:bg-b-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-s-default focus-visible:ring-offset-2 focus-visible:ring-offset-b-default focus-visible:outline-none"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={32}
        height={32}
        className="h-8 max-h-8 min-h-8 w-8 max-w-8 min-w-8 rounded-md"
      />
      <IconChevronDown
        stroke={2.25}
        size={16}
        className={twMerge(
          'text-t-muted transition-all duration-150',
          isActive ? 'rotate-180' : 'rotate-0',
        )}
      />
    </button>
  );
};
