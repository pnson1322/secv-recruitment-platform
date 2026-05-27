import { useQuery } from "@tanstack/react-query";
import { getInvitationStats } from "../api/application.api";

export function useInvitationStats() {
  return useQuery({
    queryKey: ["invitation-stats"],
    queryFn: getInvitationStats,
  });
}
