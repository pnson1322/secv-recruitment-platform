"use client";

import { useState } from "react";

import { toast } from "sonner";

import { handleDownloadCV } from "@/utils/downloadCV";
import { getApiErrorMessage } from "@/utils/api-error";

import { updateApplicationStatus, sendInvitation } from "../api/candidate.api";
import { Application, CandidateStudent, Invitation } from "../types/candidate.types";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { ROLES } from "@/features/auth/constants/roles";
import { useQuery } from "@tanstack/react-query";
import { getJobPostingsListByCompanyId } from "@/features/job-postings/api/job-postings.api";
import { JobPostingDataItem } from "@/features/job-postings/types/job-postings.types";
import { useMemo } from "react";
import { StudentCardItem } from "../types/student-card.types";

const DEFAULT_INVITATION_MESSAGE =
  "Chúng tôi đã xem xét lại hồ sơ của bạn và rất mong muốn được trao đổi thêm về cơ hội nghề nghiệp.";

export function useCandidatesActions(refetch: () => void) {
  const [selectedProfile, setSelectedProfile] = useState<Application | Invitation | null>(null);

  const [candidateToInvite, setCandidateToInvite] = useState<StudentCardItem | null>(null);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [isSubmittingInvite, setIsSubmittingInvite] = useState(false);

  const companyQuery = useCompanyProfile({ viewerRole: ROLES.RECRUITER });
  const companyId = companyQuery.data?.data?.companyId;

  const jobsQuery = useQuery({
    queryKey: ["candidate-search-jobs", companyId],
    enabled: typeof companyId === "number",
    staleTime: 1000 * 60,
    queryFn: async () => {
      if (typeof companyId !== "number") {
        throw new Error("companyId is required");
      }

      return getJobPostingsListByCompanyId({
        companyId,
        page: 1,
        limit: 100,
      });
    },
  });

  const approvedJobs = useMemo(() => {
    const jobs = jobsQuery.data?.data?.data ?? [];

    return jobs.filter(
      (job): job is JobPostingDataItem => job.status === "approved",
    );
  }, [jobsQuery.data]);

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

  const mapStudentToCardItem = (student: CandidateStudent): StudentCardItem => {
    return {
      studentId: student.studentId,
      fullName: student.fullName,
      avatarUrl: student.avatarUrl,
      currentYear: student.currentYear,
      gpa: student.gpa ?? null,
      isOpenToWork: !!student.isOpenToWork,
      skills: student.skills?.map((s) => s.skillName) || [],
    };
  };

  const openInviteModal = (student: StudentCardItem) => {
    setCandidateToInvite(student);
    const defaultJob = approvedJobs[0];
    if (defaultJob) {
      setSelectedJobId(String(defaultJob.jobId));
      setInviteMessage(
        `Chào ${student.fullName}, công ty bên mình thấy hồ sơ của bạn phù hợp với vị trí ${defaultJob.jobTitle}. Nếu bạn quan tâm, bên mình rất mong có cơ hội trao đổi thêm với bạn.`,
      );
    }
    setInviteError(null);
  };

  const openInviteModalFromProfile = (data: Application | Invitation) => {
    const student = mapStudentToCardItem(data.student);
    setCandidateToInvite(student);

    if ("job" in data && data.job) {
      setSelectedJobId(String(data.job.jobId));
      setInviteMessage(
        `Chào ${student.fullName}, công ty bên mình thấy hồ sơ của bạn phù hợp với vị trí ${data.job.jobTitle}. Nếu bạn quan tâm, bên mình rất mong có cơ hội trao đổi thêm với bạn.`,
      );
    } else {
      openInviteModal(student);
    }

    setInviteError(null);
  };

  const openResendInvitationModal = (invitation: Invitation) => {
    const student = mapStudentToCardItem(invitation.student);
    setCandidateToInvite(student);
    setSelectedJobId(String(invitation.job.jobId));
    setInviteMessage(invitation.message?.trim() || "");
    setInviteError(null);
  };

  const closeInviteModal = () => {
    if (isSubmittingInvite) return;
    setCandidateToInvite(null);
    setSelectedJobId("");
    setInviteMessage("");
    setInviteError(null);
  };

  const submitInvite = async () => {
    if (!candidateToInvite || !selectedJobId) return;

    const trimmedMessage = inviteMessage.trim();
    if (!trimmedMessage) {
      setInviteError("Vui lòng nhập lời nhắn");
      return;
    }

    setIsSubmittingInvite(true);
    setInviteError(null);

    const promise = sendInvitation({
      studentId: candidateToInvite.studentId,
      jobId: Number(selectedJobId),
      message: trimmedMessage,
    });

    toast.promise(promise, {
      loading: "Đang gửi lời mời...",
      success: "Đã gửi lời mời thành công",
      error: (err) => getApiErrorMessage(err),
    });

    try {
      await promise;
      refetch();
      closeInviteModal();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingInvite(false);
    }
  };

  return {
    selectedProfile,
    setSelectedProfile,
    onDownloadCV,
    handleUpdateStatus,
    candidateToInvite,
    selectedJobId,
    setSelectedJobId,
    inviteMessage,
    setInviteMessage,
    inviteError,
    isSubmittingInvite,
    approvedJobs,
    openInviteModal,
    openInviteModalFromProfile,
    openResendInvitationModal,
    closeInviteModal,
    submitInvite,
  };
}