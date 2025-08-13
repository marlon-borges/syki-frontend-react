import { lazy } from 'react';
const TeacherActivitiesDetailsPage = lazy(
  () =>
    import(
      '@/pages/protected/Teacher/Classes/ClassDetails/Activities/ActivitiesDetails/TeacherActivitiesDetailsPage'
    ),
);
const TeacherActivitiesPage = lazy(
  () => import('@/pages/protected/Teacher/Classes/ClassDetails/Activities/TeacherActivitiesPage'),
);
const TeacherAttendancePage = lazy(
  () => import('@/pages/protected/Teacher/Classes/ClassDetails/Attendance/TeacherAttendancePage'),
);
const TeacherStudentsPage = lazy(
  () => import('@/pages/protected/Teacher/Classes/ClassDetails/Students/TeacherStudentsPage'),
);
const TeacherClassDetailsPage = lazy(
  () => import('@/pages/protected/Teacher/Classes/ClassDetails/TeacherClassDetailsPage'),
);
const TeacherClassesPage = lazy(
  () => import('@/pages/protected/Teacher/Classes/TeacherClassesPage'),
);
const TeacherSchedulePage = lazy(
  () => import('@/pages/protected/Teacher/Schedule/TeacherSchedulePage'),
);
import TeacherHomePage from '@/pages/protected/Teacher/Home/TeacherHomePage';
import { Route } from 'react-router';

export default function TeacherRoutes() {
  return (
    <>
      <Route path="home" element={<TeacherHomePage />} />
      <Route path="schedule" element={<TeacherSchedulePage />} />
      <Route path="classes" element={<TeacherClassesPage />}>
        <Route path=":id" element={<TeacherClassDetailsPage />}>
          <Route path="activities" element={<TeacherActivitiesPage />}>
            <Route path=":id" element={<TeacherActivitiesDetailsPage />} />
          </Route>
          <Route path="attendance" element={<TeacherAttendancePage />} />
          <Route path="students" element={<TeacherStudentsPage />} />
        </Route>
      </Route>
    </>
  );
}
