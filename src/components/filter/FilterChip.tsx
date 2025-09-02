import { Dropdown } from '@/components/Dropdown';
import type { ListCollection } from '@ark-ui/react';
import { IconX } from '@tabler/icons-react';
import { useQueryState } from 'nuqs';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

interface FilterChipProps {
  label: string;
  value: string;
  data: ListCollection;
}

export const FilterChip = (props: FilterChipProps) => {
  const { label, value, data } = props;

  const [queryValue, setQueryValue] = useQueryState(value);

  const getTriggerLabelByQueryValue = useCallback(() => {
    const item = data.items.find(item => item.value === queryValue);
    return item ? item.label : '';
  }, [data.items, queryValue]);

  return (
    <div
      className={twMerge(
        'flex w-fit items-center gap-0.5 rounded-lg bg-b-accent py-1 pr-1 pl-2',
        queryValue ? 'inline-flex' : 'hidden',
      )}
    >
      <span className="text-14 px-0.5 font-normal text-t-accent">{label + ':'}</span>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <button className="text-14-medium focus-ring cursor-pointer rounded-sm p-0.5 text-t-accent hover:bg-b-accent-muted focus:outline-none focus-visible:bg-b-accent-muted">
            {getTriggerLabelByQueryValue()}
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content className="max-w-56">
          <div className="max-h-60 overflow-y-auto">
            {data.items.map(item => (
              <Dropdown.Item
                size="small"
                icon={item.icon}
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;
                  setQueryValue(item.value);
                }}
              >
                {item.label}
              </Dropdown.Item>
            ))}
          </div>
        </Dropdown.Content>
      </Dropdown.Root>
      <button
        className="focus-ring cursor-pointer rounded-sm p-[3px] text-t-accent hover:bg-b-accent-muted focus:outline-none focus-visible:bg-b-accent-muted"
        onClick={() => setQueryValue(null)}
      >
        <IconX size={18} stroke={2.25} />
      </button>
    </div>
  );
};
