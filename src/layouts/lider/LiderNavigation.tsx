import { Navigation } from "@toolpad/core/AppProvider";
import CampaignIcon from '@mui/icons-material/Campaign';

const NAVIGATION: Navigation = [
  {
    segment: "campaigns",
    title: "Campañas",
    icon: <CampaignIcon />,
    pattern: 'campaigns{/:campaignId}*',
  },
  {
    segment: "users",
    title: "Consultoras",
    icon: <CampaignIcon />
  },
];

export default function LiderNavigation() {
  return NAVIGATION;
}
