import { AuthCard } from '@/components/auth/AuthCard';
import { Button } from '@/components/Button';
import { MyField } from '@/components/MyField';
import { Link } from 'react-router';

const RegisterPage = () => {
  return (
    <AuthCard title="Cadastre-se na Syki" helperText="Enviaremos um e-mail de confirmação">
      <MyField.Root>
        <MyField.Label>E-mail</MyField.Label>
        <MyField.Input sizes="large" autoFocus placeholder="Digite seu e-mail" />
        <MyField.ErrorText>ErrorText do input</MyField.ErrorText>
      </MyField.Root>
      <Button classNames="w-full" size="large">
        Registrar
      </Button>
      <p className="text-center text-sm font-medium text-normal">
        Já tem uma conta?{' '}
        <Link
          to="/login"
          className="text-action-primary hover:underline focus-visible:underline focus-visible:outline-none"
        >
          Faça login
        </Link>
      </p>
    </AuthCard>
  );
};

export default RegisterPage;
