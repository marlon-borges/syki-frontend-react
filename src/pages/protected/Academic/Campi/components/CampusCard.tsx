import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { ChartStudentsCapacity } from '@/pages/protected/Academic/Campi/components/ChartStudentsCapacity';
import { IconDotsVertical, IconMapPin, IconPencil, IconTrash } from '@tabler/icons-react';
import type React from 'react';
import { useState } from 'react';
import placeholderCampusLogo from '@/assets/placeholder-campus-logo.svg';
import { twMerge } from 'tailwind-merge';
import { Dropdown } from '@/components/Dropdown';

export interface CampusCardProps extends React.ComponentProps<'div'> {
  photoSrc?: string;
  name: string;
  state: [city: string, state: string];
  chartData: [students: number, capacity: number];
  fillRate: number;
}

export const CampusCard = ({
  name,
  photoSrc = 'https://picsum.photos/200/200',
  state,
  chartData,
  fillRate,
  ...divProps
}: CampusCardProps) => {
  const [imgLoading, setImageLoading] = useState<boolean>(false);
  const [imgBackdropLoading, setImgBackdropLoading] = useState<boolean>(false);

  return (
    <div
      className="relative max-w-64 min-w-56 flex-1 overflow-hidden rounded-xl border border-s-default bg-b-default transition-all duration-150 hover:shadow-bottom-300"
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
      <div className="space-y-1.5 px-4 pt-2">
        <p className="line-clamp-2 font-display text-lg font-semibold text-t-default">{name}</p>
        <span className="flex items-center gap-1.5 text-sm font-normal text-t-muted">
          <IconMapPin stroke={2.25} size={18} className="text-t-subtle!" />{' '}
          {`${state[0]}, ${state[1]}`}
        </span>
      </div>
      <ChartStudentsCapacity fillRate={fillRate} chartData={chartData} />
      <div className="flex items-center gap-2 px-2 pt-1 pb-2">
        <Button variant="light" color="neutral" size="small" classNames="flex-1">
          Editar
        </Button>
        <Dropdown.Root>
          <Dropdown.Trigger>
            <IconButton icon={IconDotsVertical} variant="light" color="neutral" size="small" />
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item value="edit-campus" icon={IconPencil}>
              Editar
            </Dropdown.Item>
            <Dropdown.Item value="delete-campus" icon={IconTrash} variant="error">
              Excluir
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
    </div>
  );
};
