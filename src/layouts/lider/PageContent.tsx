import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CampaignsView from "@/views/admin/campaigns/CampaignsView";
import CampaigResouces from "@/views/admin/campaigns/CampaigResouces";

interface PageContentProps {
  pathname: string;
  navigate: (path: string | URL) => void;
}

export function PageContent({
  pathname,
  navigate,
}: Readonly<PageContentProps>) {
  const [id, setId] = React.useState('');
  const handleDataFromChild = (data: string) => {
    setId(data);
    navigate(data);
  };
  return (
    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}>
      {pathname == "/campaigns" ? (
        <>
          <Typography variant="h5" gutterBottom>
          </Typography>
          <CampaignsView navigate={handleDataFromChild} />
        </>
      ) : null}
      {/^\/campaigns\/([^/]+)$/.exec(pathname) ? (
        <>
          <Typography variant="h5" gutterBottom>
            {pathname.replace("/", "").toUpperCase()}
          </Typography>
          <CampaigResouces />
        </>
      ) : null}
    </Box>
  );
}
