import { api } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import type { MainBadRequestType } from '@/types/MainBadRequestType';

export interface FinishRegisterProps {
  token: string;
  password: string;
}

export interface FinishRegisterResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  institutionId: string;
  institution: string;
  role: string;
  online: boolean;
  connections: number;
}

async function FinishRegisterClient({ token, password }: FinishRegisterProps) {
  try {
    const response = await api.put('/users', {
      token,
      password,
    });
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      const apiError: MainBadRequestType = err.response.data;
      throw apiError;
    }
    throw {
      code: 'WeakPassword',
      message: 'Senha fraca.',
    } satisfies MainBadRequestType;
  }
}

export function useFinishRegisterMutation() {
  return useMutation<FinishRegisterResponse, MainBadRequestType, FinishRegisterProps>({
    mutationKey: ['finish-register'],
    mutationFn: FinishRegisterClient,
  });
}
