import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import {
  Dialog,
  Portal,
  type DialogContentProps,
  type DialogDescriptionProps,
  type DialogRootProps,
  type DialogTitleProps,
  type DialogTriggerProps,
} from '@ark-ui/react';
import { IconX } from '@tabler/icons-react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

/* 
* Necessário
* useDialog: o dialog do ark precisa renderizar na tela sempre que abrir, gerando um bug na animação de abertura, então usar esse hook para esperar 2ms até ele conseguir renderizar por completo;
* 
* Obs: não é necessário passar o Trigger, ele pode ser aberto pelo "open" e "onOpenChange", mostrado no exemplo. Se precisar inserir o trigger, passar ele logo após o Root, antes do Content;

* @example

  import { useDialog } from '@/hooks/useDialog';
  import { MyDialog } from '@/components/Dialog';
  import { MyField } from '@/components/MyField';

  const { closeDialog, isOpen, openDialog } = useDialog();

  <MyDialog.Root open={isOpen} onOpenChange={e => closeDialog(e.open)}>
    <MyDialog.Content size="small-500">
      <MyDialog.Header>Exemplo para criar</MyDialog.Header>
      <MyDialog.Body>
        <MyField.Root>
          <MyField.Label>Nome</MyField.Label>
          <MyField.Input placeholder="Ex: Instituto Vida" />
        </MyField.Root>
      </MyDialog.Body>
      <MyDialog.Footer hasTertiary={false} primaryText="Criar" />
    </MyDialog.Content>
  </MyDialog.Root>
*/

const Root = ({ children, ...rootProps }: DialogRootProps) => {
  return <Dialog.Root {...rootProps}>{children}</Dialog.Root>;
};

const Trigger = ({ children, ...triggerProps }: DialogTriggerProps) => {
  return (
    <Dialog.Trigger {...triggerProps} asChild>
      {children}
    </Dialog.Trigger>
  );
};

interface ContentProps extends DialogContentProps {
  size?: 'small-500' | 'default-672' | 'large-768' | 'fullscreen';
}

const Content = ({ children, className, size, ...contentProps }: ContentProps) => {
  const contentCva = cva(
    'w-[calc(100%-3rem)] animate-dialog-slide-in flex-col overflow-hidden rounded-2xl border border-s-default bg-b-default data-[state=closed]:animate-dialog-slide-out',
    {
      variants: {
        size: {
          'small-500': 'sm:max-w-125',
          'default-672': 'sm:max-w-2xl',
          'large-768': 'sm:max-w-3xl',
          fullscreen: 'h-[calc(100%-3rem)]',
        },
      },
      defaultVariants: {
        size: 'default-672',
      },
    },
  );

  return (
    <Portal>
      <Dialog.Backdrop className="fixed inset-0 z-(--index-backdrop-modal) animate-backdrop-in bg-neutral-950/70 data-[state=closed]:animate-backdrop-out" />
      <Dialog.Positioner className="fixed top-0 left-0 z-(--index-content-modal) grid h-full w-full place-items-center">
        <Dialog.Content className={twMerge(contentCva({ size }), className)} {...contentProps}>
          {children}
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};

const Header = ({ children, className, ...titleProps }: DialogTitleProps) => {
  return (
    <header className="flex items-end justify-between px-6 pt-6 pb-1">
      <Dialog.Title
        className={twMerge(
          'w-full truncate pb-1 font-display text-lg font-semibold text-t-default',
          className,
        )}
        {...titleProps}
      >
        {children}
      </Dialog.Title>
      <Dialog.CloseTrigger asChild>
        <IconButton icon={IconX} variant="ghost" color="neutral" size="small" />
      </Dialog.CloseTrigger>
    </header>
  );
};

const Body = ({ children, className, ...descriptionProps }: DialogDescriptionProps) => {
  return (
    <Dialog.Description className={twMerge('px-6 pt-4', className)} {...descriptionProps}>
      {children}
    </Dialog.Description>
  );
};

interface FooterProps {
  cancelText?: string;
  primaryText?: string;
  tertiaryText?: string;
  hasCancel?: boolean;
  hasTertiary?: boolean;
  onPrimary?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onTertiary?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Footer = ({
  cancelText = 'Cancelar',
  primaryText = 'Botão primário',
  tertiaryText = 'Botão terciário',
  hasCancel = true,
  hasTertiary = true,
  onPrimary = () => {},
  onCancel = () => {},
  onTertiary = () => {},
  isLoading = false,
  isDisabled = false,
}: FooterProps) => {
  return (
    <footer className="flex items-center p-6">
      {hasCancel && (
        <Dialog.CloseTrigger asChild>
          <Button
            color="neutral"
            variant="outline"
            onClick={e => onCancel(e)}
            disabled={isDisabled || isLoading}
          >
            {cancelText}
          </Button>
        </Dialog.CloseTrigger>
      )}
      <div className="flex w-full justify-end gap-4">
        {hasTertiary && (
          <Button
            color="primary"
            variant="light"
            onClick={e => onTertiary(e)}
            disabled={isDisabled || isLoading}
          >
            {tertiaryText}
          </Button>
        )}
        <Button onClick={e => onPrimary(e)} disabled={isDisabled || isLoading}>
          {primaryText}
        </Button>
      </div>
    </footer>
  );
};

export const MyDialog = {
  Root,
  Trigger,
  Content,
  Header,
  Body,
  Footer,
};
