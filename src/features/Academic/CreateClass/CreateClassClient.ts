import { api } from '@/services/api';
import type { ClassScheduleDaysType } from '@/types/ClassScheduleDaysType';
import type { ClassStatusType } from '@/types/ClassStatusType';
import type { ClassTimesType } from '@/types/ClassTimesType';
import type { MainBadRequestType } from '@/types/MainBadRequestType';
import { useMutation } from '@tanstack/react-query';

export interface CreateClassProps {
  disciplineId: string;
  teacherId: string;
  period: string | null;
  vacancies: number;
  schedules: ScheduleProps[];
}

interface ScheduleProps {
  day: ClassScheduleDaysType;
  start: ClassTimesType;
  end: ClassTimesType;
}

export interface CreateClassResponse {
  id: string;
  discipline: string | null;
  teacher: string | null;
  period: string | null;
  vacancies: number;
  frequency: number;
  status: ClassStatusType;
  schedules: ScheduleProps[];
  lessons: LessonProps[];
  fillRatio: string | null;
  isSelected: boolean;
}

interface LessonProps {
  id: string;
  number: number;
  date: string;
  schedule: string | null;
  status: 'Pending' | 'Finalized';
  frequency: number;
}

async function CreateClassClient({ ...body }: CreateClassProps) {
  try {
    const response = await api.post('/academic/classes', body);
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      const apiError: MainBadRequestType = err.response.data;
      throw apiError;
    }
    throw {
      code: 'DisciplineNotFound',
      message: 'Disciplina não encontrada.',
    } satisfies MainBadRequestType;
  }
}

export function useCreateClassMutation() {
  return useMutation<CreateClassResponse, Error, CreateClassProps>({
    mutationKey: ['create-class'],
    mutationFn: CreateClassClient,
  });
}
