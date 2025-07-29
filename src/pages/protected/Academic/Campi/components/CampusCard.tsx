import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { ChartStudentsCapacity } from '@/pages/protected/Academic/Campi/components/ChartStudentsCapacity';
import { IconDotsVertical, IconMapPin, IconPencil } from '@tabler/icons-react';
import type React from 'react';
import { useState } from 'react';
import placeholderCampusLogo from '@/assets/placeholder-campus-logo.svg';
import { twMerge } from 'tailwind-merge';
import { Dropdown } from '@/components/Dropdown';
import { EditCampusDialog } from '@/pages/protected/Academic/Campi/components/EditCampusDialog';
import { MyDialog } from '@/components/Dialog';
import { createListCollection } from '@ark-ui/react';
import { STATES_OPTIONS } from '@/pages/protected/Academic/Campi/types/FullNameStates';
import type { CampusOut } from '@/features/Academic/GetCampi/GetCampiClient';
import { DeleteCampusDialog } from '@/pages/protected/Academic/Campi/components/DeleteCampusDialog';

export interface CampusCardProps extends React.ComponentProps<'div'> {
  photoSrc?: string;
  name: string;
  state: [city: string, state: string];
  chartData: [students: number, capacity: number];
  fillRate: number;
  data: CampusOut;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const CampusCard = ({
  name,
  photoSrc = 'https://picsum.photos/200/200',
  state,
  chartData,
  fillRate,
  onEdit,
  onDelete,
  data,
  ...divProps
}: CampusCardProps) => {
  const [imgLoading, setImageLoading] = useState<boolean>(false);
  const [imgBackdropLoading, setImgBackdropLoading] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);

  const stateCollection = createListCollection({
    items: STATES_OPTIONS,
  });

  return (
    <div
      className="relative h-fit max-w-64 min-w-56 flex-1 overflow-hidden rounded-xl border border-s-default bg-b-default transition-all duration-150 hover:shadow-bottom-300"
      {...divProps}
    >
      <figure className="relative z-[0] max-h-20 min-h-20 overflow-hidden">
        <div className="absolute inset-0 bottom-0 z-[1] bg-linear-to-t from-b-default from-10% to-b-default/0 backdrop-blur-xs"></div>
        {!imgBackdropLoading && (
          <img
            src={placeholderCampusLogo}
            alt="institution-backdrop-logo"
            className="z-0 w-full opacity-15"
          />
        )}
        <img
          src={photoSrc}
          onLoad={() => setImgBackdropLoading(true)}
          alt="institution-backdrop-logo"
          className="z-0 w-full opacity-15"
        />
      </figure>
      {!imgLoading && (
        <img
          src={placeholderCampusLogo}
          alt="campus-placeholder-logo"
          className="absolute -mt-16 ml-4 size-16 rounded-lg border border-b-default shadow-bottom-200"
        />
      )}
      <img
        src={photoSrc}
        onLoad={() => setImageLoading(true)}
        loading="lazy"
        alt="campus-logo"
        className={twMerge(
          'absolute -mt-16 ml-4 size-16 rounded-lg border border-b-default shadow-bottom-200',
          !imgLoading ? 'opacity-0' : 'opacity-100',
        )}
      />
      <div className="space-y-1.5 px-4 pt-2 transition-all duration-150">
        <p
          className={twMerge(
            'overflow-hidden font-display text-lg font-semibold text-t-default transition-all duration-150',
            hovered ? 'line-clamp-2 max-h-16' : 'line-clamp-1 max-h-7',
          )}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {name}
        </p>
        <span className="flex items-center gap-1.5 text-sm font-normal text-t-muted">
          <IconMapPin stroke={2.25} size={18} className="shrink-0 text-t-subtle!" />{' '}
          <div className="flex min-w-0">
            <span className="truncate">{`${state[0]}`}</span>
            <span className="whitespace-nowrap">{`, ${state[1]}`}</span>
          </div>
        </span>
      </div>
      <ChartStudentsCapacity fillRate={fillRate} chartData={chartData} />
      <div className="flex items-center gap-2 px-2 pt-1 pb-2">
        <EditCampusDialog
          stateCollection={stateCollection}
          data={data}
          open={opened}
          onSuccess={() => setOpened(false)}
          onOpenChange={v => setOpened(v.open)}
        >
          <MyDialog.Context>
            {context => (
              <>
                <Button
                  variant="light"
                  color="neutral"
                  size="small"
                  classNames="flex-1"
                  onClick={() => context.setOpen(true)}
                >
                  Editar
                </Button>
                <Dropdown.Root>
                  <Dropdown.Trigger>
                    <IconButton
                      icon={IconDotsVertical}
                      variant="light"
                      color="neutral"
                      size="small"
                    />
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Item
                      value="edit-campus"
                      icon={IconPencil}
                      onClick={() => context.setOpen(true)}
                    >
                      Editar
                    </Dropdown.Item>
                    <DeleteCampusDialog name={name} />
                  </Dropdown.Content>
                </Dropdown.Root>
              </>
            )}
          </MyDialog.Context>
        </EditCampusDialog>
      </div>
    </div>
  );
};
