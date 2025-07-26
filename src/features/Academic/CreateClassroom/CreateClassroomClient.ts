import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export interface CreateClassroomProps {
   name: string | null;
   campusId: string | null;
   capacity: number | null;
}

async function CreateClassroomClient({ ...body }: CreateClassroomProps) {
   try {
      const response = await api.post("/academic/classrooms", body);
      return response.data;
   } catch (err: any) {
      throw new Error("Erro ao criar uma nova sala de aula: " + err.message);
   }
}

export function useCreateClassroomMutation() {
   return useMutation<void, Error, CreateClassroomProps>({
      mutationKey: ["create-classroom"],
      mutationFn: CreateClassroomClient,
   });
}
