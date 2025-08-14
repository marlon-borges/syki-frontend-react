import { Tooltip } from '@/components/Tooltip';
import { IconChevronRight, IconX } from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

interface InputOptionButtonProps {
  open: boolean;
  onClick: () => void;
  label: string;
  activeCount: number;
  onClear: () => void;
}

export const FilterOptionToggle = (props: InputOptionButtonProps) => {
  const { open, onClick, label, activeCount, onClear } = props;

  return (
    <button
      onClick={onClick}
      className={twMerge(
        'flex h-9 w-full cursor-pointer items-center gap-1.5 rounded-sm bg-b-default px-2 *:text-t-muted hover:bg-b-subtle focus:outline-none focus-visible:bg-b-subtle',
        open && 'bg-b-subtle',
      )}
    >
      <div className="pl-0.5">
        <IconChevronRight
          size={18}
          stroke={2.25}
          className={twMerge('shrink-0 transition-transform', open ? 'rotate-90' : 'rotate-0')}
        />
      </div>
      <span className="text-14-medium w-full pl-0.5 text-left">{label}</span>
      {activeCount > 0 && (
        <div className="flex animate-rl-in items-center gap-1">
          <div className="text-12-medium rounded-md bg-b-accent-muted px-2 py-0.5 whitespace-nowrap text-t-accent">
            {activeCount.toString()}
          </div>
          <Tooltip label="Limpar filtro" openDelay={400} placement="top">
            <div
              className="cursor-pointer rounded-sm p-[3px] text-t-accent hover:bg-b-accent-muted"
              onClick={e => {
                e.stopPropagation();
                onClear();
              }}
            >
              <IconX size={18} stroke={2.25} className="shrink-0" />
            </div>
          </Tooltip>
        </div>
      )}
    </button>
  );
};
