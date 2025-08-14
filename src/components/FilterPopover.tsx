import { Portal } from '@ark-ui/react';
import { Popover } from '@ark-ui/react/popover';

interface FilterPopoverProps extends Popover.RootProps {
  trigger: React.ReactNode;
}

export const FilterPopover = ({ children, trigger, ...rootProps }: FilterPopoverProps) => {
  return (
    <Popover.Root portalled positioning={{ gutter: 4 }} {...rootProps}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content className="animate-tb-in rounded-2xl border border-s-default bg-b-default shadow-bottom-300 data-[state=closed]:animate-tb-out">
            {children}
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
