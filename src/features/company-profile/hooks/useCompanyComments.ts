import { useQuery } from "@tanstack/react-query";
import { getCompanyComments, getCompanyCommentsAdmin, getCompanyStats } from "../api/company.api";

type CommentParams = {
  page?: number;
  limit?: number;
  companyId?: number;
  role?: string;
};

export function useCompanyComments(params: CommentParams = {}, enabled = true) {
  const { page, limit, companyId, role } = params;

  return useQuery({
    queryKey: ["company-comments", params],
    queryFn: () => {
      if (role === "ADMIN" && companyId) {
        return getCompanyCommentsAdmin(companyId, { page, limit });
      }
      return getCompanyComments({ page, limit });
    },
    enabled: enabled && (role === "COMPANY" || (role === "ADMIN" && !!companyId)),
  });
}

export function useCompanyStats(companyId?: number, enabled = true) {
  return useQuery({
    queryKey: ["company-stats", companyId],
    queryFn: () => {
      if (!companyId) throw new Error("Company ID is required");
      return getCompanyStats(companyId);
    },
    enabled: enabled && !!companyId,
  });
}
