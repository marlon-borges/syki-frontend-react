import type { ReactNode } from 'react';

export interface ShowProps {
  when: boolean;
  children: ReactNode;
  fallback?: ReactNode | null;
}

export const Show = ({ when, children, fallback = null }: ShowProps) => {
  return when ? children : fallback;
};
