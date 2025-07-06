import { api } from '@/services/api';
import type { ClassTimesType } from '@/types/ClassTimesType';
import type { MainBadRequestType } from '@/types/MainBadRequestType';
import { useMutation } from '@tanstack/react-query';

export interface CreateClassActivityProps {
  note: 'N1' | 'N2' | 'N3';
  title: string | null;
  description: string | null;
  type: 'Exam' | 'Project' | 'Work' | 'Prsentation';
  weight: number;
  dueDate: string;
  dueHour: ClassTimesType;
}

async function CreateClassActivityClient({
  id,
  ...body
}: { id: string } & CreateClassActivityProps) {
  try {
    const response = await api.post(`/teacher/classes/${id}/activities`, body);
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      const apiError: MainBadRequestType = err.response.data;
      throw apiError;
    }
    throw {
      code: 'ClassNotFound',
      message: 'Turma não encontrada.',
    } satisfies MainBadRequestType;
  }
}

export function useCreateClassActivityMutation(id: string) {
  return useMutation<void, Error, CreateClassActivityProps>({
    mutationKey: ['create-teacher-class-activity', id],
    mutationFn: body => CreateClassActivityClient({ id, ...body }),
  });
}
