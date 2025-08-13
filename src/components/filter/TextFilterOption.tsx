import { FilterOptionToggle } from '@/components/filter/FilterOptionToggle';
import { MyField } from '@/components/MyField';
import { useQueryState } from 'nuqs';
import { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface OptionProps {
  name: string;
  value: string;
  placeholder: string;
  onInput?: (value: string) => void;
  defaultValue?: string;
}

export const TextFilterOption = (props: OptionProps) => {
  const { name, placeholder = 'Placeholder', value, onInput, defaultValue } = props;

  const [queryValue, setQueryValue] = useQueryState(value.toLowerCase(), { defaultValue: '' });

  const [open, setOpen] = useState<boolean>(false);

  function handleOpen() {
    setOpen(!open);
  }

  const handleInput = useCallback(
    (currentTarget: HTMLInputElement) => {
      setQueryValue(currentTarget.value);
      onInput?.(currentTarget.value);
    },
    [onInput],
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
        activeCount={queryValue ? 1 : 0}
        onClear={() => {
          setQueryValue('');
          onInput?.('');
        }}
      />
      {open && (
        <div className="w-full p-2">
          <MyField.Root className="w-full">
            <MyField.Input
              placeholder={placeholder}
              sizes="small"
              defaultValue={defaultValue}
              value={queryValue}
              onInput={v => handleInput(v.currentTarget)}
            />
          </MyField.Root>
        </div>
      )}
    </div>
  );
};
