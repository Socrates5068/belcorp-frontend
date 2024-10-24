import { Navigation } from "@toolpad/core/AppProvider";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const NAVIGATION: Navigation = [
  {
    segment: "usuarios",
    title: "Usuarios",
    icon: <PeopleAltIcon />,
  },
];

export default function AdminNavigation() {
  return NAVIGATION;
}
