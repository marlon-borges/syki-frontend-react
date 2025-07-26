import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export type GetClassroomsOut = {
  id: string;
  name: string;
}

async function GetClassroomsClient() {
   try {
      const response = await api.get("/academic/classrooms");
      return response.data;
   } catch (err: any) {
      throw new Error("Erro ao buscar as salas de aula: " + err.message);
   }
}

export function useGetGetClassrooms() {
   return useQuery<GetClassroomsOut[], Error>({
      queryKey: ["get-classrooms"],
      queryFn: () => GetClassroomsClient(),
   });
}
