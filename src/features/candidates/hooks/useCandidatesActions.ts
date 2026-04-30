"use client";

import { useState } from "react";

import { toast } from "sonner";

import { handleDownloadCV } from "@/utils/downloadCV";
import { getApiErrorMessage } from "@/utils/api-error";

import { updateApplicationStatus, sendInvitation } from "../api/candidate.api";
import { Application, Invitation } from "../types/candidate.types";

const DEFAULT_INVITATION_MESSAGE =
  "Chúng tôi đã xem xét lại hồ sơ của bạn và rất mong muốn được trao đổi thêm về cơ hội nghề nghiệp.";

export function useCandidatesActions(refetch: () => void) {
  const [selectedProfile, setSelectedProfile] = useState<Application | Invitation | null>(null);
  const [invitationToResend, setInvitationToResend] = useState<Invitation | null>(null);
  const [resendMessage, setResendMessage] = useState(DEFAULT_INVITATION_MESSAGE);
  const [isResendingInvitation, setIsResendingInvitation] = useState(false);

  const resetResendInvitationState = () => {
    setInvitationToResend(null);
    setResendMessage(DEFAULT_INVITATION_MESSAGE);
  };

  const onDownloadCV = async (app: Application) => {
    if (!app.cvUrl) {
      toast.error("Ứng viên này chưa có CV");
      return;
    }

    toast.promise(
      handleDownloadCV(app.cvUrl, `CV_${app.student.fullName.replace(/\s+/g, "_")}.pdf`),
      {
        loading: "Đang chuẩn bị tệp tin...",
        success: "Tải xuống CV thành công!",
        error: (err) => getApiErrorMessage(err),
      }
    );
  };

  const handleUpdateStatus = async (
    applicationId: number,
    status: "passed" | "rejected" | "interviewing",
    successMessage: string
  ) => {
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

  const openResendInvitationModal = (invitation: Invitation) => {
    setInvitationToResend(invitation);
    setResendMessage(invitation.message?.trim() || DEFAULT_INVITATION_MESSAGE);
  };

  const closeResendInvitationModal = () => {
    if (isResendingInvitation) return;
    resetResendInvitationState();
  };

  const submitResendInvitation = async () => {
    if (!invitationToResend) return;

    const message = resendMessage.trim();

    if (!message) {
      toast.error("Vui lòng nhập lời nhắn gửi tới sinh viên");
      return;
    }

    const jobId = invitationToResend.job.jobId;

    if (!jobId) {
      toast.error("Không tìm thấy vị trí tuyển dụng để gửi lại lời mời");
      return;
    }

    setIsResendingInvitation(true);

    const promise = sendInvitation({
      studentId: invitationToResend.student.studentId,
      jobId,
      message,
    }).then((res) => {
      if (!res.success) {
        throw new Error(res.message || "Gửi lời mời thất bại");
      }

      return res;
    });

    toast.promise(promise, {
      loading: "Đang gửi lại lời mời...",
      success: () => `Đã gửi lại lời mời cho ${invitationToResend.student.fullName}`,
      error: (err) => getApiErrorMessage(err),
    });

    try {
      await promise;
      refetch();
      resetResendInvitationState();
    } catch (e) {
      console.error(e);
    } finally {
      setIsResendingInvitation(false);
    }
  };

  return {
    selectedProfile,
    setSelectedProfile,
    onDownloadCV,
    handleUpdateStatus,
    invitationToResend,
    resendMessage,
    setResendMessage,
    isResendingInvitation,
    openResendInvitationModal,
    closeResendInvitationModal,
    submitResendInvitation,
  };
}