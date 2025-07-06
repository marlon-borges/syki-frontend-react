import type { ReactNode } from 'react';

export interface ShowProps<T> {
  when: T | undefined | null | false;
  children: ReactNode;
  fallback?: ReactNode;
}

export const Show = <T,>({ when, children, fallback = null }: ShowProps<T>) => {
  return when ? children : fallback;
};
