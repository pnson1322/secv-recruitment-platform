import { useQuery } from "@tanstack/react-query";
import { getAdminApplicationsPerMonthStats } from "../api/dashboard.api";

export function useAdminApplicationsPerMonthStats() {
  return useQuery({
    queryKey: ["admin-applications-per-month-stats"],
    queryFn: getAdminApplicationsPerMonthStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
