import Box from "@mui/material/Box";
import UserView from "@/views/admin/users/UserView";
import ReportsView from "@/views/admin/reports/ReportsView";

interface PageContentProps {
  pathname: string;
}

export function PageContent({ pathname }: Readonly<PageContentProps>) {
  return (
    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}>
      {pathname.startsWith("/usuarios") ? <UserView /> : null}
      {pathname.startsWith("/reports") ? <ReportsView /> : null}
    </Box>
  );
}
