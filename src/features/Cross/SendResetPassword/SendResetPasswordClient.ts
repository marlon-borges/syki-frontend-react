import { api } from '@/services/api';
import type { MainBadRequestType } from '@/types/MainBadRequestType';
import { useMutation } from '@tanstack/react-query';

export interface SendResetPasswordProps {
  email: string | null;
}

async function SendResetPasswordClient({ email }: SendResetPasswordProps) {
  try {
    const response = await api.post('/reset-password-token', {
      email,
    });
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      throw err.response.data as MainBadRequestType;
    }
    throw {
      code: 'UserNotFound',
      message: 'Usuário não encontrado.',
    } satisfies MainBadRequestType;
  }
}

export function useSendResetPasswordMutation() {
  return useMutation<void, MainBadRequestType, SendResetPasswordProps>({
    mutationKey: ['send-reset-password'],
    mutationFn: SendResetPasswordClient,
  });
}
