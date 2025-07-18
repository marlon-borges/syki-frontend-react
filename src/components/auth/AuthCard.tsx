import placeholderLogo from '@/assets/placeholder-logo.svg';
import { Show } from '@/components/Show';
import type { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  helperText?: string;
  children: ReactNode;
}

export function AuthCard(props: AuthCardProps) {
  return (
    <section className="flex h-screen items-center justify-center">
      <main className="mx-4 max-w-96 space-y-4 rounded-2xl border border-s-default bg-b-default p-6">
        <div className="flex w-full flex-col items-center gap-2">
          <img src={placeholderLogo} alt="placeholder logo" width={32} height={32} />
          <div className="space-y-1">
            <p className="text-center font-display text-lg font-semibold text-t-muted">
              {props.title}
            </p>
            <Show when={!!props.helperText}>
              <p className="text-center text-sm font-normal text-t-subtle">{props.helperText}</p>
            </Show>
          </div>
        </div>
        {props.children}
      </main>
    </section>
  );
}
