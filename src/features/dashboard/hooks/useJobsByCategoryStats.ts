import { useQuery } from "@tanstack/react-query";
import { getJobsByCategoryStats } from "../api/dashboard.api";

export function useJobsByCategoryStats() {
  return useQuery({
    queryKey: ["jobs-by-category-stats"],
    queryFn: getJobsByCategoryStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
