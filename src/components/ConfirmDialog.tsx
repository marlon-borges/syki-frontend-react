import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import {
  Dialog,
  Portal,
  type DialogContentProps,
  type DialogContextProps,
  type DialogDescriptionProps,
  type DialogRootProps,
  type DialogTitleProps,
  type DialogTriggerProps,
} from '@ark-ui/react';
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconExclamationCircle,
  IconInfoCircle,
  IconX,
} from '@tabler/icons-react';
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

const Content = ({ children, className, ...contentProps }: DialogContentProps) => {
  return (
    <Portal>
      <Dialog.Backdrop className="fixed inset-0 z-(--index-backdrop-modal) animate-backdrop-in bg-gray-950/70 backdrop-blur-xs data-[state=closed]:animate-backdrop-out dark:bg-gray-900/70" />
      <Dialog.Positioner className="fixed top-0 left-0 z-(--index-content-modal) grid h-full w-full place-items-center">
        <Dialog.Content
          className={twMerge(
            'w-120 max-w-120 animate-dialog-slide-in flex-col overflow-hidden rounded-2xl border border-s-default bg-b-default data-[state=closed]:animate-dialog-slide-out',
            className,
          )}
          {...contentProps}
        >
          {children}
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};

// const Header = () => {
//   return (
//     <header className="flex items-end justify-between bg-red-100 px-6 pt-6 pb-1">
//       <Dialog.CloseTrigger asChild>
//         <IconButton icon={IconX} variant="ghost" color="neutral" size="small" />
//       </Dialog.CloseTrigger>
//     </header>
//   );
// };

const Body = ({ children, className, ...descriptionProps }: DialogDescriptionProps) => {
  return (
    <Dialog.Description className={twMerge('', className)} {...descriptionProps}>
      {children}
    </Dialog.Description>
  );
};

interface FooterProps {
  cancelText?: string;
  primaryText?: string;
  onPrimary?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Footer = ({
  cancelText = 'Cancelar',
  primaryText = 'Botão primário',
  onPrimary = () => {},
  onCancel = () => {},
  isLoading = false,
  isDisabled = false,
}: FooterProps) => {
  return (
    <footer className="flex items-center gap-4 px-6 pb-6">
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
      <Button onClick={e => onPrimary(e)} disabled={isDisabled || isLoading}>
        {primaryText}
      </Button>
    </footer>
  );
};

const Context = ({ ...contextProps }: DialogContextProps) => {
  return <Dialog.Context {...contextProps} />;
};

export const MyConfirmDialogBase = {
  Root,
  Trigger,
  Context,
  Content,
  Body,
  Footer,
};

interface MyConfirmDialogProps extends DialogRootProps {
  cancelText?: string;
  primaryText?: string;
  onPrimary?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  status?: 'error' | 'success' | 'warning' | 'info' | 'neutral' | 'primary';
  content?: React.ReactNode;
}

export const MyConfirmDialog = ({
  cancelText = 'Cancelar',
  primaryText = 'Botão primário',
  onPrimary = () => {},
  onCancel = () => {},
  isLoading = false,
  isDisabled = false,
  children,
  status,
  content,
  ...dialogProps
}: MyConfirmDialogProps) => {
  const dialogCva = cva('', {
    variants: {
      status: {
        error: 'text-t-error bg-b-error',
        success: 'text-t-success bg-b-success',
        warning: 'text-t-warning bg-b-warning',
        info: 'text-t-info bg-b-info',
        neutral: 'text-t-muted bg-gray-50',
        primary: 'text-t-accent bg-purple-50',
      },
    },
    defaultVariants: {
      status: 'error',
    },
  });

  function buttonColorByStatus() {
    const colors = {
      error: 'error',
      success: 'success',
      warning: 'warning',
      info: 'info',
      neutral: 'neutral',
      primary: 'primary',
    };
    return colors[status || 'error'] as MyConfirmDialogProps['status'];
  }

  function IconByStatus() {
    const icons = {
      error: IconExclamationCircle,
      success: IconCircleCheck,
      warning: IconAlertTriangle,
      info: IconInfoCircle,
      neutral: IconInfoCircle,
      primary: IconInfoCircle,
    };
    const IconComponent = icons[status || 'error'];
    return <IconComponent size={32} stroke={2.25} className="shrink-0" />;
  }

  return (
    <MyConfirmDialogBase.Root {...dialogProps}>
      <MyConfirmDialogBase.Trigger asChild>{children}</MyConfirmDialogBase.Trigger>
      <MyConfirmDialogBase.Content className="flex flex-row">
        <div className={twMerge('px-4 py-6', dialogCva({ status }))}>
          <IconByStatus />
        </div>
        <div className="flex w-full flex-col">
          <div className="relative w-full">
            <Dialog.CloseTrigger asChild>
              <IconButton
                icon={IconX}
                classNames="absolute top-4 right-4"
                variant="ghost"
                color="neutral"
                size="small"
              />
            </Dialog.CloseTrigger>
            <MyConfirmDialogBase.Body className="py-6 pr-18 pl-6">
              <div className="text-sm font-normal text-t-muted">
                {content || 'Texto do diálogo de confirmação, podendo adicionar elementos JSX.'}
              </div>
            </MyConfirmDialogBase.Body>
          </div>
          <footer className="flex items-center gap-4 px-6 pb-6">
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
            <Button
              onClick={e => onPrimary(e)}
              color={buttonColorByStatus()}
              disabled={isDisabled || isLoading}
            >
              {primaryText}
            </Button>
          </footer>
        </div>
      </MyConfirmDialogBase.Content>
    </MyConfirmDialogBase.Root>
  );
};
