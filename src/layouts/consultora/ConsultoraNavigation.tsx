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
    segment: "conferences",
    title: "Conferencias",
    icon: <CampaignIcon />,
  },
  {
    segment: "fragances",
    title: "Fragancias",
    icon: <CampaignIcon />,
  },
];

export default function ConsultoraNavigation() {
  return NAVIGATION;
}
