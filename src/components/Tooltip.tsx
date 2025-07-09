import { Portal } from '@ark-ui/react';
import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

interface TooltipProps extends Omit<ArkTooltip.RootProps, 'positioning'> {
  label: string;
  description?: string;
  placement?:
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';
}

export const Tooltip = ({ label, description, placement, ...props }: TooltipProps) => {
  const tooltipContentClass = cva('z-[--index-tooltip] rounded-lg bg-neutral-950 px-3 py-2', {
    variants: {
      placement: {
        top: '',
        'top-start': '',
        'top-end': '',
        bottom: '',
        'bottom-start': '',
        'bottom-end': '',
        left: '',
        'left-start': '',
        'left-end': '',
        right: '',
        'right-start': '',
        'right-end': '',
      },
      state: {
        open: '',
        closed: '',
      },
    },
    compoundVariants: [
      {
        placement: ['top', 'top-start', 'top-end'],
        state: 'open',
        class:
          'data-[placement=top]:animate-bt-in data-[placement=top-start]:animate-bt-in data-[placement=top-end]:animate-bt-in',
      },
      {
        placement: ['top', 'top-start', 'top-end'],
        state: 'closed',
        class:
          'data-[placement=top]:data-[state=closed]:animate-bt-out data-[placement=top-start]:data-[state=closed]:animate-bt-out data-[placement=top-end]:data-[state=closed]:animate-bt-out',
      },
      {
        placement: ['bottom', 'bottom-start', 'bottom-end'],
        state: 'open',
        class:
          'data-[placement=bottom]:animate-tb-in data-[placement=bottom-start]:animate-tb-in data-[placement=bottom-end]:animate-tb-in',
      },
      {
        placement: ['bottom', 'bottom-start', 'bottom-end'],
        state: 'closed',
        class:
          'data-[placement=bottom]:data-[state=closed]:animate-tb-out data-[placement=bottom-start]:data-[state=closed]:animate-tb-out data-[placement=bottom-end]:data-[state=closed]:animate-tb-out',
      },
      {
        placement: ['left', 'left-start', 'left-end'],
        state: 'open',
        class:
          'data-[placement=left]:animate-rl-in data-[placement=left-start]:animate-rl-in data-[placement=left-end]:animate-rl-in',
      },
      {
        placement: ['left', 'left-start', 'left-end'],
        state: 'closed',
        class:
          'data-[placement=left]:data-[state=closed]:animate-rl-out data-[placement=left-start]:data-[state=closed]:animate-rl-out data-[placement=left-end]:data-[state=closed]:animate-rl-out',
      },
      {
        placement: ['right', 'right-start', 'right-end'],
        state: 'open',
        class:
          'data-[placement=right]:animate-lr-in data-[placement=right-start]:animate-lr-in data-[placement=right-end]:animate-lr-in',
      },
      {
        placement: ['right', 'right-start', 'right-end'],
        state: 'closed',
        class:
          'data-[placement=right]:data-[state=closed]:animate-lr-out data-[placement=right-start]:data-[state=closed]:animate-lr-out data-[placement=right-end]:data-[state=closed]:animate-lr-out',
      },
    ],

    defaultVariants: {
      placement: 'top',
    },
  });

  return (
    <ArkTooltip.Root
      openDelay={0}
      closeDelay={0}
      positioning={{ offset: { mainAxis: 6 }, placement }}
      {...props}
    >
      <ArkTooltip.Trigger asChild>{props.children}</ArkTooltip.Trigger>
      <Portal>
        <ArkTooltip.Context>
          {context => (
            <ArkTooltip.Positioner
              className="z-(--z-index)"
              // style={{
              //    '--z-index': '11000',
              // }}
            >
              <ArkTooltip.Content
                className={twMerge(
                  tooltipContentClass({ placement, state: context.open ? 'open' : 'closed' }),
                )}
              >
                <ArkTooltip.Arrow
                  style={{
                    //@ts-ignore
                    '--arrow-size': '8px',
                    '--arrow-background': '#090C12',
                  }}
                >
                  <ArkTooltip.ArrowTip className="rounded-tl-[4px]" />
                </ArkTooltip.Arrow>
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <span className="text-center text-sm font-medium text-t-inverted">{label}</span>
                  {description && (
                    <span className="text-center text-xs font-normal text-t-subtle">
                      {description}
                    </span>
                  )}
                </div>
              </ArkTooltip.Content>
            </ArkTooltip.Positioner>
          )}
        </ArkTooltip.Context>
      </Portal>
    </ArkTooltip.Root>
  );
};
