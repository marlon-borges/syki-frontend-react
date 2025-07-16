import { AuthCard } from '@/components/auth/AuthCard';
import { CharacterVerification } from '@/components/auth/CharacterVerification';
import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { MyField } from '@/components/MyField';
import { Show } from '@/components/Show';
import { useFinishRegisterMutation } from '@/features/Cross/FinishRegister/FinishRegisterClient';
import { useShowPassword } from '@/utils/useShowPassword';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

type isValidPasswordProps = {
  numbers: boolean;
  lowercase: boolean;
  uppercase: boolean;
  eightCharacters: boolean;
  specialCharacters: boolean;
  isAllValid: boolean;
};

const RegisterSetupPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const nav = useNavigate();

  const { mutate, isPending, isError, error, isSuccess } = useFinishRegisterMutation();

  function onSubmit() {
    if (!token || !inputRef.current?.value) return;
    mutate({ token: token, password: inputRef.current.value });
  }

  const { showPassword, togglePassword, inputRef } = useShowPassword();
  const [isValidPassword, setIsValidPassword] = useState<isValidPasswordProps>({
    numbers: false,
    lowercase: false,
    uppercase: false,
    eightCharacters: false,
    specialCharacters: false,
    isAllValid: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const numbers = /[0-9]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const uppercase = /[A-Z]/.test(password);
    const eightCharacters = password.length >= 8;
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    const isAllValid = numbers && lowercase && uppercase && eightCharacters && specialCharacters;

    setIsValidPassword({
      numbers,
      lowercase,
      uppercase,
      eightCharacters,
      specialCharacters,
      isAllValid,
    });
  };

  return (
    <>
      <Show when={!isSuccess}>
        <AuthCard
          title="Cadastre-se no Syki"
          helperText="Finalize seu cadastro criando a sua senha"
        >
          <MyField.Root className="relative" invalid={isError}>
            <MyField.Label>Criar senha</MyField.Label>
            <MyField.Input
              sizes="large"
              placeholder="Digite sua senha"
              type={showPassword ? 'text' : 'password'}
              className="pr-10"
              ref={inputRef}
              onChange={handlePasswordChange}
            />
            <IconButton
              icon={showPassword ? IconEyeClosed : IconEye}
              variant={showPassword ? 'light' : 'ghost'}
              color={showPassword ? 'primary' : 'neutral'}
              classNames="absolute top-[1.875rem] right-1"
              size="small"
              onClick={() => togglePassword()}
            />
            <MyField.ErrorText>{error?.message}</MyField.ErrorText>
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
              isValid={isValidPassword['eightCharacters']}
              mainText="8 ou mais caracteres"
              leftText="••••••••"
            />
            <CharacterVerification
              isValid={isValidPassword['specialCharacters']}
              mainText="Caracteres especiais"
              leftText="!@#$%^&*"
            />
          </div>
          <Button
            classNames="w-full"
            size="large"
            onClick={onSubmit}
            disabled={!isValidPassword.isAllValid || isPending}
          >
            Salvar
          </Button>
        </AuthCard>
      </Show>

      <Show when={isSuccess}>
        <AuthCard
          title="Senha salva!"
          helperText="Realize o login e começe a usar o Syki"
        >
          <Button classNames="w-full" size="large" onClick={() => nav('/login')}>
            Ir pro login
          </Button>
        </AuthCard>
      </Show>
    </>
  );
};

export default RegisterSetupPage;
