import { IconButton } from '@/components/IconButton';
import { ChartStudentsCapacity } from '@/pages/protected/Academic/Campi/components/ChartStudentsCapacity';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react';
import type React from 'react';
import { memo, useState } from 'react';
import placeholderCampusLogo from '@/assets/placeholder-campus-logo.svg';
import { twMerge } from 'tailwind-merge';
import { Dropdown } from '@/components/Dropdown';
import { useDialog, type ListCollection } from '@ark-ui/react';
import type { CampusOut } from '@/features/Academic/GetCampi/GetCampiClient';
import { EditCampusDialog } from '@/pages/protected/Academic/Campi/components/EditCampusDialog';

export interface CampusCardProps extends React.ComponentProps<'div'> {
  photoSrc?: string;
  name: string;
  state: [city: string, state: string];
  chartData: [students: number, capacity: number];
  fillRate: number;
  data: CampusOut;
  statesCollection: ListCollection;
}

const CampusCard = ({
  name,
  photoSrc = 'https://picsum.photos/200/200',
  state,
  chartData,
  fillRate,
  data,
  statesCollection,
  ...divProps
}: CampusCardProps) => {
  const [imgLoading, setImageLoading] = useState<boolean>(false);
  const [imgBackdropLoading, setImgBackdropLoading] = useState<boolean>(false);

  const { open, setOpen } = useDialog();

  return (
    <div
      className="relative h-fit max-w-64 min-w-60 flex-1 overflow-hidden rounded-xl border border-s-default bg-b-default transition-all duration-150 hover:shadow-bottom-300"
      {...divProps}
    >
      <figure className="relative z-[0] max-h-18 min-h-18 overflow-hidden">
        <div className="absolute inset-0 bottom-0 z-[1] bg-linear-to-t from-b-default from-10% to-b-default/0 backdrop-blur-xs"></div>
        {!imgBackdropLoading && (
          <img
            src={placeholderCampusLogo}
            alt="institution-backdrop-logo"
            className="z-0 w-full opacity-8"
          />
        )}
        <img
          src={photoSrc}
          onLoad={() => setImgBackdropLoading(true)}
          alt="institution-backdrop-logo"
          className="z-0 w-full opacity-8"
        />
      </figure>
      {!imgLoading && (
        <img
          src={placeholderCampusLogo}
          alt="campus-placeholder-logo"
          className="absolute -mt-14 ml-4 size-14 rounded-lg border-2 border-b-default shadow-bottom-200"
        />
      )}
      <img
        src={photoSrc}
        onLoad={() => setImageLoading(true)}
        loading="lazy"
        alt="campus-logo"
        className={twMerge(
          'absolute -mt-14 ml-4 size-14 rounded-lg border-2 border-b-default shadow-bottom-200',
          !imgLoading ? 'opacity-0' : 'opacity-100',
        )}
      />
      <Dropdown.Root>
        <Dropdown.Trigger>
          <IconButton
            icon={IconDotsVertical}
            variant="outline"
            color="neutral"
            size="small"
            classNames="absolute top-4 right-4"
          />
        </Dropdown.Trigger>
        <Dropdown.Content>
          <EditCampusDialog
            data={data}
            stateCollection={statesCollection}
            open={open}
            onOpenChange={v => setOpen(v.open)}
            onSuccess={() => setOpen(false)}
          >
            <div>
              <Dropdown.Item value="edit-campus" icon={IconPencil}>
                Editar
              </Dropdown.Item>
            </div>
          </EditCampusDialog>
          <Dropdown.Item value="delete-campus" variant="error" icon={IconTrash}>
            Excluir
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
      <div className="space-y-1 px-4 pt-2 transition-all duration-150">
        <p className="line-clamp-1 overflow-hidden font-display text-lg font-semibold text-t-default transition-all duration-150">
          {name}
        </p>
        <span className="flex items-center gap-1.5 text-sm font-normal text-t-muted">
          <div className="flex min-w-0">
            <span className="truncate">{`${state[0]}`}</span>
            <span className="whitespace-nowrap">{`, ${state[1]}`}</span>
          </div>
        </span>
      </div>
      <ChartStudentsCapacity fillRate={fillRate} chartData={chartData} />
    </div>
  );
};

export default memo(CampusCard);
