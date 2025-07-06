import { api } from '@/services/api';
import type { MainBadRequestType } from '@/types/MainBadRequestType';
import type { StatesType } from '@/types/StatesType';
import { useMutation } from '@tanstack/react-query';

export interface UpdateCampusProps {
  id: string;
  name: string | null;
  state: StatesType;
  city: string | null;
}

async function UpdateCampusClient({ ...body }: UpdateCampusProps) {
  try {
    const response = await api.put('/academic/campi', body);
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      const apiError: MainBadRequestType = err.response.data;
      throw apiError;
    }
    throw {
      code: 'CampusNotFound',
      message: 'Campus não encontrado.',
    } satisfies MainBadRequestType;
  }
}

export function useUpdateCampusMutation() {
  return useMutation<void, MainBadRequestType, UpdateCampusProps>({
    mutationKey: ['update-campus'],
    mutationFn: UpdateCampusClient,
  });
}
