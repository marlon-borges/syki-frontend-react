import {
  Menu,
  Portal,
  type MenuContentProps,
  type MenuItemProps,
  type MenuRootProps,
  type MenuSeparatorProps,
  type MenuTriggerProps,
} from '@ark-ui/react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const MenuRoot = ({ positioning, children, ...rootProps }: MenuRootProps) => (
  <Menu.Root {...rootProps} positioning={{ gutter: 4, ...positioning }}>
    {children}
  </Menu.Root>
);

const MenuTrigger = ({ children, ...triggerProps }: MenuTriggerProps) => (
  <Menu.Trigger asChild {...triggerProps}>
    {children}
  </Menu.Trigger>
);

const MenuContent = ({ children, ...contentProps }: MenuContentProps) => (
  <Portal>
    <Menu.Positioner className="z-(--index-menu)">
      <Menu.Content
        {...contentProps}
        className={twMerge(
          'z-(--index-menu) animate-tb-in rounded-lg border border-s-default bg-b-default p-1 shadow-bottom-300 focus-within:outline-none focus:outline-none focus-visible:outline-none data-[state=closed]:animate-tb-out',
          contentProps.className,
        )}
      >
        {children}
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
);

const MenuSeparator = (separatorProps: MenuSeparatorProps) => (
  <Menu.Separator {...separatorProps} className="mx-1 my-1 text-s-default" />
);

interface ItemProps extends MenuItemProps {
  variant?: 'default' | 'error' | 'disabled' | 'active';
  size?: 'small' | 'default' | 'large';
}

const MenuItem = ({ children, variant, size, ...itemProps }: ItemProps) => {
  const itemCva = cva('rounded-sm flex cursor-pointer items-center gap-1.5 text-sm font-medium', {
    variants: {
      variant: {
        default: 'text-t-muted bg-b-default hover:bg-b-subtle data-[highlighted=true]:bg-b-subtle',
        error: 'text-t-error bg-b-default hover:bg-b-error data-[highlighted=true]:bg-b-error',
        disabled:
          'text-t-disabled cursor-default hover:bg-transparent data-[highlighted=true]:bg-transparent',
        active: 'text-t-default bg-b-muted hover:bg-b-muted data-[highlighted=true]:bg-b-muted',
      },
      size: {
        small: 'px-1.5 h-8 min-h-8 max-h-8',
        default: 'px-2 h-9 min-h-9 max-h-9',
        large: 'px-2 h-10 min-h-10 max-h-10',
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  });

  return (
    <Menu.Item
      className={twMerge(itemCva({ variant: itemProps.disabled ? 'disabled' : variant, size }))}
      {...itemProps}
    >
      <span className="px-0.5">{children}</span>
    </Menu.Item>
  );
};

const MenuCustomItem = ({ children, ...customItemProps }: React.ComponentProps<'div'>) => (
  <div {...customItemProps}>{children}</div>
);

export const Dropdown = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
  CustomItem: MenuCustomItem,
  Separator: MenuSeparator,
};
