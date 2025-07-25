import { MyDialog } from '@/components/Dialog';
import { MyField } from '@/components/MyField';
import { MySelect } from '@/components/Select';
import { useCreateCampusMutation } from '@/features/Academic/CreateCampus/CreateCampusClient';
import { useDialog } from '@/hooks/useDialog';
import { STATES_OPTIONS } from '@/pages/protected/Academic/Campi/types/FullNameStates';
import type { StatesType } from '@/types/StatesType';
import { createListCollection, type DialogRootProps } from '@ark-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';

const newCampusSchema = z.object({
  name: z.string().nonempty({ error: 'Nome é obrigatório' }),
  state: z.string().nonempty({ error: 'Estado é obrigatório' }),
  city: z.string().nonempty({ error: 'Cidade é obrigatória' }),
  capacity: z.number().min(1, { message: 'Capacidade deve ser maior que 0' }),
});

type NewCampusProps = z.infer<typeof newCampusSchema>;

export const CreateCampusDialog = ({ children, ...rootProps }: DialogRootProps) => {
  const collection = createListCollection({
    items: STATES_OPTIONS,
  });

  const { handleSubmit, formState, register, reset } = useForm<NewCampusProps>({
    resolver: zodResolver(newCampusSchema),
    defaultValues: {
      name: '',
      state: '',
      city: '',
      capacity: 0,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useCreateCampusMutation();
  const { closeDialog, isOpen } = useDialog();

  function onSubmit(data: NewCampusProps) {
    mutate(
      {
        city: data.city,
        name: data.name,
        state: data.state as StatesType,
        capacity: data.capacity,
      },
      {
        onSuccess: () => {
          closeDialog(false);
          reset();
          queryClient.invalidateQueries({
            queryKey: ['get-campi'],
          });
        },
      },
    );
    console.log('Campus created:', data);
  }

  return (
    <MyDialog.Root
      {...rootProps}
      open={isOpen}
      onOpenChange={e => closeDialog(e.open)}
      unmountOnExit
      closeOnInteractOutside={false}
      onExitComplete={reset}
    >
      <MyDialog.Trigger>{children}</MyDialog.Trigger>
      <MyDialog.Content size="small-500">
        <MyDialog.Header>Novo campus</MyDialog.Header>
        <MyDialog.Body className="space-y-4">
          <MyField.Root invalid={!!formState.errors.name}>
            <MyField.Label>Nome</MyField.Label>
            <MyField.Input placeholder="Ex: Instituto Vida" {...register('name')} />
            <MyField.ErrorText>{formState.errors.name?.message}</MyField.ErrorText>
          </MyField.Root>
          <MySelect.MainRoot className="w-full" invalid={!!formState.errors.state}>
            <MySelect.Root collection={collection}>
              <MySelect.Label>Estado</MySelect.Label>
              <MySelect.HookFormRegister {...register('state')} />
              <MySelect.Trigger placeholder="Selecione..." />
              <MySelect.Content hasPortal={false}>
                {collection.items.map((item, i) => (
                  <MySelect.Item key={`state-select-item-${i}`} item={item}>
                    {item.label}
                  </MySelect.Item>
                ))}
              </MySelect.Content>
            </MySelect.Root>
            <MySelect.ErrorText>{formState.errors.state?.message}</MySelect.ErrorText>
          </MySelect.MainRoot>
          <MyField.Root invalid={!!formState.errors.city}>
            <MyField.Label>Cidade</MyField.Label>
            <MyField.Input placeholder="Ex: São Paulo" {...register('city')} />
            <MyField.ErrorText>{formState.errors.city?.message}</MyField.ErrorText>
          </MyField.Root>
          <MyField.Root invalid={!!formState.errors.capacity}>
            <MyField.Label>Capacidade</MyField.Label>
            <MyField.Input
              placeholder="Ex: 100"
              type="number"
              {...register('capacity', { setValueAs: v => Number(v) })}
            />
            <MyField.ErrorText>{formState.errors.capacity?.message}</MyField.ErrorText>
          </MyField.Root>
        </MyDialog.Body>
        <MyDialog.Footer
          hasTertiary={false}
          primaryText="Criar campus"
          onPrimary={handleSubmit(onSubmit)}
        />
      </MyDialog.Content>
    </MyDialog.Root>
  );
};
