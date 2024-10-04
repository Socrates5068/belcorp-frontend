// AppNavigation.tsx
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Navigation } from "@toolpad/core/AppProvider";

const NAVIGATION: Navigation = [
  {
    segment: "usuarios",
    title: "Usuarios",
    icon: <DashboardIcon />,
  },
  {
    segment: "otros",
    title: "Otros",
    icon: <DashboardIcon />,
  },
];

export default function AppNavigation() {
  return NAVIGATION;
}
