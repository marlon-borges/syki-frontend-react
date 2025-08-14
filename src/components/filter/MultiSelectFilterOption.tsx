import { Checkbox } from '@/components/Checkbox';
import { FilterOptionToggle } from '@/components/filter/FilterOptionToggle';
import { MyField } from '@/components/MyField';
import type { ListCollection } from '@ark-ui/react';
import { IconSearch } from '@tabler/icons-react';
import { parseAsArrayOf, useQueryState } from 'nuqs';
import React, { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import z from 'zod';

interface OptionProps {
  name: string;
  value: string;
  defaultValue?: string[];
  hasSearch?: boolean;
  collection: ListCollection;
}

export const MultiSelectFilterOption = (props: OptionProps) => {
  const { name, hasSearch, value, defaultValue, collection } = props;

  const [queryValue, setQueryValue] = useQueryState(value, parseAsArrayOf(z.string(), ';'));

  const [open, setOpen] = useState<boolean>(false);

  const [collectionItems, setCollectionItems] = useState<ListCollection['items']>(collection.items);

  function handleOpen() {
    setOpen(!open);
  }

  React.useEffect(() => {
    if (defaultValue) {
      setQueryValue(defaultValue);
    }
  }, [defaultValue]);

  const handleSelectItem = useCallback((itemValue: string, checked: boolean) => {
    setQueryValue(prev => {
      if (prev) {
        return checked ? [...prev, itemValue] : prev.filter(i => i !== itemValue);
      }
      return [itemValue];
    });
  }, []);

  const handleSearch = useCallback(
    (searchTerm: string) => {
      setCollectionItems(() => {
        if (!searchTerm) return collection.items;
        return collection.items.filter(item =>
          item.label.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      });
    },
    [collection.items],
  );

  return (
    <div
      className={twMerge(
        'flex flex-col rounded-sm border border-b-default',
        open && 'border-s-default',
      )}
    >
      <FilterOptionToggle
        open={open}
        onClick={handleOpen}
        label={name}
        activeCount={queryValue ? queryValue.length : 0}
        onClear={() => {
          setQueryValue([]);
        }}
      />
      {open && (
        <div className="w-full p-2">
          {hasSearch && (
            <MyField.Root className="mb-2 w-full">
              <MyField.Input
                placeholder="Pesquisar..."
                icon={IconSearch}
                sizes="small"
                onInput={e => handleSearch(e.currentTarget.value)}
              />
            </MyField.Root>
          )}
          <div className="max-h-49 w-full space-y-0.5 overflow-y-auto" tabIndex={-1}>
            {collectionItems.map((item, i) => (
              <label
                key={item.value + i}
                tabIndex={0}
                className="flex w-full cursor-pointer items-center gap-1.5 rounded-sm bg-b-default p-1.5 hover:bg-b-subtle focus:outline-none focus-visible:bg-b-subtle"
              >
                <Checkbox
                  className="ml-1"
                  checked={queryValue?.includes(item.value)}
                  onCheckedChange={v => handleSelectItem(item.value, !!v.checked)}
                />
                <span className="px-0.5 text-sm text-t-muted select-none">{item.label}</span>
              </label>
            ))}
            {collectionItems.length === 0 && (
              <div className="rounded-sm bg-b-subtle px-2 py-1.5 text-sm text-t-subtle">
                Nenhum resultado encontrado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
