import { useQuery } from "@tanstack/react-query";
import { getInvitations } from "../api/application.api";
import type { InvitationParams } from "../types/application.types";

export function useInvitations(params: InvitationParams) {
  return useQuery({
    queryKey: ["invitations", params],
    queryFn: () => getInvitations(params),
  });
}
