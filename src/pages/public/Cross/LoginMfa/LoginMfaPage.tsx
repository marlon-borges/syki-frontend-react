import { AuthCard } from '@/components/auth/AuthCard';
import { MyPinInput } from '@/components/MyPinInput';

const LoginMfaPage = () => {
  return (
    <AuthCard title="Código do Google Authenticator" helperText="Informe os 6 dígitos para entrar">
      <MyPinInput />
    </AuthCard>
  );
};

export default LoginMfaPage;
