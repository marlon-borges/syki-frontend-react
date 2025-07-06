import { api } from '@/services/api';
import type { MainBadRequestType } from '@/types/MainBadRequestType';
import { useMutation } from '@tanstack/react-query';

async function SetupMfaClient() {
  try {
    const response = await api.post('/mfa/setup');
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      const apiError: MainBadRequestType = err.response.data;
      throw apiError;
    }
    throw {
      code: 'InvalidMfaToken',
      message: 'MFA token inválido.',
    } satisfies MainBadRequestType;
  }
}

export function useSetupMfaMutation() {
  return useMutation<void, MainBadRequestType, {}>({
    mutationKey: ['setup-mfa'],
    mutationFn: SetupMfaClient,
  });
}
