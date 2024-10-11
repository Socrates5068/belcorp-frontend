import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Navigation } from "@toolpad/core/AppProvider";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DescriptionIcon from '@mui/icons-material/Description';

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
  {
    segment: "documentos",
    title: "Documentos",
    icon: <DescriptionIcon />,
  },
  {
    segment: "campaigns",
    title: "Campañas",
    icon: <DescriptionIcon />,
  },
];

export default function AdminNavigation() {
  return NAVIGATION;
}
