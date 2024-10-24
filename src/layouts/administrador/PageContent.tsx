import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserView from "@/views/admin/users/UserView";

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
    </Box>
  );
}
