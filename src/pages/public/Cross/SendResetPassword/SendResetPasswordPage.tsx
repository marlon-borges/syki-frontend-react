import { AuthCard } from '@/components/auth/AuthCard';
import { Button } from '@/components/Button';
import { MyField } from '@/components/MyField';
import { Link } from 'react-router';

const SendResetPasswordPage = () => {
  return (
    <AuthCard
      title="Recupere sua senha"
      helperText="Enviaremos um link de redefinição para o e-mail"
    >
      <MyField.Root>
        <MyField.Label>E-mail</MyField.Label>
        <MyField.Input sizes="large" autoFocus placeholder="Digite seu e-mail" />
        <MyField.ErrorText>ErrorText do input</MyField.ErrorText>
      </MyField.Root>
      <Button classNames="w-full" size="large">
        Enviar link de redefinição
      </Button>
      <p className="text-center text-sm font-medium text-normal">
        Lembrou da senha?{' '}
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

export default SendResetPasswordPage;
