import { useMutation, useQueryClient } from "@tanstack/react-query";
import { respondToInvitation } from "../api/application.api";
import { toast } from "sonner";
import type { RespondInvitationBody } from "../types/application.types";
import { getApiErrorMessage } from "@/utils/api-error";

export function useRespondInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ invitationId, body }: { invitationId: number; body: RespondInvitationBody }) =>
      respondToInvitation(invitationId, body),
    onSuccess: (response, variables) => {
      toast.success(variables.body.action === "accept" ? "Đã chấp nhận lời mời!" : "Đã từ chối lời mời.");
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
      queryClient.invalidateQueries({ queryKey: ["invitationStats"] });
      
      if (variables.body.action === "accept") {
        queryClient.invalidateQueries({ queryKey: ["applications"] });
        queryClient.invalidateQueries({ queryKey: ["applicationStats"] });
      }
    },
    onError: (error: any) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
