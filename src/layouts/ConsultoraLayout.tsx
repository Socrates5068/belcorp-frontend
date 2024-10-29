import * as React from "react";
import { AppProvider, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ToastContainer } from "react-toastify";
import AppTheme from "./lider/LiderTheme";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { isConsultora, useAuth } from "@/hooks/useAuth";
import {
  PageContainer,
  PageContainerToolbar,
  type Session,
} from "@toolpad/core";
import { useQueryClient } from "@tanstack/react-query";
import NavigateButton from "@/components/buttonBack";
import ConsultoraNavigation from "./consultora/ConsultoraNavigation";
import { PageContent } from "./consultora/PageContent";

function PageToolbar() {
  return <PageContainerToolbar></PageContainerToolbar>;
}

export default function ConsultoraLayout() {
  const [pathname, setPathname] = React.useState("/campaigns");
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

  const navigation = ConsultoraNavigation();

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
  }, [logout, navigate, user?.email, user?.name]);

  if (isLoading) return "Cargando...";

  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (user && !isConsultora(user.roles)) {
    return <Navigate to="/no-access" />;
  }

  if (user)
    return (
      <AppProvider
        branding={{
          /* logo: <Logo />, */
          title: "MODULO CONSULTORA",
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
            <PageContent pathname={pathname} navigate={router.navigate} />
          </DashboardLayout>
        </AppTheme>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </AppProvider>
    );
}
