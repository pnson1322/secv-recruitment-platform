"use client";

import { toast } from "sonner";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { Role } from "@/features/auth/constants/roles";
import type { JobPosting, PatchBody } from "../types/job-postings.types";

type ModerationMode = "reject" | "restrict" | null;

type PatchMutationLike = {
  mutate: (variables: {
    payload: PatchBody;
    action: "approve" | "reject" | "restrict";
  }) => void;
};

type Params = {
  viewerRole?: Role;
  job?: JobPosting;
  router: AppRouterInstance;
  patchMutation: PatchMutationLike;
  setModerationMode: (value: ModerationMode) => void;
  setOpenEdit: (value: boolean) => void;
  setOpenApplicants: (value: boolean) => void;
  onApply?: (job: JobPosting) => void;
};

export function useJobPostingDetailActions({
  viewerRole,
  job,
  router,
  patchMutation,
  setModerationMode,
  setOpenEdit,
  setOpenApplicants,
  onApply,
}: Params) {
  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleHide = () => {
    toast.info("Chưa có API ẩn tin");
  };

  const handleViewApplicants = () => {
    setOpenApplicants(true);
  };

  const handleApply = () => {
    if (job) {
      onApply?.(job);
    }
  };

  const handleSave = () => {
    toast.info("Chưa có API lưu tin");
  };

  const handleApprove = () => {
    patchMutation.mutate({
      payload: { status: "approved" },
      action: "approve",
    });
  };

  const handleReject = () => {
    setModerationMode("reject");
  };

  const handleRestrict = () => {
    setModerationMode("restrict");
  };

  const handleReapprove = () => {
    patchMutation.mutate({
      payload: { status: "approved" },
      action: "approve",
    });
  };

  const handleViewCompanyDetail = () => {
    if (!job) return;

    if (viewerRole === "COMPANY") {
      router.push("/recruiter/profile");
      return;
    }

    router.push(`/company/${job.companyId}`);
  };

  return {
    handleEdit,
    handleHide,
    handleViewApplicants,
    handleApply,
    handleSave,
    handleApprove,
    handleReject,
    handleRestrict,
    handleReapprove,
    handleViewCompanyDetail,
  };
}
