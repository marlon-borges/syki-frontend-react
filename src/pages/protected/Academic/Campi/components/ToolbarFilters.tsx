import { Button } from '@/components/Button';
import { MyField } from '@/components/MyField';
import { CreateCampusDialog } from '@/pages/protected/Academic/Campi/components/CreateCampusDialog';
import { IconFilter2, IconPlus, IconSearch } from '@tabler/icons-react';
import { useDebounce } from '@uidotdev/usehooks';
import React, { useImperativeHandle, useState } from 'react';

export interface ToolbarFiltersRef {
  clearSearch: () => void;
}

interface ToolbarFiltersProps {
  onSearchTerm: (term: string) => void;
  ref?: React.Ref<ToolbarFiltersRef>;
}

export const ToolbarFilters = ({ ref, onSearchTerm }: ToolbarFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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

  return (
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
      <Button variant="outline" color="neutral" leftIcon={IconFilter2}>
        Filtros
      </Button>
      <div className="flex w-full flex-1 justify-end">
        <CreateCampusDialog>
          <Button leftIcon={IconPlus}>Novo campus</Button>
        </CreateCampusDialog>
      </div>
    </nav>
  );
};
