import { type PropsWithChildren } from 'react';

export const FilterChipContainer = ({ children }: PropsWithChildren) => {
  return <div className="mb-4 flex w-full flex-wrap items-center gap-2">{children}</div>;
};
