import { useQuery } from "@tanstack/react-query";
import { getApplicationRateStats } from "../api/dashboard.api";

export function useApplicationRateStats() {
  return useQuery({
    queryKey: ["application-rate-stats"],
    queryFn: getApplicationRateStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
