import { getCampaigns } from "@/api/CampaignAPI";
import { useQuery } from "@tanstack/react-query";

export const useCampaigns = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getCampaigns(),
    retry: false,
  });

  return { data, isError, isLoading };
};
