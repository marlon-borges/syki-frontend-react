import institutionPlaceholder from '@/assets/institution-placeholder.jpg';
import { Show } from '@/components/Show';
import { twMerge } from 'tailwind-merge';

interface InstitutionOptionProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'opened'> {
  label: string;
  imgSrc?: string;
  opened?: boolean;
}

export const InstitutionOption = ({
  label,
  imgSrc,
  opened,
  ...divProps
}: InstitutionOptionProps) => {
  return (
    <div className="px-4">
      <div
        className={twMerge(
          'flex cursor-pointer items-center gap-2 rounded-lg bg-b-default hover:bg-b-subtle',
          opened ? 'px-2 py-1.5' : 'px-[0.4375rem] py-1.5',
        )}
        {...divProps}
      >
        <img
          src={institutionPlaceholder}
          alt="logo da instituição"
          loading="lazy"
          width={24}
          height={24}
          className="min-h-6 min-w-6 shrink-0 rounded-md"
        />
        <Show when={opened}>
          <span className="w-full truncate px-0.5 text-sm font-medium text-t-muted">{label}</span>
        </Show>
      </div>
    </div>
  );
};
