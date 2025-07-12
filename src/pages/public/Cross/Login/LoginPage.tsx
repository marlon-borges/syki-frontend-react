import { Show } from '@/components/Show';
import { Alert } from '@/components/Alert';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { MyField } from '@/components/MyField';
import { Link, useNavigate } from 'react-router';
import { IconButton } from '@/components/IconButton';
import { AuthCard } from '@/components/auth/AuthCard';
import { useShowPassword } from '@/utils/useShowPassword';
import { useLoginMutation } from '@/features/Cross/Login/LoginClient';
import { IconAlertTriangle, IconEye, IconEyeClosed } from '@tabler/icons-react';

const LoginPage = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showPassword, togglePassword, inputRef } = useShowPassword();
  const { mutate, isPending, isSuccess, isError, error } = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      nav('/academic/campi');
    }
  }, [isSuccess, nav]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate({ email, password });
  };

  return (
    <AuthCard title="Entre na Syki">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <MyField.Root>
          <MyField.Label>E-mail</MyField.Label>
          <MyField.Input
            name="email"
            type="email"
            sizes="large"
            placeholder="Digite seu e-mail"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MyField.ErrorText>""</MyField.ErrorText>
        </MyField.Root>
        <MyField.Root className="relative">
          <MyField.Label>Senha</MyField.Label>
          <Link
            to="/send-reset-password"
            className="absolute top-1 right-0 cursor-pointer text-xs text-t-subtle hover:underline"
            tabIndex={-1}
          >
            Esqueci minha senha
          </Link>
          <MyField.Input
            sizes="large"
            placeholder="Digite sua senha"
            type={showPassword ? 'text' : 'password'}
            className="pr-10"
            name="password"
            ref={inputRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconButton
            icon={showPassword ? IconEyeClosed : IconEye}
            variant={showPassword ? 'light' : 'ghost'}
            color={showPassword ? 'primary' : 'neutral'}
            classNames="absolute top-[1.875rem] right-1"
            size="small"
            onClick={() => togglePassword()}
            tabIndex={-1}
            type="button"
          />
          <MyField.ErrorText>""</MyField.ErrorText>
        </MyField.Root>
        <Show when={isError}>
          <Alert
            icon={IconAlertTriangle}
            title={error?.message ?? "Email ou senha incorretos"}
            variant="light"
            color="error"
            showCloseButton={false}
          />
        </Show>
        <Button classNames="w-full" size="large" type="submit">
          {isPending ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
      <p className="text-center text-sm font-medium text-t-muted">
        Não tem uma conta?{' '}
        <Link
          to="/register"
          className="text-t-accent hover:underline focus-visible:underline focus-visible:outline-none"
        >
          Comece por aqui
        </Link>
      </p>
    </AuthCard>
  );
};

export default LoginPage;
