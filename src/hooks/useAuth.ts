import { useQuery } from "@tanstack/react-query";
import { getUserRole } from "@/api/AuthAPI";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["role"],
    queryFn: getUserRole,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading };
};
