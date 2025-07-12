import { useState } from 'react';
import { Link } from 'react-router';
import { Show } from '@/components/Show';
import { Alert } from '@/components/Alert';
import { Button } from '@/components/Button';
import { MyField } from '@/components/MyField';
import { AuthCard } from '@/components/auth/AuthCard';
import { IconAlertTriangle } from '@tabler/icons-react';
import { usePendingRegisterMutation } from '@/features/Cross/PendingRegister/PendingRegisterClient';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const { mutate, isPending, isError, error } = usePendingRegisterMutation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate({ email });
  };

  return (
    <AuthCard title="Cadastre-se na Syki" helperText="Enviaremos um e-mail de confirmação">
      <MyField.Root>
        <MyField.Label>E-mail</MyField.Label>
        <MyField.Input
          sizes="large"
          autoFocus
          placeholder="Digite seu e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <MyField.ErrorText>ErrorText do input</MyField.ErrorText>
      </MyField.Root>
      <Show when={isError}>
        <Alert
          icon={IconAlertTriangle}
          title={error?.message ?? 'Email inválido'}
          variant="light"
          color="error"
          showCloseButton={false}
        />
      </Show>
      <Button classNames="w-full" size="large" onClick={handleSubmit}>
        {isPending ? 'Registrando...' : 'Registrar'}
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
  );
};

export default RegisterPage;
