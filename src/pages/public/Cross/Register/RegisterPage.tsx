import { z } from 'zod';
import { Link } from 'react-router';
import { Show } from '@/components/Show';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { MyField } from '@/components/MyField';
import { AuthCard } from '@/components/auth/AuthCard';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAlertTriangle, IconProgressCheck } from '@tabler/icons-react';
import { usePendingRegisterMutation } from '@/features/Cross/PendingRegister/PendingRegisterClient';

const registerSetupSchema = z.object({
  email: z.email({ error: 'E-mail inválido' }),
});

type RegisterSetupSchema = z.infer<typeof registerSetupSchema>;

const RegisterPage = () => {
  const { control, handleSubmit } = useForm<RegisterSetupSchema>({
    resolver: zodResolver(registerSetupSchema),
    defaultValues: {
      email: '',
    },
  });

  const { mutate, isPending, isError, error, isSuccess } = usePendingRegisterMutation();

  function onSubmit(formValues: RegisterSetupSchema) {
    mutate({ email: formValues.email });
  }

  return (
    <>
      <Show when={!isSuccess}>
        <AuthCard title="Cadastre-se no Syki" helperText="Enviaremos um e-mail de confirmação">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <MyField.Root invalid={!!fieldState.error?.message}>
                <MyField.Label>E-mail</MyField.Label>
                <MyField.Input
                  sizes="large"
                  autoFocus
                  placeholder="Digite seu e-mail"
                  value={field.value}
                  onChange={field.onChange}
                />
                <MyField.ErrorText>{fieldState.error?.message}</MyField.ErrorText>
              </MyField.Root>
            )}
          />

          <Show when={isError}>
            <Alert
              icon={IconAlertTriangle}
              title={error?.message ?? 'E-mail inválido'}
              variant="light"
              color="error"
              showCloseButton={false}
            />
          </Show>

          <Button
            classNames="w-full"
            size="large"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            Registrar
          </Button>

          <p className="text-center text-sm font-medium text-t-muted">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="text-t-accent hover:underline focus-visible:underline focus-visible:outline-none"
            >
              Faça login
            </Link>
          </p>
        </AuthCard>
      </Show>

      <Show when={isSuccess}>
        <AuthCard title="Cadastro concluído!" helperText="Verifique seu email e utilize o link que enviamos para definir sua senha de acesso.">
          <div className="flex w-full flex-col items-center gap-2">
            <IconProgressCheck stroke="2.25" size={68} className="shrink-0" />
          </div>
        </AuthCard>
      </Show>
    </>
  );
};

export default RegisterPage;
