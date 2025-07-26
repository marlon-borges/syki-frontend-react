import { Button } from '@/components/Button';
import { MyField } from '@/components/MyField';
import { ClassroomCard } from './components/ClassroomCard';
import CreateClassroomDialog from './components/CreateClassroomDialog';
import { IconChevronDown, IconFilter2, IconPlus, IconSearch } from '@tabler/icons-react';
import {
  useGetClassrooms,
  type GetClassroomsOut,
} from '@/features/Academic/GetClassrooms/GetClassroomsClient';

const ClassroomsPage = () => {
  const { data, isLoading, isError, error } = useGetClassrooms();

  // if (isLoading) {
  //   return <div>Carregando salas...</div>;
  // }

  // if (isError) {
  //   return <div>Erro ao carregar salas: {error?.message}</div>;
  // }

  return (
    <section className="p-6">
      <nav className="mb-4 flex items-center gap-4">
        <MyField.Root className="max-w-3xs">
          <MyField.Input icon={IconSearch} placeholder="Pesquisar..." />
        </MyField.Root>
        <Button variant="outline" color="neutral" rightIcon={IconChevronDown}>
          Ordenar por
        </Button>
        <Button variant="outline" color="neutral" leftIcon={IconFilter2}>
          Filtros
        </Button>

        <div className="flex w-full flex-1 justify-end">
          <CreateClassroomDialog>
            <Button leftIcon={IconPlus}>Nova Sala</Button>
          </CreateClassroomDialog>
        </div>
      </nav>
      <div className="flex w-full flex-wrap gap-4">
        {data?.map((classroom: GetClassroomsOut) => (
          <ClassroomCard name={classroom.name} />
        ))}
      </div>
    </section>
  );
};

export default ClassroomsPage;
