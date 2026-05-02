"use client";

import { useQuery } from "@tanstack/react-query";
import { getCompanyById, getMyCompany } from "../api/company.api";
import type { Role } from "@/features/auth/constants/roles";

type UseCompanyProfileParams = {
  viewerRole?: Role;
  companyId?: string;
};

export function useCompanyProfile({
  viewerRole,
  companyId,
}: UseCompanyProfileParams) {
  const isOwnerView = viewerRole === "COMPANY" && !companyId;
  const canFetch =
    !!viewerRole &&
    (isOwnerView || (!!companyId && companyId.trim().length > 0));

  return useQuery({
    queryKey: ["company-profile", viewerRole ?? "unknown", companyId || "me"],
    enabled: canFetch,
    queryFn: async () => {
      if (!viewerRole) {
        throw new Error("viewerRole is required");
      }

      if (isOwnerView && viewerRole === "COMPANY") {
        return getMyCompany();
      }

      if (!companyId) {
        throw new Error("companyId is required");
      }

      return getCompanyById(companyId);
    },
  });
}
