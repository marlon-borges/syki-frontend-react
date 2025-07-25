import { Button } from '@/components/Button';
import { MyField } from '@/components/MyField';
import { useGetCampi, type CampusOut } from '@/features/Academic/GetCampi/GetCampiClient';
import { CampusCard } from '@/pages/protected/Academic/Campi/components/CampusCard';
import { CreateCampusDialog } from '@/pages/protected/Academic/Campi/components/CreateCampusDialog';
import { IconChevronDown, IconFilter2, IconPlus, IconSearch } from '@tabler/icons-react';

const CampiPage = () => {
  const { data, isLoading, isError, error } = useGetCampi();

  if (isLoading) {
    return <div>Carregando campi...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os campi: {error?.message}</div>;
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
          <CreateCampusDialog>
            <Button leftIcon={IconPlus}>Novo campus</Button>
          </CreateCampusDialog>
        </div>
      </nav>
      <div className="flex w-full flex-wrap gap-4">
        {data?.map((campus: CampusOut, i) => (
          <CampusCard
            key={`campus-card-${i}`}
            name={campus.name}
            state={[campus.city, campus.state]}
            fillRate={campus.fillRate}
            chartData={[campus.students, campus.capacity]}
          />
        ))}
      </div>
    </section>
  );
};

export default CampiPage;
