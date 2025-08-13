import { useGetCampi, type CampusOut } from '@/features/Academic/GetCampi/GetCampiClient';
import { CampusCard } from '@/pages/protected/Academic/Campi/components/CampusCard';
import {
  IconBuildingEstate,
  IconChevronDown,
  IconFilter2,
  IconPlus,
  IconSearch,
} from '@tabler/icons-react';
import { EmptyState } from '@/components/EmptyState';
import { Show } from '@/components/Show';
import { Button } from '@/components/Button';
import { MyField } from '@/components/MyField';
import { CreateCampusDialog } from '@/pages/protected/Academic/Campi/components/CreateCampusDialog';
import { Filter } from '@/components/filter/Filter';

const CampiPage = () => {
  const { data, isLoading, isError, error } = useGetCampi();

  if (isLoading) {
    return <div>Carregando campi...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os campi: {error?.message}</div>;
  }

  return (
    <>
      <section className="container mx-auto p-6">
        <nav className="mb-4 flex items-center gap-4">
          <MyField.Root className="max-w-3xs">
            <MyField.Input icon={IconSearch} placeholder="Pesquisar..." />
          </MyField.Root>
          <Button variant="outline" color="neutral" rightIcon={IconChevronDown}>
            Ordenar por
          </Button>
          <Filter>
            <Button variant="outline" color="neutral" leftIcon={IconFilter2}>
              Filtros
            </Button>
          </Filter>
          <div className="flex w-full flex-1 justify-end">
            <CreateCampusDialog>
              <Button leftIcon={IconPlus}>Novo campus</Button>
            </CreateCampusDialog>
          </div>
        </nav>
        <Show when={data?.length === 0}>
          <div className="flex w-full items-center justify-center pt-32">
            <EmptyState
              icon={IconBuildingEstate}
              title="Novos campus aparecerão aqui"
              description="Crie o seu primeiro campus abaixo:"
              actionText="Novo campus"
              leftIconAction={IconPlus}
              hasAction={true}
              hasSecondaryAction={false}
            />
          </div>
        </Show>
        <div className="flex w-full flex-wrap gap-4">
          {data?.map((campus: CampusOut) => {
            return (
              <CampusCard
                key={campus.id}
                name={campus.name}
                state={[campus.city, campus.state]}
                fillRate={campus.fillRate}
                chartData={[campus.students, campus.capacity]}
                onDelete={() => {}}
                data={campus}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CampiPage;
