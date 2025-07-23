import { Button } from '@/components/Button';
import { MyField } from '@/components/MyField';
import { ClassroomCard } from './components/ClassroomCard';
import NewClassroomDialog from './components/NewClassroomDialog';
import { IconChevronDown, IconFilter2, IconSearch } from '@tabler/icons-react';
import { useGetGetClassrooms, type GetClassroomsOut } from '@/features/Academic/GetClassrooms/GetClassroomsClient';

const ClassroomsPage = () => {
  const { data, isLoading, isError, error } = useGetGetClassrooms();

  if (isLoading) {
    return <div>Carregando salas...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar salas: {error?.message}</div>;
  }

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
          <NewClassroomDialog />
        </div>
      </nav>
      <div className="flex w-full flex-wrap gap-4">
        {data?.map((classroom: GetClassroomsOut) => (
          <ClassroomCard
            name={classroom.name}
          />
        ))}
      </div>
    </section>
  );
};

export default ClassroomsPage;
