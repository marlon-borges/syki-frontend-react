import { lazy } from 'react';

const StudentClassAveragePage = lazy(
  () => import('@/pages/protected/Student/Classes/ClassDetails/Average/StudentClassAveragePage'),
);
const StudentClassFrequencyPage = lazy(
  () =>
    import('@/pages/protected/Student/Classes/ClassDetails/Frequency/StudentClassFrequencyPage'),
);
const StudentClassDetailsPage = lazy(
  () => import('@/pages/protected/Student/Classes/ClassDetails/StudentClassDetailsPage'),
);
const StudentClassesPage = lazy(
  () => import('@/pages/protected/Student/Classes/StudentClassesPage'),
);
const StudentDisciplinesPage = lazy(
  () => import('@/pages/protected/Student/Disciplines/StudentDisciplinesPage'),
);
const StudentFrequencyPage = lazy(
  () => import('@/pages/protected/Student/Frequency/StudentFrequencyPage'),
);
const StudentNotesPage = lazy(() => import('@/pages/protected/Student/Notes/StudentNotesPage'));
const StudentSchedulePage = lazy(
  () => import('@/pages/protected/Student/Schedule/StudentSchedulePage'),
);
import StudentHomePage from '@/pages/protected/Student/Home/StudentHomePage';
import { Route } from 'react-router';

export default function StudentRoutes() {
  return (
    <>
      <Route path="home" element={<StudentHomePage />} />
      <Route path="schedule" element={<StudentSchedulePage />} />
      <Route path="notes" element={<StudentNotesPage />} />
      <Route path="frequency" element={<StudentFrequencyPage />} />
      <Route path="disciplines" element={<StudentDisciplinesPage />} />
      <Route path="classes" element={<StudentClassesPage />}>
        <Route path=":id" element={<StudentClassDetailsPage />}>
          <Route path="average" element={<StudentClassAveragePage />} />
          <Route path="frequency" element={<StudentClassFrequencyPage />} />
        </Route>
      </Route>
    </>
  );
}
