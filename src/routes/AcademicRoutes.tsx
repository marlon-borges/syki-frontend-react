import { lazy } from 'react';
import { Route } from 'react-router';
import CampiPage from '@/pages/protected/Academic/Campi/CampiPage';
const ClassDetailsPage = lazy(
  () => import('@/pages/protected/Academic/Classes/ClassDetails/ClassDetailsPage'),
);
const ClassesPage = lazy(() => import('@/pages/protected/Academic/Classes/ClassesPage'));
const ClassroomsPage = lazy(() => import('@/pages/protected/Academic/Classrooms/ClassroomsPage'));
const CourseCurriculumsPage = lazy(
  () => import('@/pages/protected/Academic/CourseCurriculums/CourseCurriculumsPage'),
);
const CourseOfferingsPage = lazy(
  () => import('@/pages/protected/Academic/CourseOfferings/CourseOfferingsPage'),
);
const CoursesPage = lazy(() => import('@/pages/protected/Academic/Courses/CoursesPage'));
const DisciplinesPage = lazy(
  () => import('@/pages/protected/Academic/Disciplines/DisciplinesPage'),
);
const EnrollmentPeriodsPage = lazy(
  () => import('@/pages/protected/Academic/EnrollmentPeriods/EnrollmentPeriodsPage'),
);
const InsightsPage = lazy(() => import('@/pages/protected/Academic/Insights/InsightsPage'));
const NotificationsPage = lazy(
  () => import('@/pages/protected/Academic/Notifications/NotificationsPage'),
);
const StudentsPage = lazy(() => import('@/pages/protected/Academic/Students/StudentsPage'));
const TeachersPage = lazy(() => import('@/pages/protected/Academic/Teachers/TeachersPage'));

const AcademicPeriodsPage = lazy(
  () => import('@/pages/protected/Academic/AcademicPeriods/AcademicPeriodsPage'),
);

export default function AcademicRoutes() {
  return (
    <>
      <Route path="insights" element={<InsightsPage />} />
      <Route path="campi" element={<CampiPage />} />
      <Route path="courses" element={<CoursesPage />} />
      <Route path="disciplines" element={<DisciplinesPage />} />
      <Route path="course-curriculums" element={<CourseCurriculumsPage />} />
      <Route path="course-offerings" element={<CourseOfferingsPage />} />
      <Route path="teachers" element={<TeachersPage />} />
      <Route path="classrooms" element={<ClassroomsPage />} />
      <Route path="classes" element={<ClassesPage />}>
        <Route path=":id" element={<ClassDetailsPage />} />
      </Route>
      <Route path="students" element={<StudentsPage />} />
      <Route path="academic-periods" element={<AcademicPeriodsPage />} />
      <Route path="enrollment-periods" element={<EnrollmentPeriodsPage />} />
      <Route path="notifications" element={<NotificationsPage />} />
    </>
  );
}
