"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerRecruiterAccount } from "../api/auth.api";
import type {
  RecruiterRegisterPayload,
  RecruiterRegisterResponse,
} from "../types/auth.types";

type RegisterErrorResponse = {
  success?: boolean;
  message?: string;
};

export function useRecruiterRegister() {
  const router = useRouter();

  const mutation = useMutation<
    RecruiterRegisterResponse,
    AxiosError<RegisterErrorResponse>,
    RecruiterRegisterPayload
  >({
    mutationFn: registerRecruiterAccount,

    onSuccess: (response) => {
      toast.success(response.message || "Đăng ký thành công");
      router.push("/login");
    },

    onError: (error) => {
      const message =
        error.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại";

      toast.error(message);
    },
  });

  return {
    registerRecruiter: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
