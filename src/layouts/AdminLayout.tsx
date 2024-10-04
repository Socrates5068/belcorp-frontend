import * as React from "react";
import { AppProvider, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ToastContainer } from "react-toastify";
import AppNavigation from "./admin/adminNavigation";
import AppTheme from "./admin/AdminTheme";
import "react-toastify/dist/ReactToastify.css";
import { PageContent } from "./admin/PageContent";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout() {
  const [pathname, setPathname] = React.useState("/usuarios");
  const navigate = React.useCallback(
    (path: string | URL) => setPathname(String(path)),
    []
  );

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate,
    };
  }, [pathname, navigate]);

  const navigation = AppNavigation();

  const { data, isError, isLoading } = useAuth();
  if (isLoading) return "Cargando...";
  if (isError) {
    console.log("🚀 ~ AdminLayout ~ isError:", isError)
    return <Navigate to="/auth/login" />;
  }

  if (data)
    return (
      <AppProvider navigation={navigation} router={router}>
        <AppTheme>
          <DashboardLayout>
            <PageContent pathname={pathname} />
          </DashboardLayout>
        </AppTheme>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </AppProvider>
    );
}
