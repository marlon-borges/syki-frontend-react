import { MultiSelectFilterOption } from '@/components/filter/MultiSelectFilterOption';
import { SelectFilterOption } from '@/components/filter/SelectFilterOption';
import { TextFilterOption } from '@/components/filter/TextFilterOption';
import { STATES_OPTIONS } from '@/pages/protected/Academic/Campi/types/FullNameStates';
import { createListCollection, Popover, Portal } from '@ark-ui/react';
import React from 'react';

interface FilterProps {
  children: React.ReactNode;
}

export const Filter = ({ children }: FilterProps) => {
  const collection = createListCollection({
    items: STATES_OPTIONS.map(state => ({
      label: state.label,
      value: state.value,
    })),
  });

  return (
    <Popover.Root closeOnInteractOutside={false} positioning={{ gutter: 4 }}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content className="flex max-w-3xs min-w-3xs animate-tb-in flex-col gap-1.5 rounded-lg border border-s-default bg-b-default p-1.5 shadow-bottom-300 data-[state=closed]:animate-tb-out">
            <SelectFilterOption
              name="Estado"
              placeholder="Selecione o estado..."
              value="estado"
              collection={collection}
            />
            <TextFilterOption name="Cidade" placeholder="Digite a cidade..." value="cidade" />
            <MultiSelectFilterOption
              name="Estados"
              value="estados"
              hasSearch
              collection={collection}
            />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
