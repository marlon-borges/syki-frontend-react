import { Show } from '@/components/Show';
import {
  Field,
  Portal,
  Select,
  type SelectHiddenSelectProps,
  type SelectItemGroupProps,
  type SelectItemProps,
  type SelectLabelProps,
  type SelectRootProps,
  type SelectValueTextProps,
} from '@ark-ui/react';
import { IconCheck, IconChevronDown, type TablerIcon } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

/* 
* Necessário
* createListCollection: lista de opções do ark-ui;
* MySelect: importado de @/components/Select;
* 
* Obs: MainRoot é o container de Root, é nele que adicionamos HelperText e ErrorText;

* @example

import { MySelect } from '@/components/Select';
import { createListCollection } from '@ark-ui/react';

const collection = createListCollection({
    items: [
      {
        label: 'option1',
        value: 'option-1',
      },
      {
        label: 'option2',
        value: 'option-2',
        disabled: true
      },
    ],
  });

  <MySelect.MainRoot className="w-3xs">
    <MySelect.Root collection={collection} deselectable>
      <MySelect.Label>Label</MySelect.Label>
      <MySelect.Trigger placeholder="Selecione uma opção" />
      <MySelect.Content>
        {collection.items.map((item, i) => (
          <MySelect.Item key={`state-select-item-${i}`} item={item}>
            {item.label}
          </MySelect.Item>
        ))}
      </MySelect.Content>
    </MySelect.Root>
    <MySelect.HelperText>Texto de ajuda</MySelect.HelperText>
    <MySelect.ErrorText>Texto ao invalidar o MySelect.Root</MySelect.ErrorText>
  </MySelect.MainRoot>
*/

const FieldRoot = ({ children, className, ...fieldRootProps }: Field.RootProps) => {
  return (
    <Field.Root {...fieldRootProps} className={twMerge('flex flex-col gap-1.5', className)}>
      {children}
    </Field.Root>
  );
};

const FieldErrorText = ({ children, className, ...errorText }: Field.ErrorTextProps) => {
  return (
    <Field.ErrorText {...errorText} className={twMerge('text-xs text-t-error', className)}>
      {children}
    </Field.ErrorText>
  );
};

const FieldHelperText = ({ children, className, ...helperText }: Field.HelperTextProps) => {
  return (
    <Field.HelperText {...helperText} className={twMerge('text-xs text-t-subtle', className)}>
      {children}
    </Field.HelperText>
  );
};

interface SelectRootColectionProps<T> extends SelectRootProps<T> {
  collection: Select.ListCollection<T>;
}

const Root = <T,>({
  collection,
  children,
  className,
  ...rootProps
}: SelectRootColectionProps<T>) => {
  return (
    <Select.Root
      collection={collection}
      className={twMerge('flex flex-col gap-1.5', className)}
      positioning={{ gutter: 4, ...rootProps['positioning'] }}
      {...rootProps}
    >
      {children}
    </Select.Root>
  );
};

const Label = ({ children, className, ...labelProps }: SelectLabelProps) => {
  return (
    <Select.Label
      {...labelProps}
      className={twMerge('text-sm font-medium text-t-muted dark:text-t-muted', className)}
    >
      {children}
    </Select.Label>
  );
};

interface SelectTriggerProps extends SelectValueTextProps {
  icon?: TablerIcon;
  size?: 'small' | 'default' | 'large';
}

const Trigger = ({ icon: Icon, className, size, ...valueProps }: SelectTriggerProps) => {
  const controlCva = cva(
    'flex w-full items-center rounded-lg border border-s-default bg-b-default data-[focus]:ring-2 data-[focus]:ring-s-default data-[focus]:ring-offset-2 data-[focus]:ring-offset-b-default focus:outline-none data-[invalid]:bg-b-error data-[invalid]:border-s-error data-[invalid]:data-[focus]:ring-red-200 data-[disabled]:bg-b-default data-[disabled]:border-s-default data-[disabled]:cursor-default',
    {
      variants: {
        size: {
          small: 'h-8 ',
          default: 'h-9',
          large: 'h-10',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    },
  );

  const triggerCva = cva(
    'flex h-full w-full items-center gap-2 cursor-pointer data-[disabled]:cursor-default text-sm font-normal text-t-muted data-[disabled]:text-t-disabled *:data-[invalid]:text-t-error focus:outline-none data-[focus]:outline-none',
    {
      variants: {
        size: {
          small: 'h-8 px-2.5 py-2',
          default: 'h-9 px-3 py-2',
          large: 'h-10 py-2.5 px-3',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    },
  );

  return (
    <Select.Control className={twMerge(controlCva({ size }))}>
      <Select.Trigger
        className={twMerge(
          triggerCva({ size }),
          Icon
            ? 'data-[placeholder-shown]:[&>*:nth-child(2)]:text-t-subtle'
            : 'data-[placeholder-shown]:[&>*:nth-child(1)]:text-t-subtle',
        )}
      >
        {Icon && (
          <Select.Indicator className="h-4.5 max-h-4.5 w-4.5 max-w-4.5 shrink-0">
            <Icon size={18} />
          </Select.Indicator>
        )}
        <Select.ValueText
          {...valueProps}
          className={twMerge('w-0 flex-1 truncate px-0.5 text-left', className)}
        />
        <Select.Indicator className={twMerge('transition-all data-[state=open]:rotate-180')}>
          <IconChevronDown size={18} />
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>
  );
};

interface ContentProps extends SelectItemGroupProps {
  hasPortal?: boolean;
}

const Content = ({ children, hasPortal = true, ...itemGroupProps }: ContentProps) => {
  return (
    <Portal disabled={!hasPortal}>
      <Select.Positioner className="w-(--reference-width)">
        <Select.Content className="z-(--index-menu) max-h-60 w-full animate-tb-in overflow-auto rounded-lg border border-s-default bg-b-default p-1 shadow-bottom-300 focus-within:outline-none focus:outline-none focus-visible:outline-none data-[state=closed]:animate-tb-out">
          <Select.ItemGroup {...itemGroupProps}>{children}</Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Portal>
  );
};

interface MySelectItemProps extends SelectItemProps {
  icon?: TablerIcon;
  size?: 'small' | 'default' | 'large';
  helperText?: string | ReactNode;
}

const Item = ({ children, icon: Icon, size, helperText, ...itemProps }: MySelectItemProps) => {
  const itemCva = cva(
    'flex cursor-pointer items-center justify-between rounded-sm bg-b-default text-sm font-medium hover:bg-b-subtle data-[disabled]:bg-b-default data-[highlighted]:bg-b-subtle',
    {
      variants: {
        size: {
          small: 'py-1.5 px-1.5 gap-1.5 h-8',
          default: 'py-2 px-2 gap-1.5 h-9',
          large: 'px-2 py-2.5 gap-1.5 h-10',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    },
  );

  return (
    <Select.Item {...itemProps} className={twMerge(itemCva({ size }))}>
      <Select.ItemText className="flex items-center gap-1.5 text-sm font-medium text-t-muted data-[disabled]:text-t-disabled!">
        {Icon && (
          <div className="pl-0.5">
            <Icon stroke={2.25} size={18} className="min-h-4.5 min-w-4.5 shrink-0" />
          </div>
        )}
        <p className="truncate pl-0.5">{children}</p>
        {helperText && <p className="text-sm font-normal text-t-subtle">{helperText}</p>}
      </Select.ItemText>
      <Select.ItemIndicator className="text-t-accent data-[disabled]:text-t-disabled">
        <div className="pr-0.5">
          <IconCheck stroke={2.25} size={18} className="min-h-4.5 min-w-4.5 shrink-0" />
        </div>
      </Select.ItemIndicator>
    </Select.Item>
  );
};

const HiddenSelect = ({ ...hiddenSelectProps }: SelectHiddenSelectProps) => {
  return <Select.HiddenSelect {...hiddenSelectProps} />;
};

export const BaseSelect = {
  MainRoot: FieldRoot,
  Root,
  Label,
  HookFormRegister: HiddenSelect,
  Trigger,
  Content,
  Item,
  ErrorText: FieldErrorText,
  HelperText: FieldHelperText,
};

type ListSelectionItem = {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: TablerIcon;
  size?: 'small' | 'default' | 'large';
};

export interface MySelectProps {
  collection: MySelectCollectionList;
  invalid?: boolean;
  defaultValue?: string[] | undefined;
  classNames?: {
    MainRoot?: string;
    Root?: string;
    Label?: string;
    Trigger?: string;
    Content?: string;
    Item?: string;
    HelperText?: string;
    ErrorText?: string;
  };
  Label?: string;
  HelperText?: string;
  ErrorText?: string;
  register?: UseFormRegisterReturn;
  placeholder?: string;
  hasPortal?: boolean;
  onValueChange?: (value: Select.ValueChangeDetails) => void;
  value?: string[];
  size?: 'small' | 'default' | 'large';
  disabled?: boolean;
}

export interface MySelectCollectionList extends Select.ListCollection {
  items: ListSelectionItem[];
}

export const MySelect = ({
  collection,
  classNames,
  Label,
  HelperText,
  ErrorText,
  register,
  placeholder,
  hasPortal,
  invalid,
  defaultValue,
  onValueChange,
  value,
  size,
  disabled,
}: MySelectProps) => {
  return (
    <BaseSelect.MainRoot className={classNames?.MainRoot} invalid={invalid} disabled={disabled}>
      <BaseSelect.Root
        collection={collection}
        className={classNames?.Root}
        onValueChange={onValueChange}
        value={value}
        defaultValue={defaultValue && defaultValue}
      >
        <Show when={!!Label}>
          <BaseSelect.Label className={classNames?.Label}>{Label}</BaseSelect.Label>
        </Show>
        <BaseSelect.HookFormRegister {...register} />
        <BaseSelect.Trigger placeholder={placeholder} size={size} className={classNames?.Trigger} />
        <BaseSelect.Content hasPortal={hasPortal} className={classNames?.Content}>
          {collection.items.map((item, i) => (
            <BaseSelect.Item
              key={`select-item-${i}`}
              item={item}
              icon={item.icon}
              size={size}
              className={classNames?.Item}
            >
              {item.label}
            </BaseSelect.Item>
          ))}
        </BaseSelect.Content>
      </BaseSelect.Root>
      <Show when={!!HelperText}>
        <BaseSelect.HelperText className={classNames?.HelperText}>
          {HelperText}
        </BaseSelect.HelperText>
      </Show>
      <Show when={!!ErrorText}>
        <BaseSelect.ErrorText className={classNames?.ErrorText}>{ErrorText}</BaseSelect.ErrorText>
      </Show>
    </BaseSelect.MainRoot>
  );
};
