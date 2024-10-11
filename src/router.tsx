import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import NotFound from "./views/404/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import DashboardView from "./views/DashboardView";
import NoAccess from "./views/404/NoAccess";
import SelectView from "./views/SelectView";
import LiderLayout from "./layouts/LiderLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/selec" element={<SelectView />} index />
        <Route path="/" element={<DashboardView />} index />
        <Route element={<AdminLayout />}>
          <Route path="/gerente" element={<DashboardView />} index />
        </Route>
        
        <Route element={<LiderLayout />}>
          <Route path="/lider" element={<DashboardView />} index />
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
        <Route path="/no-access" element={<NoAccess />} />
      </Routes>
    </BrowserRouter>
  );
}
