import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { Show } from '@/components/Show';
import { createToaster, Toast, Toaster } from '@ark-ui/react';
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconLoader2,
  IconX,
} from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';

/* 
* Necessário
* toaster: importado de @/components/Toast;
* MyToast: não é necessário importar, pois é o componente que renderiza o Toast e está no root do app layout.
*
* Para melhor entendimento das ações, ler a documentação do chakra-ui: https://chakra-ui.com/docs/components/toast

* @example

import { toaster } from '@/components/Toast';

  <button
   onClick={() => {
      toaster.create({
         title: 'Toast de sucesso',
         description: 'Descrição do toast de sucesso.',
         type: 'success',
         duration: 2000, // Padrão é 5000ms
         closable: true, // Se true, o toast terá um botão de fechar
         action: { // Se quiser adicionar uma ação ao toast, isso também fará o botão de ação aparecer
         label: 'Primary Action',
         onClick() {
            console.log('Primary action clicked');
         },
         },
      });
   > Show Toast </button>
*/

export const toaster = createToaster({
  placement: 'bottom-end',
  gap: 12,
});

export const MyToast = () => {
  function IconByType(toastType: string | undefined) {
    switch (toastType) {
      case 'success':
        return <IconCircleCheck stroke={2.25} size={18} className="text-f-success" />;
      case 'error':
        return <IconAlertCircle stroke={2.25} size={18} className="text-f-error" />;
      case 'info':
        return <IconInfoCircle stroke={2.25} size={18} className="text-f-info" />;
      case 'warning':
        return <IconAlertTriangle stroke={2.25} size={18} className="text-f-warning" />;
      case 'loading':
        return <IconLoader2 stroke={2.25} size={18} className="animate-spin text-t-muted" />;
      default:
        return null;
    }
  }

  function ButtonColorByType(toastType: string | undefined) {
    switch (toastType) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      default:
        return 'neutral';
    }
  }

  return (
    <Toaster toaster={toaster}>
      {toast => (
        <Toast.Root
          className={twMerge(
            'dark flex w-96 translate-y-(--y) animate-bt-in gap-3 rounded-xl bg-b-muted p-3 ring-1 transition-all data-[state=closed]:animate-bt-out',
            toast.type === 'error'
              ? 'ring-s-error'
              : toast.type === 'success'
                ? 'ring-s-success'
                : toast.type === 'info'
                  ? 'ring-s-info'
                  : toast.type === 'warning'
                    ? 'ring-s-warning'
                    : 'ring-s-default',
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-b-emphasized">
            {IconByType(toast.type)}
          </div>
          <div className="flex flex-col gap-1">
            <Toast.Title className="text-sm font-medium text-t-default">
              {toast.type === 'loading' ? 'Loading...' : toast.title}
            </Toast.Title>
            <Show when={toast.description}>
              <Toast.Description className="text-sm font-normal text-t-muted">
                {toast.description}
              </Toast.Description>
            </Show>
            <Show when={toast.action}>
              <div className="flex items-center gap-3">
                <Show when={toast.action?.label}>
                  <Toast.ActionTrigger asChild>
                    <Button color={ButtonColorByType(toast.type)} variant="link" size="small">
                      {toast.action?.label}
                    </Button>
                  </Toast.ActionTrigger>
                </Show>
              </div>
            </Show>
          </div>
          <Show when={toast.closable}>
            <Toast.CloseTrigger asChild>
              <IconButton icon={IconX} size="small" color="neutral" variant="ghost" />
            </Toast.CloseTrigger>
          </Show>
        </Toast.Root>
      )}
    </Toaster>
  );
};
