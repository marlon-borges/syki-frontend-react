import { api } from '@/services/api';
import type { MainBadRequestType } from '@/types/MainBadRequestType';
import { useMutation } from '@tanstack/react-query';

export interface CreateAcademicPeriodProps {
  id: string;
  startAt: string;
  endAt: string;
}

export interface CreateAcademicPeriodResponse {
  id: string;
  startAt: string;
  endAt: string;
}

async function CreateAcademicPeriodClient({ ...body }: CreateAcademicPeriodProps) {
  try {
    const response = await api.post('/academic/academic-periods', body);
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      const apiError: MainBadRequestType = err.response.data;
      throw apiError;
    }
    throw {
      code: 'InvalidAcademicPeriod',
      message: 'Período acadêmico inválido.',
    } satisfies MainBadRequestType;
  }
}

export function useCreateAcademicPeriodMutation() {
  return useMutation<CreateAcademicPeriodResponse, Error, CreateAcademicPeriodProps>({
    mutationKey: ['create-academic-period'],
    mutationFn: CreateAcademicPeriodClient,
  });
}
