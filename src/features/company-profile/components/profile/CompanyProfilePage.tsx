"use client";

import { useMemo, useState } from "react";
import type { Role } from "@/features/auth/constants/roles";
import type { CompanyProfile } from "../../types/company.types";
import CompanyProfileHeader from "./CompanyProfileHeader";
import CompanyProfileStats from "./CompanyProfileStats";
import CompanyProfileTabs, { type ProfileTab } from "./CompanyProfileTabs";
import CompanyAboutSection from "./CompanyAboutSection";
import CompanyJobsSection from "./CompanyJobsSection";
import CompanyReviewsSection from "./CompanyReviewsSection";
import type {
  CategoryItem,
  JobPostingDataItem,
} from "@/features/job-postings/types/job-postings.types";
import type {
  CompanyComment,
  PaginationMeta,
  CompanyStatsData,
} from "../../types/comment.types";

type CompanyProfilePageProps = {
  company: CompanyProfile;
  viewerRole: Role;
  jobs: JobPostingDataItem[];
  categories: CategoryItem[];
  isJobsLoading?: boolean;
  isOwner?: boolean;
  onViewJobDetail: (jobId: number) => void;
  onEditBasicInfo?: () => void;
  onEditDescription?: () => void;
  onEditDetail?: () => void;
  onEditContact?: () => void;
  onManageOfficeImages?: () => void;
  onChangeCoverImage?: () => void;
  onChangeLogo?: () => void;
  onFollow?: () => void;
  onRestrict?: () => void;
  reviews?: CompanyComment[];
  reviewsPagination?: PaginationMeta;
  reviewsStats?: CompanyStatsData | null;
  isReviewsLoading?: boolean;
  onPageChange?: (page: number) => void;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
};

export default function CompanyProfilePage({
  company,
  viewerRole,
  jobs,
  categories,
  isJobsLoading = false,
  isOwner = false,
  onViewJobDetail,
  onEditBasicInfo,
  onEditDescription,
  onEditDetail,
  onEditContact,
  onManageOfficeImages,
  onChangeCoverImage,
  onChangeLogo,
  onFollow,
  onRestrict,
  reviews = [],
  reviewsPagination,
  reviewsStats,
  isReviewsLoading = false,
  onPageChange,
  activeTab,
  onTabChange,
}: CompanyProfilePageProps) {
  const isStudent = viewerRole === "STUDENT";

  const tabs = useMemo<ProfileTab[]>(() => {
    if (isStudent) return ["about", "jobs"];
    return ["about", "jobs", "reviews"];
  }, [isStudent]);

  return (
    <div className="space-y-6 px-6 md:px-10 lg:px-24">
      <CompanyProfileHeader
        company={company}
        viewerRole={viewerRole}
        isOwner={isOwner}
        onEditBasicInfo={onEditBasicInfo}
        onChangeCoverImage={onChangeCoverImage}
        onChangeLogo={onChangeLogo}
        onFollow={onFollow}
        onRestrict={onRestrict}
      />

      <CompanyProfileStats company={company} totalJobs={jobs.length} />

      <CompanyProfileTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={onTabChange}
        reviewCount={reviewsStats?.totalComments ?? reviewsPagination?.totalItems ?? reviews.length}
      />

      {activeTab === "about" && (
        <CompanyAboutSection
          company={company}
          isOwner={isOwner}
          onEditDescription={onEditDescription}
          onEditDetail={onEditDetail}
          onEditContact={onEditContact}
          onManageOfficeImages={onManageOfficeImages}
        />
      )}

      {activeTab === "jobs" && (
        <CompanyJobsSection
          jobs={jobs}
          categories={categories}
          viewerRole={viewerRole}
          isLoading={isJobsLoading}
          onViewJobDetail={onViewJobDetail}
        />
      )}

      {activeTab === "reviews" && !isStudent && (
        <CompanyReviewsSection
          reviews={reviews}
          viewerRole={viewerRole}
          averageRating={company.rating ?? 4.5}
          pagination={reviewsPagination}
          stats={reviewsStats}
          isLoading={isReviewsLoading}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
