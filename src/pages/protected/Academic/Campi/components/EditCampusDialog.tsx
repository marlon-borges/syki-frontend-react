import { MyDialog } from '@/components/Dialog';
import { MyField } from '@/components/MyField';
import { MySelect, type MySelectCollectionList } from '@/components/Select';
import { toaster } from '@/components/Toast';
import type { CampusOut } from '@/features/Academic/GetCampi/GetCampiClient';
import { useUpdateCampusMutation } from '@/features/Academic/UpdateCampus/UpdateCampusClient';
import type { StatesType } from '@/types/StatesType';
import { type DialogRootProps } from '@ark-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import z from 'zod';

interface EditCampusDialogProps extends DialogRootProps {
  data: CampusOut;
  stateCollection: MySelectCollectionList;
  onSuccess?: () => void;
}

const newCampusSchema = z.object({
  id: z.string().nonempty({ error: 'ID é obrigatório' }),
  name: z.string().nonempty({ error: 'Nome é obrigatório' }),
  state: z.string().nonempty({ error: 'Estado é obrigatório' }),
  city: z.string().nonempty({ error: 'Cidade é obrigatória' }),
  capacity: z
    .number({ error: 'Apenas números são permitidos' })
    .nonnegative({ message: 'Capacidade não pode ser negativa' })
    .min(1, { message: 'Capacidade deve ser maior que 0' }),
});

type NewCampusProps = z.infer<typeof newCampusSchema>;

export const EditCampusDialog = ({
  data,
  stateCollection,
  onSuccess,
  children,
  ...rootProps
}: EditCampusDialogProps) => {
  const { handleSubmit, formState, register, reset, watch, setValue } = useForm<NewCampusProps>({
    resolver: zodResolver(newCampusSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
      state: data.state,
      city: data.city,
      capacity: data.capacity,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useUpdateCampusMutation();
  const stateChange = watch('state');

  function onSubmit(data: NewCampusProps) {
    toaster.create({
      type: 'loading',
      title: 'Atualizando campus...',
      id: 'updating-campus',
    });
    mutate(
      {
        id: data.id,
        city: data.city,
        name: data.name,
        state: data.state as StatesType,
        capacity: data.capacity,
      },
      {
        onSuccess: () => {
          reset({
            id: data.id,
            city: data.city,
            name: data.name,
            state: data.state as StatesType,
            capacity: data.capacity,
          });
          toaster.update('updating-campus', {
            title: 'Campus editado!',
            type: 'success',
            closable: true,
          });
          queryClient.invalidateQueries({
            queryKey: ['get-campi'],
          });
          onSuccess?.();
        },
        onError() {
          toaster.update('updating-campus', {
            title: 'Erro ao editar o campus!',
            description: 'Por favor, tente novamente.',
            type: 'error',
            closable: true,
          });
        },
      },
    );
  }

  return (
    <MyDialog.Root {...rootProps} closeOnInteractOutside={false} onExitComplete={reset}>
      <MyDialog.Trigger asChild>{children}</MyDialog.Trigger>
      <MyDialog.Content size="small-500">
        <MyDialog.Header>Editar campus</MyDialog.Header>
        <MyDialog.Body className="space-y-4">
          <MyField.Root invalid={!!formState.errors.name}>
            <MyField.Label>Nome</MyField.Label>
            <MyField.Input placeholder="Ex: Instituto Vida" {...register('name')} />
            <MyField.ErrorText>{formState.errors.name?.message}</MyField.ErrorText>
          </MyField.Root>
          <MySelect
            classNames={{ MainRoot: 'w-full' }}
            collection={stateCollection}
            value={stateChange ? [stateChange] : []}
            onValueChange={details => setValue('state', details.value[0])}
            Label="Estado"
            register={register('state')}
            placeholder="Selecione..."
            hasPortal={false}
            ErrorText={formState.errors.state?.message}
            invalid={!!formState.errors.state}
          />
          <MyField.Root invalid={!!formState.errors.city}>
            <MyField.Label>Cidade</MyField.Label>
            <MyField.Input placeholder="Ex: São Paulo" {...register('city')} />
            <MyField.ErrorText>{formState.errors.city?.message}</MyField.ErrorText>
          </MyField.Root>
          <MyField.Root invalid={!!formState.errors.capacity}>
            <MyField.Label>Capacidade</MyField.Label>
            <MyField.Input
              placeholder="Ex: 100"
              {...register('capacity', { setValueAs: v => Number(v) })}
            />
            <MyField.ErrorText>{formState.errors.capacity?.message}</MyField.ErrorText>
          </MyField.Root>
        </MyDialog.Body>
        <MyDialog.Footer
          hasTertiary={false}
          primaryText="Salvar alteração"
          onPrimary={handleSubmit(onSubmit)}
        />
      </MyDialog.Content>
    </MyDialog.Root>
  );
};
