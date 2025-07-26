import { MySelect } from '@/components/Select';
import { createListCollection } from '@ark-ui/react';
import { useGetCampi } from '@/features/Academic/GetCampi/GetCampiClient';

type CampusSelectProps = {
  value: string[];
  onChange: React.FormEventHandler<HTMLDivElement> | undefined;
};

export const CampusSelect = ({ value, onChange }: CampusSelectProps) => {
  const { data } = useGetCampi();

  const collection = createListCollection({
    items: data?.map(x => ({
      label: `${x.name} | ${x.city} - ${x.state}`,
      value: x.id
    })) ?? []
  });

  return (
  <MySelect.MainRoot className="w-full">
    <MySelect.Root collection={collection} deselectable value={value} onChange={onChange}>
      <MySelect.Label>Campus</MySelect.Label>
      <MySelect.Trigger placeholder="Selecione" />
      <MySelect.Content>
        {collection.items.map((item, i) => (
          <MySelect.Item key={`state-select-item-${i}`} item={item}>
            {item.label}
          </MySelect.Item>
        ))}
      </MySelect.Content>
    </MySelect.Root>
  </MySelect.MainRoot>
  );
};
