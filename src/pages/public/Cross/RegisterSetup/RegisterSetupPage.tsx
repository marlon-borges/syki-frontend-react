import { AuthCard } from '@/components/auth/AuthCard';
import { CharacterVerification } from '@/components/auth/CharacterVerification';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { MyField } from '@/components/MyField';
import { useShowPassword } from '@/utils/useShowPassword';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type isValidPasswordProps = {
  numbers: boolean;
  lowercase: boolean;
  uppercase: boolean;
  'eight-characters': boolean;
  'special-characters': boolean;
  isAllValid: boolean;
};

const RegisterSetupPage = () => {
  const { showPassword, togglePassword, inputRef } = useShowPassword();
  const [isValidPassword, setIsValidPassword] = useState<isValidPasswordProps>({
    numbers: false,
    lowercase: false,
    uppercase: false,
    'eight-characters': false,
    'special-characters': false,
    isAllValid: false,
  });

  return (
    <AuthCard title="Cadastre-se na Syki" helperText="Finalize seu cadastro criando a sua senha">
      <MyField.Root className="relative">
        <MyField.Label>Criar senha</MyField.Label>
        <MyField.Input
          sizes="large"
          placeholder="Digite sua senha"
          type={showPassword ? 'text' : 'password'}
          className="pr-10"
          ref={inputRef}
        />
        <IconButton
          icon={showPassword ? IconEyeClosed : IconEye}
          variant={showPassword ? 'light' : 'ghost'}
          color={showPassword ? 'primary' : 'neutral'}
          classNames="absolute top-[1.875rem] right-1"
          size="small"
          onClick={() => togglePassword()}
        />
        <MyField.ErrorText>ErrorText do input</MyField.ErrorText>
      </MyField.Root>
      <div
        className={twMerge(
          'space-y-2 rounded-lg px-3 py-2.5',
          isValidPassword.isAllValid ? 'bg-green-50' : 'bg-b-subtle',
        )}
      >
        <CharacterVerification
          isValid={isValidPassword.numbers}
          mainText="Números"
          leftText="0 - 9"
        />
        <CharacterVerification
          isValid={isValidPassword.lowercase}
          mainText="Letras minúsculas"
          leftText="a - z"
        />
        <CharacterVerification
          isValid={isValidPassword.uppercase}
          mainText="Letras maiúsculas"
          leftText="A - Z"
        />
        <CharacterVerification
          isValid={isValidPassword['eight-characters']}
          mainText="8 ou mais caracteres"
          leftText="••••••••"
        />
        <CharacterVerification
          isValid={isValidPassword['special-characters']}
          mainText="Caracteres especiais"
          leftText="!@#$%^&*"
        />
      </div>
      <Button classNames="w-full" size="large" disabled={!isValidPassword.isAllValid}>
        Salvar e entrar
      </Button>
    </AuthCard>
  );
};

export default RegisterSetupPage;
