import App from '@/App';
import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/public/Cross/Login/LoginPage';
import LoginMfaPage from '@/pages/public/Cross/LoginMfa/LoginMfaPage';
import NotFoundPage from '@/pages/public/Cross/NotFound/NotFoundPage';
import RegisterPage from '@/pages/public/Cross/Register/RegisterPage';
import RegisterSetupPage from '@/pages/public/Cross/RegisterSetup/RegisterSetupPage';
import ResetPasswordPage from '@/pages/public/Cross/ResetPassword/ResetPasswordPage';
import SendResetPasswordPage from '@/pages/public/Cross/SendResetPassword/SendResetPasswordPage';
import UnauthorizedPage from '@/pages/public/Cross/Unauthorized/UnauthorizedPage';
import AcademicRoutes from '@/routes/AcademicRoutes';
import StudentRoutes from '@/routes/StudentRoutes';
import TeacherRoutes from '@/routes/TeacherRoutes';
import { Navigate, Route, Routes } from 'react-router';

const IndexRoutes = () => {
  return (
    <Routes>
      /* Public */
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<App />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="register-setup" element={<RegisterSetupPage />} />
        <Route path="send-reset-password" element={<SendResetPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="login-mfa" element={<LoginMfaPage />} />
      </Route>
      /* Private */
      <Route path="/academic" element={<AppLayout />}>
        <Route index element={<Navigate to="campi" replace />} />
        {AcademicRoutes()}
      </Route>
      <Route path="/student" element={<AppLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        {StudentRoutes()}
      </Route>
      <Route path="/teacher" element={<AppLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        {TeacherRoutes()}
      </Route>
    </Routes>
  );
};

export default IndexRoutes;
