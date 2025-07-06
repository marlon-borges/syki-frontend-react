import { api } from '@/services/api';
import type { MainBadRequestType } from '@/types/MainBadRequestType';
import { useMutation } from '@tanstack/react-query';

export interface LoginMfaProps {
  token: string;
}

export interface LoginMfaResponse {
  accessToken: string | null;
}

async function LoginMfaClient({ token }: LoginMfaProps) {
  try {
    const response = await api.post('/login/mfa', {
      token,
    });
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      const apiError: MainBadRequestType = err.response.data;
      throw apiError;
    }
    throw {
      code: 'LoginRequestTwoFactor',
      message: 'Utilize o segundo fator de autenticação para realizar login.',
    } satisfies MainBadRequestType;
  }
}

export function useLoginMfaMutation() {
  return useMutation<LoginMfaResponse, MainBadRequestType, LoginMfaProps>({
    mutationKey: ['login-mfa'],
    mutationFn: LoginMfaClient,
  });
}
