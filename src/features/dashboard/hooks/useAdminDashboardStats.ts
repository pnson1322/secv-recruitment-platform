import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardStats } from "../api/dashboard.api";

export function useAdminDashboardStats() {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: getAdminDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
