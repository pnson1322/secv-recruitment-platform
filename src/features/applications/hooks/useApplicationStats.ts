import { useQuery } from "@tanstack/react-query";
import { getApplicationStats } from "../api/application.api";

export function useApplicationStats() {
  return useQuery({
    queryKey: ["application-stats"],
    queryFn: getApplicationStats,
  });
}
