"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
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
import SuccessRateChart from "./recruiter/SuccessRateChart";
import JobCategoryDistribution from "./recruiter/JobCategoryDistribution";
import RecentJobsSection from "./recruiter/RecentJobsSection";

export default function RecruiterDashboardPage() {
  const router = useRouter();

  const { data: statsRes, isLoading: statsLoading } = useCompanyDashboardStats();
  const stats = statsRes?.data;

  const { data: successRateRes, isLoading: successRateLoading } = useApplicationRateStats();
  const successRates: ApplicationRateStat[] = successRateRes?.data || [];

  const { data: categoryRes, isLoading: categoryLoading } = useJobsByCategoryStats();
  const categories: JobByCategoryStat[] = categoryRes?.data || [];

  const { data: recentJobsRes, isLoading: recentJobsLoading } = useQuery({
    queryKey: ["recruiter-recent-jobs"],
    queryFn: () => getJobPostingCardsForCompany({ page: 1, limit: 6 }),
    staleTime: 1000 * 60 * 5,
  });
  const recentJobs = recentJobsRes?.data?.data || [];

  const isLoading =
    statsLoading ||
    successRateLoading ||
    categoryLoading ||
    recentJobsLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-(--color-accent)" />
          <p className="text-[15px] font-medium text-(--color-muted)">
            Đang tải dữ liệu tổng quan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-2 sm:px-6 lg:px-8">
      <RecruiterStatsGrid stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <SuccessRateChart successRates={successRates} />
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
