"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { useJobPostingDetail } from "../../hooks/useJobPostingDetail";
import { usePatchJobPostingMutation } from "../../hooks/usePatchJobPostingMutation";
import { useToggleJobPostingActiveMutation } from "../../hooks/useToggleJobPostingActiveMutation";
import { useJobPostingDetailActions } from "../../hooks/useJobPostingDetailActions";
import EditJobPostingModal from "./edit/EditJobPostingModal";
import JobPostingBackBar from "./detail/JobPostingBackBar";
import JobPostingDetailHeader from "./detail/JobPostingDetailHeader";
import JobPostingDetailSection from "./detail/JobPostingDetailSection";
import JobPostingSidebar from "./detail/JobPostingSideBar";
import SimilarJobsSection from "./detail/SimilarJobsSection";
import JobPostingModerationModal from "./detail/JobPostingModerationModal";
import JobApplicantsModal from "./detail/JobApplicantsModal";
import JobPostingDetailLoading from "./detail/JobPostingDetailLoading";
import JobPostingDetailError from "./detail/JobPostingDetailError";
import ApplyJobModal from "@/features/applications/components/modals/ApplyJobModal";
import { useApplyJob } from "@/features/applications/hooks/useApplyJob";
import type { JobPosting } from "../../types/job-postings.types";
import {
  formatRelativeDate,
  formatSalary,
  getJobPostingStatusMeta,
  getJobPostingTagMeta,
} from "../../utils/job-postings.utils";

type Props = {
  jobId: number;
};

type ModerationMode = "reject" | "restrict" | null;

function getDeadlineState(applicationDeadline?: string) {
  if (!applicationDeadline) {
    return { isExpired: false, isExpiringSoon: false };
  }

  const deadline = new Date(applicationDeadline).getTime();

  if (Number.isNaN(deadline)) {
    return { isExpired: false, isExpiringSoon: false };
  }

  const now = Date.now();
  const diff = deadline - now;
  const threeDays = 3 * 24 * 60 * 60 * 1000;

  return {
    isExpired: diff < 0,
    isExpiringSoon: diff >= 0 && diff <= threeDays,
  };
}

export default function JobPostingDetailPageContent({ jobId }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const viewerRole = user?.role;

  const [openEdit, setOpenEdit] = useState(false);
  const [openApplicants, setOpenApplicants] = useState(false);
  const { applyJobData, handleOpenApplyModal, handleCloseApplyModal } = useApplyJob();
  const [moderationMode, setModerationMode] = useState<ModerationMode>(null);

  const jobDetailQuery = useJobPostingDetail(jobId);
  const job = jobDetailQuery.data?.data;

  const companyProfileQuery = useCompanyProfile({
    viewerRole,
    companyId:
      viewerRole === "COMPANY"
        ? undefined
        : job
          ? String(job.companyId)
          : undefined,
  });

  const patchMutation = usePatchJobPostingMutation(jobId);
  const toggleActiveMutation = useToggleJobPostingActiveMutation({ jobId });

  const actions = useJobPostingDetailActions({
    viewerRole,
    job,
    router,
    patchMutation,
    setModerationMode,
    setOpenEdit,
    setOpenApplicants,
    onApply: (job: JobPosting) => handleOpenApplyModal(job.jobId, job.jobTitle),
  });

  if (!viewerRole) return null;

  if (jobDetailQuery.isLoading) {
    return <JobPostingDetailLoading />;
  }

  if (jobDetailQuery.error || !job) {
    return <JobPostingDetailError isStudent={viewerRole === "STUDENT"} />;
  }

  const company = companyProfileQuery.data?.data;
  const deadlineState = getDeadlineState(job.applicationDeadline);

  if (
    viewerRole === "STUDENT" &&
    (job.status !== "approved" || !["Active", "Closed"].includes(job.tag) || deadlineState.isExpired)
  ) {
    return <JobPostingDetailError isStudent />;
  }

  const statusMeta = getJobPostingStatusMeta(job.status);
  const tagMeta = getJobPostingTagMeta(job.tag);
  const isBusy = patchMutation.isPending || toggleActiveMutation.isPending;

  return (
    <>
      <div className="mx-auto mt-4 max-w-7xl space-y-7 px-4 pb-12 md:px-6 lg:px-8">
        <JobPostingBackBar onBack={() => router.back()} />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-6">
            <JobPostingDetailHeader
              viewerRole={viewerRole}
              status={job.status}
              tag={job.tag}
              jobTitle={job.jobTitle}
              companyName={company?.companyName || "Chưa cập nhật"}
              companyLogoUrl={company?.logoUrl || job.logoUrl || null}
              city={job.city}
              salaryText={formatSalary({
                salaryMin: job.salaryMin,
                salaryMax: job.salaryMax,
                salaryType: job.salaryType,
                isSalaryNegotiable: job.isSalaryNegotiable,
              })}
              postedAtText={`Đăng ${formatRelativeDate(job.createdAt)}`}
              deadlineText={new Date(
                job.applicationDeadline,
              ).toLocaleDateString("vi-VN")}
              isExpired={deadlineState.isExpired}
              isExpiringSoon={deadlineState.isExpiringSoon}
              applicantCount={job.applicantCount}
              statusLabel={statusMeta.label}
              statusClassName={statusMeta.className}
              tagLabel={tagMeta.label}
              tagClassName={tagMeta.className}
              isLoading={isBusy}
              isClosed={job.tag === "Closed"}
              onEdit={actions.handleEdit}
              onHide={() => toggleActiveMutation.mutate()}
              onViewApplicants={actions.handleViewApplicants}
              onApply={actions.handleApply}
              onSave={actions.handleSave}
              onApprove={actions.handleApprove}
              onReject={actions.handleReject}
              onRestrict={actions.handleRestrict}
              onReapprove={actions.handleReapprove}
            />

            <JobPostingDetailSection
              title="Mô tả công việc"
              content={job.jobDescription}
              tone="cyan"
            />

            <JobPostingDetailSection
              title="Yêu cầu ứng viên"
              content={job.requirements}
              tone="blue"
              listMode
            />

            <JobPostingDetailSection
              title="Quyền lợi"
              content={job.benefits}
              tone="green"
              listMode
            />

            {viewerRole === "STUDENT" ? <SimilarJobsSection /> : null}
          </div>

          <JobPostingSidebar
            viewerRole={viewerRole}
            status={job.status}
            adminNote={job.adminNote}
            companyName={company?.companyName || "Chưa cập nhật"}
            companySize={company?.companySize}
            industry={company?.industry}
            address={company?.address}
            website={company?.website}
            contactEmail={company?.contactEmail}
            fallbackCity={job.city}
            onViewCompanyDetail={actions.handleViewCompanyDetail}
          />
        </div>
      </div>

      {openEdit ? (
        <EditJobPostingModal
          key={job.jobId}
          open
          job={job}
          onClose={() => setOpenEdit(false)}
        />
      ) : null}

      {moderationMode ? (
        <JobPostingModerationModal
          open
          mode={moderationMode}
          onClose={() => setModerationMode(null)}
          onConfirm={(reason) => {
            if (moderationMode === "reject") {
              patchMutation.mutate(
                {
                  payload: { status: "rejected", admin_note: reason },
                  action: "reject",
                },
                {
                  onSuccess: () => setModerationMode(null),
                },
              );
              return;
            }

            if (moderationMode === "restrict") {
              patchMutation.mutate(
                {
                  payload: { status: "restricted", admin_note: reason },
                  action: "restrict",
                },
                {
                  onSuccess: () => setModerationMode(null),
                },
              );
            }
          }}
          isLoading={patchMutation.isPending}
        />
      ) : null}

      {viewerRole !== "STUDENT" && (
        <JobApplicantsModal
          open={openApplicants}
          onClose={() => setOpenApplicants(false)}
          jobId={jobId}
          jobTitle={job.jobTitle}
        />
      )}

      {viewerRole === "STUDENT" && applyJobData && (
        <ApplyJobModal 
          open
          onClose={handleCloseApplyModal}
          jobId={applyJobData.jobId}
          jobTitle={applyJobData.jobTitle}
        />
      )}
    </>
  );
}
