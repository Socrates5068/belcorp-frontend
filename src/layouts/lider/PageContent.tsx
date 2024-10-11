import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CampaignsView from "@/views/admin/campaigns/CampaignsView";

interface PageContentProps {
  pathname: string;
}

export function PageContent({ pathname }: Readonly<PageContentProps>) {
  return (
    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}>
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
