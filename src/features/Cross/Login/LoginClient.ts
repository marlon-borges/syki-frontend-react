import { api } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import type { MainBadRequestType } from '@/types/MainBadRequestType';

export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

async function LoginClient({ email, password }: LoginProps) {
  try {
    const response = await api.post('/login', {
      email,
      password,
    });
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      const apiError: MainBadRequestType = err.response.data;
      throw apiError;
    }
    throw {
      code: 'UserNotFound',
      message: 'Usuário não encontrado.',
    } satisfies MainBadRequestType;
  }
}

export function useLoginMutation() {
  return useMutation<LoginResponse, MainBadRequestType, LoginProps>({
    mutationKey: ['login'],
    mutationFn: LoginClient,
  });
}
