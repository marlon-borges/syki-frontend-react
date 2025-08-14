import { FilterOptionToggle } from '@/components/filter/FilterOptionToggle';
import { MySelect } from '@/components/Select';
import { Select } from '@ark-ui/react';
import { useQueryState } from 'nuqs';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface SelectFilterOption {
  name: string;
  value: string;
  placeholder: string;
  onInput?: (value: string) => void;
  defaultValue?: string[];
  collection: Select.ListCollection;
}

export const SelectFilterOption = (props: SelectFilterOption) => {
  const { name, placeholder = 'Placeholder', value, onInput, defaultValue, collection } = props;

  const [queryValue, setQueryValue] = useQueryState(value.toLowerCase(), { defaultValue: '' });

  const [open, setOpen] = useState<boolean>(false);

  function handleOpen() {
    setOpen(!open);
  }

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
        activeCount={queryValue ? 1 : 0}
        onClear={() => {
          setQueryValue('');
          onInput?.('');
        }}
      />
      {open && (
        <div className="w-full p-2">
          <MySelect
            classNames={{ MainRoot: 'w-full' }}
            collection={collection}
            placeholder={placeholder}
            onValueChange={v => setQueryValue(v.value.toString())}
            value={[queryValue]}
            hasPortal={false}
            size="small"
            defaultValue={defaultValue}
          />
        </div>
      )}
    </div>
  );
};
