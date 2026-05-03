"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/useAuth";
import CompanyProfilePage from "./CompanyProfilePage";
import { type ProfileTab } from "./CompanyProfileTabs";
import { useCompanyProfile } from "../../hooks/useCompanyProfile";
import { useCompanyProfileJobs } from "../../hooks/useCompanyProfileJobs";
import EditBasicInfoModal from "../edit-profile/EditBasicInfoModal";
import EditDescriptionModal from "../edit-profile/EditDescriptionModal";
import EditDetailModal from "../edit-profile/EditDetailModal";
import EditContactModal from "../edit-profile/EditContactModal";
import EditCoverImageModal from "../edit-profile/EditCoverImageModal";
import EditLogoModal from "../edit-profile/EditLogoModal";
import ManageOfficeImagesModal from "../edit-profile/ManageOfficeImagesModal";
import CompanyProfileLoading from "./CompanyProfileLoading";
import CompanyProfileError from "./CompanyProfileError";
import { getCategoriesList } from "@/features/job-postings/api/job-postings.api";
import { useCompanyComments, useCompanyStats } from "../../hooks/useCompanyComments";
import ApplyJobModal from "@/features/applications/components/modals/ApplyJobModal";
import type { JobPostingDataItem } from "@/features/job-postings/types/job-postings.types";
import { useApplyJob } from "@/features/applications/hooks/useApplyJob";

type CompanyProfilePageContentProps = {
  companyId?: string;
};

type ModalKey =
  | null
  | "basic-info"
  | "description"
  | "detail"
  | "contact"
  | "cover"
  | "logo"
  | "office-images";

export default function CompanyProfilePageContent({
  companyId,
}: CompanyProfilePageContentProps) {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const viewerRole = user?.role;

  const { data, isLoading, error } = useCompanyProfile({
    viewerRole,
    companyId,
  });

  const company = data?.data;

  const jobsQuery = useCompanyProfileJobs({
    companyId: company?.companyId,
    enabled: !!company?.companyId,
  });

  const categoriesQuery = useQuery({
    queryKey: ["job-postings", "categories"],
    queryFn: getCategoriesList,
  });

  const jobs = jobsQuery.data?.data?.data ?? [];
  const categories = categoriesQuery.data?.data ?? [];

  const [reviewsPage, setReviewsPage] = useState(1);
  const [activeTab, setActiveTab] = useState<ProfileTab>("about");
  const { applyJobData, handleOpenApplyModal, handleCloseApplyModal } = useApplyJob();
  const isOwner = viewerRole === "COMPANY" && !companyId;

  const isCompanyViewingOwn = isOwner && viewerRole === "COMPANY";
  const isAdminViewing = viewerRole === "ADMIN" && !!companyId;
  const canSeeReviews = isCompanyViewingOwn || isAdminViewing;

  const statsQuery = useCompanyStats({ 
    companyId: company?.companyId, 
    role: viewerRole 
  }, canSeeReviews);

  const shouldFetchComments = canSeeReviews && activeTab === "reviews";

  const reviewsQuery = useCompanyComments({
    page: reviewsPage,
    limit: 10,
    companyId: company?.companyId,
    role: viewerRole,
  }, shouldFetchComments);

  const reviewsData = shouldFetchComments ? reviewsQuery.data?.data : null;
  const reviews = reviewsData?.data ?? [];
  const reviewsPagination = reviewsData?.meta;
  const reviewsStats = statsQuery.data?.data;

  const [activeModal, setActiveModal] = useState<ModalKey>(null);

  if (isAuthLoading || !viewerRole) {
    return <CompanyProfileLoading />;
  }

  if (isLoading) {
    return <CompanyProfileLoading />;
  }

  if (error || !company) {
    return <CompanyProfileError />;
  }

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <CompanyProfilePage
        company={company}
        viewerRole={viewerRole}
        jobs={jobs}
        categories={categories}
        isJobsLoading={jobsQuery.isLoading || categoriesQuery.isLoading}
        isOwner={viewerRole === "COMPANY" && !companyId}
        onViewJobDetail={(jobId) => router.push(`/jobs-detail/${jobId}`)}
        onEditBasicInfo={() => setActiveModal("basic-info")}
        onEditDescription={() => setActiveModal("description")}
        onEditDetail={() => setActiveModal("detail")}
        onEditContact={() => setActiveModal("contact")}
        onManageOfficeImages={() => setActiveModal("office-images")}
        onChangeCoverImage={() => setActiveModal("cover")}
        onChangeLogo={() => setActiveModal("logo")}
        onFollow={() => undefined}
        onRestrict={() => undefined}
        onApplyJob={(job: JobPostingDataItem) => handleOpenApplyModal(job.jobId, job.jobTitle)}
        reviews={reviews}
        reviewsPagination={reviewsPagination}
        reviewsStats={reviewsStats}
        isReviewsLoading={reviewsQuery.isLoading || statsQuery.isLoading}
        onPageChange={setReviewsPage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeModal === "basic-info" && (
        <EditBasicInfoModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "description" && (
        <EditDescriptionModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "detail" && (
        <EditDetailModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "contact" && (
        <EditContactModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "cover" && (
        <EditCoverImageModal open onClose={closeModal} />
      )}

      {activeModal === "logo" && (
        <EditLogoModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "office-images" && (
        <ManageOfficeImagesModal open company={company} onClose={closeModal} />
      )}

      {applyJobData && (
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
