import * as React from "react";
import { AppProvider, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ToastContainer } from "react-toastify";
import AppTheme from "./lider/LiderTheme";
import "react-toastify/dist/ReactToastify.css";
import { PageContent } from "./lider/PageContent";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { userRoles } from "../types";
import {
  PageContainer,
  PageContainerToolbar,
  type Session,
} from "@toolpad/core";
import { useQueryClient } from "@tanstack/react-query";
import LiderNavigation from "./lider/LiderNavigation";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

function PageToolbar() {
  return (
    <PageContainerToolbar>
    </PageContainerToolbar>
  );
}

export default function LiderLayout() {
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

  const navigation = LiderNavigation();

  const { data, isError, isLoading } = useAuth();
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });
  const queryClient = useQueryClient();
  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({ queryKey: ["role"] });
  };
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
        logout();
      },
    };
  }, []);

  if (isLoading) return "Cargando...";

  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (data && !data.roles.includes(userRoles.administrador)) {
    return <Navigate to="/no-access" />;
  }

  if (data)
    return (
      <AppProvider
        branding={{
          logo: <WorkspacePremiumIcon />,
          title: "MODULO LIDER",
        }}
        navigation={navigation}
        router={router}
        session={session}
        authentication={authentication}
      >
        <AppTheme>
          <DashboardLayout>
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
