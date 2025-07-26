import z from 'zod';
import { useDialog } from '@/hooks/useDialog';
import { MyDialog } from '@/components/Dialog';
import { MyField } from '@/components/MyField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateClassroomMutation } from '@/features/Academic/CreateClassroom/CreateClassroomClient';
import { createListCollection, type DialogRootProps } from '@ark-ui/react';
import { useGetCampi } from '@/features/Academic/GetCampi/GetCampiClient';
import { useQueryClient } from '@tanstack/react-query';
import { MySelect } from '@/components/Select';

const createClassroomSchema = z.object({
  name: z.string().nonempty({ error: 'Nome inválido' }),
  campusId: z.string().nonempty({ error: 'Campus inválido' }),
  capacity: z.number().min(1, { message: 'Capacidade deve ser maior que 0' }),
});

type CreateClassroomProps = z.infer<typeof createClassroomSchema>;

const CreateClassroomDialog = ({ children, ...rootProps }: DialogRootProps) => {
  const { data } = useGetCampi();

  const collection = createListCollection({
    items:
      data?.map(campus => ({
        label: campus.name,
        value: campus.id,
      })) || [],
  });

  const { handleSubmit, formState, register, reset } = useForm<CreateClassroomProps>({
    resolver: zodResolver(createClassroomSchema),
    defaultValues: {
      name: '',
      campusId: '',
      capacity: 0,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useCreateClassroomMutation();
  const { isOpen, closeDialog } = useDialog();

  function onSubmit(form: CreateClassroomProps) {
    mutate(
      {
        name: form.name,
        campusId: form.campusId,
        capacity: form.capacity,
      },
      {
        onSuccess: () => {
          closeDialog(false);
          reset();
          queryClient.invalidateQueries({
            queryKey: ['get-classrooms'],
          });
        },
      },
    );
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
        <MyDialog.Header>Nova sala de aula</MyDialog.Header>
        <MyDialog.Body className="space-y-4">
          <MySelect.MainRoot className="w-full" invalid={!!formState.errors.campusId}>
            <MySelect.Root collection={collection}>
              <MySelect.Label>Campus</MySelect.Label>
              <MySelect.HookFormRegister {...register('campusId')} />
              <MySelect.Trigger placeholder="Selecione..." />
              <MySelect.Content hasPortal={false}>
                {collection.items.map((item, i) => (
                  <MySelect.Item key={`campus-select-item-${i}`} item={item}>
                    {item.label}
                  </MySelect.Item>
                ))}
              </MySelect.Content>
            </MySelect.Root>
            <MySelect.ErrorText>{formState.errors.campusId?.message}</MySelect.ErrorText>
          </MySelect.MainRoot>

          <MyField.Root invalid={!!formState.errors.name}>
            <MyField.Label>Nome</MyField.Label>
            <MyField.Input placeholder="Ex: Sala G06" {...register('name')} />
            <MyField.ErrorText>{formState.errors.name?.message}</MyField.ErrorText>
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
          primaryText="Criar"
          onPrimary={handleSubmit(onSubmit)}
        />
      </MyDialog.Content>
    </MyDialog.Root>
  );
};

export default CreateClassroomDialog;
