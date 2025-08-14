import { useGetCampi, type CampusOut } from '@/features/Academic/GetCampi/GetCampiClient';
import { IconBuildingEstate, IconPlus, IconZoomQuestion } from '@tabler/icons-react';
import { EmptyState } from '@/components/EmptyState';
import { Show } from '@/components/Show';
import { createListCollection } from '@ark-ui/react';
import { STATES_OPTIONS } from '@/pages/protected/Academic/Campi/types/FullNameStates';
import React, { useRef, useState } from 'react';
import { CampusGridList } from '@/pages/protected/Academic/Campi/components/CampusGridList';
import {
  ToolbarFilters,
  type ToolbarFiltersRef,
} from '@/pages/protected/Academic/Campi/components/ToolbarFilters';

const CampiPage = () => {
  const { data, isLoading, isError, error } = useGetCampi();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCampus, setFilteredCampus] = useState<CampusOut[]>([]);
  const toolbarRef = useRef<ToolbarFiltersRef>(null);

  React.useEffect(() => {
    if (searchTerm) {
      setFilteredCampus(
        data?.filter(campus => campus.name.toLowerCase().includes(searchTerm.toLowerCase())) || [],
      );
    } else {
      setFilteredCampus(data || []);
    }
  }, [data, searchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    toolbarRef.current?.clearSearch();
  };

  const statesCollection = createListCollection({
    items: STATES_OPTIONS,
  });

  if (isLoading) {
    return <div>Carregando campi...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar os campi: {error?.message}</div>;
  }

  return (
    <>
      <section className="container mx-auto p-6">
        <ToolbarFilters onSearchTerm={v => setSearchTerm(v)} ref={toolbarRef} />
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
        <Show when={filteredCampus?.length === 0}>
          <div className="flex w-full items-center justify-center pt-32">
            <div className="animate-bt-in">
              <EmptyState
                icon={IconZoomQuestion}
                title="Nenhum campus encontrado"
                description="Altere o termo de busca e tente novamente."
                hasSecondaryAction={true}
                hasAction={false}
                secondaryActionText="Limpar busca"
                onSecondaryAction={handleClearSearch}
              />
            </div>
          </div>
        </Show>
        <CampusGridList campuses={filteredCampus} statesCollection={statesCollection} />
      </section>
    </>
  );
};

export default CampiPage;
