import { api } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import type { MainBadRequestType } from '@/types/MainBadRequestType';

export interface PendingRegisterProps {
  email: string | null;
}

async function PendingRegisterClient({ email }: PendingRegisterProps) {
  try {
    const response = await api.post('/users', { email });
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      const apiError: MainBadRequestType = err.response.data;
      throw apiError;
    }
    throw {
      code: 'InvalidEmail',
      message: 'Email inválido.',
    } satisfies MainBadRequestType;
  }
}

export function usePendingRegisterMutation() {
  return useMutation<void, MainBadRequestType, PendingRegisterProps>({
    mutationKey: ['pending-register'],
    mutationFn: PendingRegisterClient,
  });
}
