  import { useMutation } from "@tanstack/react-query";
import { createEvaluation } from "../api/student.api";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/utils/api-error";
import type { EvaluationBody } from "../types/student.types";

export function useCreateEvaluation() {
  return useMutation({
    mutationFn: (body: EvaluationBody) => createEvaluation(body),
    onSuccess: () => {
      toast.success("Đăng đánh giá thành công!");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
