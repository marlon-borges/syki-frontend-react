import { useGetCampi } from '@/features/Academic/GetCampi/GetCampiClient';
import { IconBuildingEstate, IconPlus, IconZoomQuestion } from '@tabler/icons-react';
import { EmptyState } from '@/components/EmptyState';
import { Show } from '@/components/Show';
import { createListCollection } from '@ark-ui/react';
import { STATES_OPTIONS } from '@/pages/protected/Academic/Campi/types/FullNameStates';
import { lazy, Suspense, useMemo, useRef, useState } from 'react';
import {
  ToolbarFilters,
  type ToolbarFiltersRef,
} from '@/pages/protected/Academic/Campi/components/ToolbarFilters';
import { useQueryState } from 'nuqs';

const CampusGridList = lazy(
  () => import('@/pages/protected/Academic/Campi/components/CampusGridList'),
);

const CampiPage = () => {
  const { data, isLoading } = useGetCampi();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const toolbarRef = useRef<ToolbarFiltersRef>(null);
  const [queryCity, setQueryCity] = useQueryState('city');
  const [queryState, setQueryState] = useQueryState('state');

  const filteredCampus = useMemo(() => {
    let filtered = data || [];
    if (searchTerm) {
      filtered = filtered.filter(campus => {
        return campus.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    if (queryState) {
      filtered = filtered.filter(campus => campus.state === queryState);
    }
    if (queryCity) {
      filtered = filtered.filter(campus => campus.city === queryCity);
    }
    return filtered;
  }, [queryCity, queryState, searchTerm, data]);

  // Limpar a busca enviando para o toolbarRef via imperativeHandle
  const handleClearSearch = () => {
    setSearchTerm('');
    toolbarRef.current?.clearSearch();
    setQueryCity(null);
    setQueryState(null);
  };

  const statesCollection = createListCollection({
    items: STATES_OPTIONS,
  });

  // if (isError) {
  //   return <div>Erro ao carregar os campi: {error?.message}</div>;
  // }

  return (
    <>
      <section className="container mx-auto p-6">
        <ToolbarFilters
          onSearchTerm={v => setSearchTerm(v)}
          ref={toolbarRef}
          data={data}
          onClearFilters={handleClearSearch}
          queryCity={queryCity}
          queryState={queryState}
        />
        <Show when={data?.length === 0 && !isLoading}>
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
        <Show when={filteredCampus?.length === 0 && !isLoading}>
          <div className="flex w-full items-center justify-center pt-32">
            <div className="animate-bt-in">
              <EmptyState
                icon={IconZoomQuestion}
                title="Nenhum campus encontrado"
                description="Altere o termo de busca e tente novamente."
                hasSecondaryAction={true}
                hasAction={false}
                secondaryActionText="Limpar filtros"
                onSecondaryAction={handleClearSearch}
              />
            </div>
          </div>
        </Show>
        <Suspense fallback={<div>Carregando campi...</div>}>
          <CampusGridList campuses={filteredCampus} statesCollection={statesCollection} />
        </Suspense>
      </section>
    </>
  );
};

export default CampiPage;
