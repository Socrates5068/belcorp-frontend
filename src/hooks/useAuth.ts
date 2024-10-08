import { useQuery } from "@tanstack/react-query";
import { getRoles } from "@/api/AuthAPI";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getRoles,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { data, isError, isLoading };
};
