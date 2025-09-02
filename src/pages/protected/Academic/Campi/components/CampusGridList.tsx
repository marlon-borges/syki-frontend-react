import type { CampusOut } from '@/features/Academic/GetCampi/GetCampiClient';
import CampusCard from '@/pages/protected/Academic/Campi/components/CampusCard';
import type { ListCollection } from '@ark-ui/react';

interface CampusGridListProps {
  campuses: CampusOut[];
  statesCollection: ListCollection;
}

const CampusGridList = ({ campuses, statesCollection }: CampusGridListProps) => {
  return (
    <div className="flex w-full flex-wrap gap-4">
      {campuses.map(campus => (
        <CampusCard
          key={campus.id}
          name={campus.name}
          state={[campus.city, campus.state]}
          fillRate={campus.fillRate}
          chartData={[campus.students, campus.capacity]}
          data={campus}
          statesCollection={statesCollection}
        />
      ))}
    </div>
  );
};

export default CampusGridList;
