"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  useCompanyDashboardStats,
  useApplicationRateStats,
  useJobsByCategoryStats,
} from "../hooks";
import type {
  ApplicationRateStat,
  JobByCategoryStat,
} from "../types/dashboard.types";
import { getJobPostingCardsForCompany } from "@/features/job-postings/api/job-postings.api";

import RecruiterStatsGrid from "./recruiter/RecruiterStatsGrid";
import JobCategoryDistribution from "./recruiter/JobCategoryDistribution";
import RecentJobsSection from "./recruiter/RecentJobsSection";

import { RecruiterDashboardSkeleton } from "./shared/DashboardSkeleton";
import DashboardErrorState from "./shared/DashboardErrorState";
import ApplicationCountChart from "./recruiter/SuccessRateChart";

export default function RecruiterDashboardPage() {
  const router = useRouter();

  const {
    data: statsRes,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
  } = useCompanyDashboardStats();
  const stats = statsRes?.data;

  const {
    data: successRateRes,
    isLoading: successRateLoading,
    isError: successRateError,
    refetch: refetchSuccessRate,
  } = useApplicationRateStats();
  const successRates: ApplicationRateStat[] = successRateRes?.data || [];

  const {
    data: categoryRes,
    isLoading: categoryLoading,
    isError: categoryError,
    refetch: refetchCategories,
  } = useJobsByCategoryStats();
  const categories: JobByCategoryStat[] = categoryRes?.data || [];

  const {
    data: recentJobsRes,
    isLoading: recentJobsLoading,
    isError: recentJobsError,
    refetch: refetchRecentJobs,
  } = useQuery({
    queryKey: ["recruiter-recent-jobs"],
    queryFn: () => getJobPostingCardsForCompany({ page: 1, limit: 6 }),
    staleTime: 1000 * 60 * 5,
  });
  const recentJobs = recentJobsRes?.data?.data || [];

  const isLoading =
    statsLoading || successRateLoading || categoryLoading || recentJobsLoading;

  const isError =
    statsError || successRateError || categoryError || recentJobsError;

  const handleRetry = () => {
    refetchStats();
    refetchSuccessRate();
    refetchCategories();
    refetchRecentJobs();
  };

  if (isLoading) {
    return <RecruiterDashboardSkeleton />;
  }

  if (isError) {
    return <DashboardErrorState onRetry={handleRetry} />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-2 sm:px-6 lg:px-8">
      <RecruiterStatsGrid stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ApplicationCountChart data={successRates} />
        <JobCategoryDistribution categories={categories} />
      </div>

      <RecentJobsSection
        recentJobs={recentJobs}
        onViewDetail={(jobId) => router.push(`/jobs-detail/${jobId}`)}
        onSeeAll={() => router.push("/recruiter/job-postings")}
      />
    </div>
  );
}
