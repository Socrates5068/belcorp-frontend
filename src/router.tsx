import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import NotFound from "./views/404/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import UserView from "./views/admin/users/UserView";
import DashboardView from "./views/DashboardView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardView />} index />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<UserView />} index />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
