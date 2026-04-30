"use client";

import { useState } from "react";
import { toast } from "sonner";
import { handleDownloadCV } from "@/utils/downloadCV";
import { updateApplicationStatus, sendInvitation } from "../api/candidate.api";
import { Application, Invitation } from "../types/candidate.types";
import { getApiErrorMessage } from "@/utils/api-error";

export function useCandidatesActions(refetch: () => void) {
  const [selectedProfile, setSelectedProfile] = useState<Application | Invitation | null>(null);

  const onDownloadCV = async (app: Application) => {
    if (!app.cvUrl) {
      toast.error("Ứng viên này chưa có CV");
      return;
    }
    
    toast.promise(handleDownloadCV(app.cvUrl, `CV_${app.student.fullName.replace(/\s+/g, "_")}.pdf`), {
      loading: "Đang chuẩn bị tệp tin...",
      success: "Tải xuống CV thành công!",
      error: (err) => getApiErrorMessage(err),
    });
  };

  const handleUpdateStatus = async (applicationId: number, status: "passed" | "rejected" | "interviewing", successMessage: string) => {
    const promise = updateApplicationStatus(applicationId, status);

    toast.promise(promise, {
      loading: "Đang cập nhật trạng thái...",
      success: (res: any) => {
        if (res.success) {
          refetch();
          return successMessage;
        }
        throw new Error(res.message || "Cập nhật thất bại");
      },
      error: (err) => getApiErrorMessage(err),
    });

    try {
      await promise;
    } catch (e) {
      console.error(e);
    }
  };

  const onResendInvitation = async (invitation: Invitation) => {
    const promise = sendInvitation({
      studentId: invitation.student.studentId,
      jobId: (invitation.job as any).jobId || 0, 
      message: "Chúng tôi đã xem xét lại hồ sơ của bạn và rất mong muốn được trao đổi thêm về cơ hội nghề nghiệp.",
    });

    toast.promise(promise, {
      loading: "Đang gửi lại lời mời...",
      success: (res: any) => {
        if (res.success) {
          refetch();
          return `Đã gửi lại lời mời cho ${invitation.student.fullName}`;
        }
        throw new Error(res.message || "Gửi lời mời thất bại");
      },
      error: (err) => getApiErrorMessage(err),
    });

    try {
      await promise;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    selectedProfile,
    setSelectedProfile,
    onDownloadCV,
    handleUpdateStatus,
    onResendInvitation,
  };
}
