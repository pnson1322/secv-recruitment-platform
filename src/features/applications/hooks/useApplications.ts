import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../api/application.api";
import type { ApplicationParams } from "../types/application.types";

export function useApplications(params: ApplicationParams) {
  return useQuery({
    queryKey: ["applications", params],
    queryFn: () => getApplications(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
