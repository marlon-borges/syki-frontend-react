import { api } from '@/services/api';
import type { StatesType } from '@/types/StatesType';
import { useMutation } from '@tanstack/react-query';

export interface CreateCampusProps {
  name: string | null;
  state: StatesType;
  city: string | null;
  capacity: number | null;
}

async function CreateCampusClient({ ...body }: CreateCampusProps) {
  try {
    const response = await api.post('/academic/campi', body);
    return response.data;
  } catch (err: any) {
    throw new Error('Erro ao criar um novo campus: ' + err.message);
  }
}

export function useCreateCampusMutation() {
  return useMutation<void, Error, CreateCampusProps>({
    mutationKey: ['create-campus'],
    mutationFn: CreateCampusClient,
  });
}
