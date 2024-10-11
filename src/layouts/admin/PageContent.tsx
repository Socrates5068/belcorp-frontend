import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserView from "@/views/admin/users/UserView";
import SectionView from "@/views/admin/sections/SectionView";
import DocumentView from "@/views/admin/documents/DocumentView";
import CampaignsView from "@/views/admin/campaigns/CampaignsView";

interface PageContentProps {
  pathname: string;
}

export function PageContent({ pathname }: Readonly<PageContentProps>) {
  return (
    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}>
      {pathname.startsWith("/usuarios") ? (
        <>
          <Typography variant="h5" gutterBottom>
            {pathname.replace("/", "").toUpperCase()}
          </Typography>
          <UserView />
        </>
      ) : null}
      {pathname.startsWith("/secciones") ? (
        <>
          <Typography variant="h5" gutterBottom>
            {pathname.replace("/", "").toUpperCase()}
          </Typography>
          <SectionView />
        </>
      ) : null}
      {pathname.startsWith("/documentos") ? (
        <>
          <Typography variant="h5" gutterBottom>
            {pathname.replace("/", "").toUpperCase()}
          </Typography>
          <DocumentView />
        </>
      ) : null}
      {pathname.startsWith("/campaigns") ? (
        <>
          <Typography variant="h5" gutterBottom>
            {pathname.replace("/", "").toUpperCase()}
          </Typography>
          <CampaignsView />
        </>
      ) : null}
    </Box>
  );
}
