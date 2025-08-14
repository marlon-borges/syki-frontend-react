import { Button } from '@/components/Button';
import { Show } from '@/components/Show';
import type { TablerIcon } from '@tabler/icons-react';

interface EmptyStateProps {
  icon: TablerIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  leftIconAction?: TablerIcon;
  leftIconSecondary?: TablerIcon;
  hasAction: boolean;
  hasSecondaryAction: boolean;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  leftIconAction,
  leftIconSecondary,
  hasAction,
  hasSecondaryAction,
}: EmptyStateProps) => {
  return (
    <div className="flex max-w-2xs flex-col items-center justify-center gap-3">
      <div className="w-fit rounded-lg bg-b-default p-2 shadow-bottom-200 ring-1 ring-s-default">
        <Icon size={24} stroke={2.25} className="text-t-muted" />
      </div>
      <div className="space-y-1">
        <p className="text-center text-sm font-semibold text-t-muted">{title}</p>
        <p className="text-center text-sm font-normal text-t-muted">{description}</p>
      </div>
      <div className="mt-1 flex gap-4">
        <Show when={hasSecondaryAction}>
          <Button
            leftIcon={leftIconSecondary}
            variant="outline"
            color="neutral"
            onClick={onSecondaryAction}
          >
            {secondaryActionText ?? 'Botão secundário'}
          </Button>
        </Show>
        <Show when={hasAction}>
          <Button leftIcon={leftIconAction} onClick={onAction}>
            {actionText ?? 'Botão primário'}
          </Button>
        </Show>
      </div>
    </div>
  );
};
