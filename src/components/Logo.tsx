import Box from "@mui/material/Box";

interface LogoProps {
  width?: number | string;
}

export default function Logo({ width = 100 }: Readonly<LogoProps>) {
  return (
    <Box
      component="img"
      src="/R.png"
      alt="Logo"
      sx={{ width: width }}
    />
  );
}
