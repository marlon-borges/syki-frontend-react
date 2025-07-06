import { api } from '@/services/api';
import type { MainBadRequestType } from '@/types/MainBadRequestType';
import { useMutation } from '@tanstack/react-query';

async function ViewNotificationsClient() {
  try {
    const response = await api.put('/notifications/user');
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      const apiError: MainBadRequestType = err.response.data;
      throw apiError;
    }
    throw {
      code: 'unknown',
      message: 'Erro ao registrar as notificações do usuário como lidas.',
    } satisfies MainBadRequestType;
  }
}

export function useViewNotificationsMutation() {
  return useMutation<void, MainBadRequestType, {}>({
    mutationKey: ['view-notifications'],
    mutationFn: ViewNotificationsClient,
  });
}
