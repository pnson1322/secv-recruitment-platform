"use client";

import { useState } from "react";

export function useApplyJob() {
  const [applyJobData, setApplyJobData] = useState<{ jobId: number; jobTitle: string } | null>(null);

  const handleOpenApplyModal = (jobId: number, jobTitle: string) => {
    setApplyJobData({ jobId, jobTitle });
  };

  const handleCloseApplyModal = () => {
    setApplyJobData(null);
  };

  return {
    applyJobData,
    handleOpenApplyModal,
    handleCloseApplyModal,
    isApplyModalOpen: !!applyJobData,
  };
}
