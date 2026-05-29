"use client";

import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getMyProfile } from "@/features/students/api/student.api";
import { getMyCompany } from "@/features/company-profile/api/company.api";
import { createConversation } from "@/features/chat/api/chat.api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";

export function useStartChat() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const createConversationMutation = useMutation({
    mutationFn: ({ studentId, companyId }: { studentId: number; companyId: number }) =>
      createConversation(studentId, companyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
  });

  const startChatWithCompany = async (
    companyId: number,
    name?: string,
    avatar?: string | null
  ) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để nhắn tin");
      router.push("/login");
      return;
    }

    if (user.role !== "STUDENT") {
      toast.error("Chỉ sinh viên mới có thể nhắn tin cho nhà tuyển dụng");
      return;
    }

    const toastId = toast.loading("Đang kết nối cuộc trò chuyện...");
    try {
      const profile = await queryClient.fetchQuery({
        queryKey: ["my-profile"],
        queryFn: getMyProfile,
        staleTime: 5 * 60 * 1000,
      });

      if (!profile || !profile.studentId) {
        throw new Error("Không tìm thấy thông tin sinh viên");
      }

      const response = await createConversationMutation.mutateAsync({
        studentId: profile.studentId,
        companyId,
      });

      const conversationId = response.data.conversationId;
      toast.success("Kết nối thành công", { id: toastId });

      const nameParam = name ? `&name=${encodeURIComponent(name)}` : "";
      const avatarParam = avatar ? `&avatar=${encodeURIComponent(avatar)}` : "";
      router.push(`/student/messages?id=${conversationId}${nameParam}${avatarParam}`);
    } catch (error: unknown) {
      console.error("Lỗi khi mở cuộc trò chuyện với công ty:", error);
      toast.error(
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Không thể bắt đầu trò chuyện",
        { id: toastId }
      );
    }
  };

  const startChatWithStudent = async (
    studentId: number,
    name?: string,
    avatar?: string | null
  ) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để nhắn tin");
      router.push("/login");
      return;
    }

    if (user.role !== "COMPANY") {
      toast.error("Chỉ nhà tuyển dụng mới có thể nhắn tin cho sinh viên");
      return;
    }

    const toastId = toast.loading("Đang kết nối cuộc trò chuyện...");
    try {
      const companyRes = await queryClient.fetchQuery({
        queryKey: ["my-company"],
        queryFn: getMyCompany,
        staleTime: 5 * 60 * 1000,
      });

      const company = companyRes.data;
      if (!company || !company.companyId) {
        throw new Error("Không tìm thấy thông tin công ty");
      }

      const response = await createConversationMutation.mutateAsync({
        studentId,
        companyId: company.companyId,
      });

      const conversationId = response.data.conversationId;
      toast.success("Kết nối thành công", { id: toastId });

      const nameParam = name ? `&name=${encodeURIComponent(name)}` : "";
      const avatarParam = avatar ? `&avatar=${encodeURIComponent(avatar)}` : "";
      router.push(`/recruiter/messages?id=${conversationId}${nameParam}${avatarParam}`);
    } catch (error: unknown) {
      console.error("Lỗi khi mở cuộc trò chuyện với sinh viên:", error);
      toast.error(
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Không thể bắt đầu trò chuyện",
        { id: toastId }
      );
    }
  };

  return {
    startChatWithCompany,
    startChatWithStudent,
    isCreating: createConversationMutation.isPending,
  };
}
