import { api } from '@/services/api';
import type { MainBadRequestType } from '@/types/MainBadRequestType';
import { useMutation } from '@tanstack/react-query';

export interface AddStudentClassActivityNoteProps {
  studentId: string;
  value: number;
}

async function AddStudentClassActivityNoteClient({
  id,
  ...body
}: { id: string } & AddStudentClassActivityNoteProps) {
  try {
    const response = await api.post(`/teacher/class-activities/${id}/activities`, body);
    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      const apiError: MainBadRequestType = err.response.data;
      throw apiError;
    }
    throw {
      code: 'ClassActivityNotFound',
      message: 'Atividade não encontrada.',
    } satisfies MainBadRequestType;
  }
}

export function useAddStudentClassActivityNoteMutation(id: string) {
  return useMutation<void, Error, AddStudentClassActivityNoteProps>({
    mutationKey: ['add-teacher-student-class-activity-note', id],
    mutationFn: body => AddStudentClassActivityNoteClient({ id, ...body }),
  });
}
