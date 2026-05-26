import { useQuery } from "@tanstack/react-query";
import { getMonitorStats } from "../api/dashboard.api";

export function useMonitorStats() {
  return useQuery({
    queryKey: ["monitor-stats"],
    queryFn: getMonitorStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
