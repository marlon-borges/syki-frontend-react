import { Button } from '@/components/Button';
import { Filter, type FilterItem } from '@/components/filter/Filter';
import { FilterChip } from '@/components/filter/FilterChip';
import { FilterChipContainer } from '@/components/filter/FilterChipContainer';
import { MyField } from '@/components/MyField';
import type { CampusOut } from '@/features/Academic/GetCampi/GetCampiClient';
import { CreateCampusDialog } from '@/pages/protected/Academic/Campi/components/CreateCampusDialog';
import { STATES_OPTIONS } from '@/pages/protected/Academic/Campi/types/FullNameStates';
import { createListCollection } from '@ark-ui/react';
import { IconFilter2, IconPlus, IconSearch } from '@tabler/icons-react';
import { useDebounce } from '@uidotdev/usehooks';
import React, { useEffect, useImperativeHandle, useState } from 'react';

export interface ToolbarFiltersRef {
  clearSearch: () => void;
}

interface ToolbarFiltersProps {
  onSearchTerm: (term: string) => void;
  ref?: React.Ref<ToolbarFiltersRef>;
  data: CampusOut[] | undefined;
  queryCity: string | null;
  queryState: string | null;
  onClearFilters: () => void;
}

export const ToolbarFilters = ({
  ref,
  onSearchTerm,
  data,
  queryCity,
  queryState,
  onClearFilters,
}: ToolbarFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const filterLength = () => {
    return (queryCity ? 1 : 0) + (queryState ? 1 : 0);
  };
  const hasManyFilters = filterLength() < 2 ? '1 Filtro' : `${filterLength()} Filtros`;

  useEffect(() => {
    if (queryCity || queryState) {
      setIsFiltering(true);
    } else {
      setIsFiltering(false);
    }
  }, [queryState, queryCity, isFiltering]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsLoading(true);
  };

  React.useEffect(() => {
    onSearchTerm(debouncedSearchTerm);
    setIsLoading(false);
  }, [debouncedSearchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  useImperativeHandle(ref, () => ({
    clearSearch,
  }));

  const uniqueCities = [...new Set(data?.map(campus => campus.city))];

  const findStatesByData = data?.map(campus => {
    const foundState = STATES_OPTIONS.find(state => state.value === campus.state);
    if (foundState) {
      return {
        ...campus,
        state: [foundState.label, foundState.value],
      };
    }
    return campus;
  });

  const dataStates = Array.from(
    new Map(findStatesByData?.map(campus => [campus.state[1], campus.state])).values(),
  );

  const filterLabels: FilterItem[] = [
    {
      label: 'Cidade',
      labelUniqueValue: 'city',
      data: {
        referenceValueKey: 'city',
        items: createListCollection({
          items: uniqueCities.map(city => ({
            label: city,
            value: city,
          })),
        }),
      },
    },
    {
      label: 'Estado',
      labelUniqueValue: 'state',
      data: {
        referenceValueKey: 'state',
        items: createListCollection({
          items: dataStates.map(state => ({
            label: state[0],
            value: state[1],
          })),
        }),
      },
    },
  ];

  return (
    <div>
      <nav className="mb-4 flex items-center gap-4">
        <MyField.Root className="max-w-3xs">
          <MyField.Input
            icon={IconSearch}
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
            isLoading={isLoading}
          />
        </MyField.Root>
        <Filter items={filterLabels}>
          <Button
            variant={isFiltering ? 'light' : 'outline'}
            color={isFiltering ? 'primary' : 'neutral'}
            leftIcon={IconFilter2}
          >
            {isFiltering ? hasManyFilters : 'Filtros'}
          </Button>
        </Filter>
        <div className="flex w-full flex-1 justify-end">
          <CreateCampusDialog>
            <Button leftIcon={IconPlus}>Novo campus</Button>
          </CreateCampusDialog>
        </div>
      </nav>
      {isFiltering && (
        <FilterChipContainer>
          {filterLabels.map(filter => (
            <FilterChip
              data={filter.data.items}
              label={filter.label}
              value={filter.labelUniqueValue}
              key={filter.labelUniqueValue}
            />
          ))}
          <Button variant="outline" color="neutral" onClick={() => onClearFilters()} size="small">
            Limpar filtros
          </Button>
        </FilterChipContainer>
      )}
    </div>
  );
};
