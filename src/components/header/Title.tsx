import { Show } from '@/components/Show';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface TitlesByLocation {
  label: string;
  description: string;
  path: string;
}

export const Title = () => {
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const location = useLocation();

  const titlesByLocation: TitlesByLocation[] = [
    {
      label: 'Insights',
      description: 'insights',
      path: 'insights',
    },
    {
      label: 'Campi',
      description: 'Sua instituição pode ser formada por vários campus',
      path: 'campi',
    },
    {
      label: 'Cursos',
      description: 'cursos',
      path: 'courses',
    },
    {
      label: 'Disciplinas',
      description: 'disciplinas',
      path: 'disciplines',
    },
    {
      label: 'Grages Curriculares',
      description: 'grades-curriculares',
      path: 'course-curriculums',
    },
    {
      label: 'Ofertas de disciplinas',
      description: 'ofertas-de-disciplinas',
      path: 'course-offerings',
    },
    {
      label: 'Períodos letivos',
      description: 'periodos-letivos',
      path: 'academic-periods',
    },
    {
      label: 'Estudantes',
      description: 'estudantes',
      path: 'students',
    },
    {
      label: 'Professores',
      description: 'professores',
      path: 'teachers',
    },
    {
      label: 'Salas',
      description: 'Salas de aula',
      path: 'classrooms',
    },
    {
      label: 'Turmas',
      description: 'turmas',
      path: 'classes',
    },
    {
      label: 'Matrículas',
      description: 'matriculas',
      path: 'enrollment-periods',
    },
    {
      label: 'Configurações',
      description: 'configuracoes',
      path: 'settings',
    },
    {
      label: 'Meu perfil',
      description: 'meu-perfil',
      path: 'account',
    },
  ];

  const getTitleAndDescription = titlesByLocation.find(
    title => title.path === location.pathname.split('/')[2],
  );

  return (
    <div
      className="relative flex w-full flex-col"
      onPointerEnter={() => setShowDescription(true)}
      onPointerLeave={() => setShowDescription(false)}
    >
      <h1
        className={twMerge(
          'font-display text-xl font-semibold text-t-default transition-all duration-150',
          showDescription ? 'mb-5' : 'mb-0',
        )}
      >
        {getTitleAndDescription?.label ?? 'Sem título'}
      </h1>
      <Show when={showDescription}>
        <span className="absolute bottom-0 w-full animate-tb-in truncate text-sm font-medium text-t-muted">
          {getTitleAndDescription?.description ?? 'Sem descrição'}
        </span>
      </Show>
    </div>
  );
};
