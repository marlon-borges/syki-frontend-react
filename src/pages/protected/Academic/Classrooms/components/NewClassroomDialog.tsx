import z from 'zod';
import { Button } from '@/components/Button';
import { useDialog } from '@/hooks/useDialog';
import { CampusSelect } from './CampusSelect';
import { MyDialog } from '@/components/Dialog';
import { MyField } from '@/components/MyField';
import { IconPlus } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateClassroomMutation } from '@/features/Academic/CreateClassroom/CreateClassroomClient';

const newClassroomSchema = z.object({
  name: z.string().nonempty({ error: 'Nome inválido' }),
  campusId: z.string().nonempty({ error: 'Campus inválido' }),
  capacity: z.string().nonempty({ error: 'Capacidade inválida' }),
});

type NewClassroomSchema = z.infer<typeof newClassroomSchema>;

const NewClassroomDialog = () => {
  const { isOpen, openDialog, closeDialog } = useDialog();

  const { control, handleSubmit } = useForm<NewClassroomSchema>({
    resolver: zodResolver(newClassroomSchema),
    defaultValues: {
      name: '',
      campusId: '',
      capacity: '0',
    },
  });

  const { mutate, isPending, isError, error, isSuccess } = useCreateClassroomMutation();

  function onSubmit(form: NewClassroomSchema) {
    mutate({ name: form.name, campusId: form.campusId, capacity: Number(form.capacity) });
  }

  return (
    <MyDialog.Root open={isOpen} onOpenChange={e => closeDialog(e.open)}>
      <MyDialog.Trigger>
        <Button onClick={() => openDialog()} leftIcon={IconPlus}>
          Nova sala
        </Button>
      </MyDialog.Trigger>
      <MyDialog.Content size="small-500">
        <MyDialog.Header>Nova sala de aula</MyDialog.Header>
        <MyDialog.Body className="grid gap-4">
          <Controller
            name="campusId"
            control={control}
            render={({ field, fieldState }) => (
              <MyField.Root invalid={!!fieldState.error?.message}>
                <CampusSelect 
                  value={[field.value]} onChange={field.onChange}
                />
                <MyField.ErrorText>{fieldState.error?.message}</MyField.ErrorText>
              </MyField.Root>
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <MyField.Root invalid={!!fieldState.error?.message}>
                <MyField.Label>Nome</MyField.Label>
                <MyField.Input
                  sizes="large"
                  autoFocus
                  placeholder="Sala G03"
                  value={field.value}
                  onChange={field.onChange}
                />
                <MyField.ErrorText>{fieldState.error?.message}</MyField.ErrorText>
              </MyField.Root>
            )}
          />

          <Controller
            name="capacity"
            control={control}
            render={({ field, fieldState }) => (
              <MyField.Root invalid={!!fieldState.error?.message}>
                <MyField.Label>Capacidade</MyField.Label>
                <MyField.Input
                  sizes="large"
                  autoFocus
                  placeholder="35"
                  value={field.value}
                  onChange={e => field.onChange(Number(e.target.value) || 0)}
                />
                <MyField.ErrorText>{fieldState.error?.message}</MyField.ErrorText>
              </MyField.Root>
            )}
          />
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

export default NewClassroomDialog;
