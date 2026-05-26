import { useQuery } from "@tanstack/react-query";
import { getCompanyDashboardStats } from "../api/dashboard.api";

export function useCompanyDashboardStats() {
  return useQuery({
    queryKey: ["company-dashboard-stats"],
    queryFn: getCompanyDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
