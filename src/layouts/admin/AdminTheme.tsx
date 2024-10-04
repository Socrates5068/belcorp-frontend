import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function AppTheme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={demoTheme}>{children}</ThemeProvider>;
}
