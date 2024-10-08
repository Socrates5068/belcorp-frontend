import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Navigation } from "@toolpad/core/AppProvider";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const NAVIGATION: Navigation = [
  {
    segment: "usuarios",
    title: "Usuarios",
    icon: <PeopleAltIcon />,
  },
  {
    segment: "secciones",
    title: "Secciones",
    icon: <FormatListBulletedIcon />,
  },
];

export default function AdminNavigation() {
  return NAVIGATION;
}
