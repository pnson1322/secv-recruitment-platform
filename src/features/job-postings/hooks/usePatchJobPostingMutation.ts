"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { patchJobPosting } from "../api/job-postings.api";
import { getApiErrorMessage } from "@/utils/api-error";
import type { PatchBody } from "../types/job-postings.types";

export function usePatchJobPostingMutation(jobId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      action,
    }: {
      payload: PatchBody;
      action: "approve" | "reject" | "restrict";
    }) => patchJobPosting(jobId, payload),
    onSuccess: async (_, variables) => {
      const message =
        variables.action === "approve"
          ? "Cập nhật phê duyệt thành công"
          : variables.action === "reject"
            ? "Đã từ chối tin tuyển dụng"
            : "Đã hạn chế tin tuyển dụng";

      toast.success(message);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["job-postings", "detail", jobId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["job-postings", "company", "cards"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["job-postings", "company", "stats"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["job-postings", "admin", "stats"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["job-postings", "admin", "list"],
        }),
      ]);
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
