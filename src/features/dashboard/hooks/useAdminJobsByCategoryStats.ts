import { useQuery } from "@tanstack/react-query";
import { getAdminJobsByCategoryStats } from "../api/dashboard.api";

export function useAdminJobsByCategoryStats() {
  return useQuery({
    queryKey: ["admin-jobs-by-category-stats"],
    queryFn: getAdminJobsByCategoryStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
