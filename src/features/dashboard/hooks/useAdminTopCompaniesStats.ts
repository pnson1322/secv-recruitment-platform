import { useQuery } from "@tanstack/react-query";
import { getAdminTopCompaniesStats } from "../api/dashboard.api";

export function useAdminTopCompaniesStats() {
  return useQuery({
    queryKey: ["admin-top-companies-stats"],
    queryFn: getAdminTopCompaniesStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
