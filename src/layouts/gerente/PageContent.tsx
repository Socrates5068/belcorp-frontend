import Box from "@mui/material/Box";
import UserView from "@/views/admin/users/UserView";
import SectionView from "@/views/admin/sections/SectionView";
import DocumentView from "@/views/admin/documents/DocumentView";
import CampaignsView from "@/views/admin/campaigns/CampaignsView";
import ConferencresView from "@/views/admin/conferences/ConferencresView";
import FragancesView from "@/views/admin/fragances/FragancesView";
import ReportsView from "@/views/admin/reports/ReportsView";

interface PageContentProps {
  pathname: string;
}

export function PageContent({ pathname }: Readonly<PageContentProps>) {
  return (
    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}>
      {pathname.startsWith("/usuarios") ? (
          <UserView />
      ) : null}
      {pathname.startsWith("/secciones") ? (
          <SectionView />
      ) : null}
      {pathname.startsWith("/documentos") ? (
          <DocumentView />
      ) : null}
      {pathname.startsWith("/campaigns") ? (
          <CampaignsView navigate={function (data: string): void {
          throw new Error("Function not implemented.");
        } } />
      ) : null}
      {pathname.startsWith("/conferences") ? (
          <ConferencresView />
      ) : null}
      {pathname.startsWith("/fragances") ? (
          <FragancesView />
      ) : null}
      {pathname == "/reports" ? (
          <ReportsView />
      ) : null}
    </Box>
  );
}
