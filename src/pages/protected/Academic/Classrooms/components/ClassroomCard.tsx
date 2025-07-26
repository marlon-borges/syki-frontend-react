import type React from 'react';

export interface ClassroomCardProps extends React.ComponentProps<'div'> {
  name: string;
}

export const ClassroomCard = ({
  name,
  ...divProps
}: ClassroomCardProps) => {

  return (
    <div
      className="relative max-w-64 min-w-56 flex-1 overflow-hidden rounded-xl border border-s-default bg-b-default transition-all duration-150 hover:shadow-bottom-300"
      {...divProps}
    >
      <div className="space-y-1.5 px-4 py-2">
        <p className="line-clamp-2 font-display text-lg font-semibold text-t-default">{name}</p>
        <span className="flex items-center gap-1.5 text-sm font-normal text-t-muted">
          {name}
        </span>
      </div>
    </div>
  );
};
