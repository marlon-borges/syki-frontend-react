import { Alert } from '@/components/Alert';
import { AuthCard } from '@/components/auth/AuthCard';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { MyField } from '@/components/MyField';
import { Show } from '@/components/Show';
import { IconAlertTriangle, IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <AuthCard title="Entre na Syki">
      <form className="space-y-4">
        <MyField.Root>
          <MyField.Label>E-mail</MyField.Label>
          <MyField.Input
            name="email"
            type="email"
            sizes="large"
            placeholder="Digite seu e-mail"
            autoFocus
          />
          <MyField.ErrorText>""</MyField.ErrorText>
        </MyField.Root>
        <MyField.Root className="relative">
          <MyField.Label>Senha</MyField.Label>
          <Link
            to="/send-reset-password"
            className="absolute top-1 right-0 cursor-pointer text-xs text-low hover:underline"
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
          />
          <IconButton
            icon={showPassword ? IconEyeClosed : IconEye}
            variant={showPassword ? 'light' : 'ghost'}
            color={showPassword ? 'primary' : 'neutral'}
            classNames="absolute top-[1.875rem] right-1"
            size="small"
            onClick={() => setShowPassword(prev => !prev)}
            tabIndex={-1}
            type="button"
          />
          <MyField.ErrorText>""</MyField.ErrorText>
        </MyField.Root>
        <Show when={false}>
          <Alert
            icon={IconAlertTriangle}
            title="E-mail ou senha incorretos"
            variant="light"
            color="error"
            showCloseButton={false}
          />
        </Show>
        <Button classNames="w-full" size="large" type="button">
          Entrar
        </Button>
      </form>
      <p className="text-center text-sm font-medium text-normal">
        Não tem uma conta?{' '}
        <Link
          to="/register"
          className="text-action-primary hover:underline focus-visible:underline focus-visible:outline-none"
        >
          Comece por aqui
        </Link>
      </p>
    </AuthCard>
  );
};

export default LoginPage;
