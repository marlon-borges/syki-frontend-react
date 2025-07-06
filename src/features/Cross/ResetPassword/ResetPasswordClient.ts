import { api } from '@/services/api';
import type { MainBadRequestType } from '@/types/MainBadRequestType';
import { useMutation } from '@tanstack/react-query';

export interface SendResetPasswordProps {
  token: string | null;
  password: string | null;
}

async function ResetPasswordClient({ token, password }: SendResetPasswordProps) {
  try {
    const response = await api.post('/reset-password', {
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
      code: 'UserNotFound',
      message: 'Usuário não encontrado.',
    } satisfies MainBadRequestType;
  }
}

export function useResetPasswordMutation() {
  return useMutation<void, MainBadRequestType, SendResetPasswordProps>({
    mutationKey: ['reset-password'],
    mutationFn: ResetPasswordClient,
  });
}
