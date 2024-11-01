import React from "react";
import Box from "@mui/material/Box";
import CampaignsView from "@/views/admin/campaigns/CampaignsView";
import CampaigResouces from "@/views/admin/campaigns/CampaigResouces";
import ReportsView from "@/views/admin/reports/ReportsView";

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
          <CampaignsView navigate={handleDataFromChild} />
      ) : null}
      {/^\/campaigns\/([^/]+)$/.exec(pathname) ? (
          <CampaigResouces />
      ) : null}
      {pathname == "/documents" ? (
          <CampaigResouces />
      ) : null}
      {pathname == "/reports" ? (
          <ReportsView />
      ) : null}
    </Box>
  );
}
