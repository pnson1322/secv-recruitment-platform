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

export function useCompanyStats(params: { companyId?: number; role?: string }, enabled = true) {
  const { companyId, role } = params;

  return useQuery({
    queryKey: ["company-stats", companyId, role],
    queryFn: () => {
      const idToUse = role === "COMPANY" ? (companyId ?? 0) : companyId;
      
      if (idToUse === undefined) {
        throw new Error("Company ID is required for non-company roles");
      }
      
      return getCompanyStats(idToUse);
    },
    enabled: enabled && (role === "COMPANY" || !!companyId),
  });
}
