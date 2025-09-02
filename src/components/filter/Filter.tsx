import { Dropdown } from '@/components/Dropdown';
import { MyField } from '@/components/MyField';
import { type ListCollection } from '@ark-ui/react';
import type { TablerIcon } from '@tabler/icons-react';
import { useQueryState } from 'nuqs';
import { useMemo, useState, type PropsWithChildren } from 'react';

export interface FilterItem {
  label: string;
  labelUniqueValue: string;
  icon?: TablerIcon;
  disabled?: boolean;
  data: {
    referenceValueKey: string; // Valor que referencia labelUniqueValue, usado para filtrar itens conforme o label selecionado.
    items: ListCollection;
  };
}

interface FilterProps extends PropsWithChildren {
  items: FilterItem[];
}

const EmptyState = () => (
  <Dropdown.CustomItem className="text-14 px-2 py-1.5 text-t-subtle">
    Nenhum resultado encontrado
  </Dropdown.CustomItem>
);

export const Filter = (props: FilterProps) => {
  const { items, children } = props;

  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [labelSearchTerm, setLabelSearchTerm] = useState<string>('');
  const [itemSearchTerm, setItemSearchTerm] = useState<string>('');

  const [queryState, setQueryState] = useQueryState(selectedLabel, { defaultValue: '' });

  const handleSelectLabel = (value: string) => {
    setQueryState(value);
  };

  const filteredLabelItems = useMemo(() => {
    return items.filter(item => item.label.toLowerCase().includes(labelSearchTerm.toLowerCase()));
  }, [items, labelSearchTerm]);

  return (
    <Dropdown.Root
      closeOnSelect={queryState.length > 0}
      onExitComplete={() => setSelectedLabel('')}
    >
      <Dropdown.Trigger>{children}</Dropdown.Trigger>
      <Dropdown.Content className="max-w-56">
        {selectedLabel === '' && (
          <>
            <Dropdown.CustomItem className="w-full px-0.5 pt-0.5 pb-2">
              <MyField.Root>
                <MyField.Input
                  sizes="small"
                  placeholder="Pesquisar..."
                  onChange={v => setLabelSearchTerm(v.currentTarget.value)}
                />
              </MyField.Root>
            </Dropdown.CustomItem>
            {filteredLabelItems.length === 0 && <EmptyState />}
            {filteredLabelItems.map(item => (
              <Dropdown.Item
                size="small"
                icon={item.icon}
                key={item.labelUniqueValue}
                value={item.labelUniqueValue}
                disabled={item.disabled}
                onClick={() => setSelectedLabel(item.labelUniqueValue)}
              >
                {item.label}
              </Dropdown.Item>
            ))}
          </>
        )}
        {items.map(item => {
          const filteredItems =
            item.data.referenceValueKey === selectedLabel
              ? item.data.items.items.filter(item =>
                  item.label.toLowerCase().includes(itemSearchTerm.toLowerCase()),
                )
              : [];

          {
            return item.data.referenceValueKey === selectedLabel ? (
              <>
                <Dropdown.CustomItem className="w-full px-0.5 pt-0.5 pb-2">
                  <MyField.Root>
                    <MyField.Input
                      sizes="small"
                      placeholder="Pesquisar..."
                      autoFocus
                      onChange={v => setItemSearchTerm(v.currentTarget.value)}
                    />
                  </MyField.Root>
                </Dropdown.CustomItem>
                <div className="max-h-60 overflow-y-auto">
                  {filteredItems.length === 0 && <EmptyState />}
                  {filteredItems.map(item => (
                    <Dropdown.Item
                      size="small"
                      icon={item.icon}
                      key={item.value}
                      value={item.value}
                      disabled={item.disabled}
                      onClick={() => {
                        if (item.disabled) return;
                        handleSelectLabel(item.value);
                      }}
                    >
                      {item.label}
                    </Dropdown.Item>
                  ))}
                </div>
              </>
            ) : null;
          }
        })}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
