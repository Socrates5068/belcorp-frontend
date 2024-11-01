import * as React from "react";
import { AppProvider, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ToastContainer } from "react-toastify";
import AppTheme from "./gerente/AdminTheme";
import "react-toastify/dist/ReactToastify.css";
import { PageContent } from "./gerente/PageContent";
import { Navigate } from "react-router-dom";
import { isGerente, useAuth } from "@/hooks/useAuth";
import AdminNavigation from "./gerente/GerenteNavigation";
import { PageContainer, PageContainerToolbar, type Session } from "@toolpad/core";
import { useQueryClient } from "@tanstack/react-query";
import NavigateButton from "@/components/buttonBack";

function PageToolbar() {
  return <PageContainerToolbar></PageContainerToolbar>;
}

export default function GerenteLayout() {
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

  const navigation = AdminNavigation();

  const { data: user, isError, isLoading } = useAuth();
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: user?.name,
      email: user?.email,
      image: "",
    },
  });
  const queryClient = useQueryClient();

  const logout = React.useCallback(() => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({ queryKey: ["role"] });
  }, [queryClient]);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: user?.name,
            email: user?.email,
            image: "",
          },
        });
      },
      signOut: () => {
        setSession(null);
        logout();
        navigate(`/login`);
      },
    };
  }, [logout, navigate]);

  if (isLoading) return "Cargando...";

  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (user && !isGerente(user.roles)) {
    return <Navigate to="/no-access" />;
  }

  if (user)
    return (
      <AppProvider
        branding={{
          title: "MODULO GERENTE",
        }}
        navigation={navigation}
        router={router}
        session={session}
        authentication={authentication}
      >
        <AppTheme>
          <DashboardLayout slots={{ toolbarActions: NavigateButton }}>
          <PageContainer
              slots={{
                toolbar: PageToolbar,
              }}
              pathname={pathname}
            />
            <PageContent pathname={pathname} />
          </DashboardLayout>
        </AppTheme>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </AppProvider>
    );
}
