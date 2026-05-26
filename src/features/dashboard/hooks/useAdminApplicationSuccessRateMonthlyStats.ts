import { useQuery } from "@tanstack/react-query";
import { getAdminApplicationSuccessRateMonthlyStats } from "../api/dashboard.api";

export function useAdminApplicationSuccessRateMonthlyStats() {
  return useQuery({
    queryKey: ["admin-application-success-rate-monthly-stats"],
    queryFn: getAdminApplicationSuccessRateMonthlyStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
