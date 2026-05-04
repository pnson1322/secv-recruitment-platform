"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CompanyJobPostingsPage from "@/features/job-postings/components/company/CompanyJobPostingsPage";
import CreateJobPostingModal from "@/features/job-postings/components/company/create-job/CreateJobPostingModal";

export default function RecruiterJobPostingsClient() {
  const router = useRouter();
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <>
      <CompanyJobPostingsPage
        onCreateJob={() => setOpenCreateModal(true)}
        onViewJobDetail={(jobId) => router.push(`/jobs-detail/${jobId}`)}
      />

      {openCreateModal ? (
        <CreateJobPostingModal open onClose={() => setOpenCreateModal(false)} />
      ) : null}
    </>
  );
}
