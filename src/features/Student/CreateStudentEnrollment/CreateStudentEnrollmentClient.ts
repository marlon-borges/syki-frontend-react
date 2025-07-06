import { api } from '@/services/api';
import type { ClassScheduleDaysType } from '@/types/ClassScheduleDaysType';
import type { ClassTimesType } from '@/types/ClassTimesType';
import type { MainBadRequestType } from '@/types/MainBadRequestType';
import { useMutation } from '@tanstack/react-query';

export interface CreateStudentEnrollmentProps {
  classes: string[];
}

export interface CreateStudentEnrollmentResponse {
  id: string;
  discipline: string | null;
  period: number;
  credits: number;
  workload: number;
  teacher: string | null;
  schedules: SchedulesProps[];
  schedulesInline: string | null;
  students: string | null;
  isSelected: boolean;
}

interface SchedulesProps {
  day: ClassScheduleDaysType;
  startAt: ClassTimesType;
  endAt: ClassTimesType;
}

async function CreateStudentEnrollmentClient({ ...body }: CreateStudentEnrollmentProps) {
  try {
    const response = await api.post('/student/enrollments', body);
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

export function useCreateStudentEnrollmentMutation() {
  return useMutation<CreateStudentEnrollmentResponse, Error, CreateStudentEnrollmentProps>({
    mutationKey: ['create-student-enrollment'],
    mutationFn: CreateStudentEnrollmentClient,
  });
}
