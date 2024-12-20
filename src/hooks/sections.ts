import { useQuery } from "@tanstack/react-query";
import { getSections } from "@/api/SectionAPI";

export const useSections = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sections"],
    queryFn: () => getSections(),
    retry: false,
  });

  return { data, isError, isLoading };
};
