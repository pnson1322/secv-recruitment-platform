"use client";

import {
  useAdminDashboardStats,
  useAdminApplicationsPerMonthStats,
  useAdminApplicationSuccessRateMonthlyStats,
  useAdminJobsByCategoryStats,
  useAdminTopCompaniesStats,
} from "../hooks";

import AdminStatsGrid from "./admin/AdminStatsGrid";
import ApplicationsTrendChart from "./admin/ApplicationsTrendChart";
import SuccessRateBarChart from "./admin/SuccessRateBarChart";
import AdminJobCategoryDistribution from "./admin/AdminJobCategoryDistribution";
import TopCompaniesList from "./admin/TopCompaniesList";

import { AdminDashboardSkeleton } from "./shared/DashboardSkeleton";
import DashboardErrorState from "./shared/DashboardErrorState";

export default function AdminDashboardPage() {
  const {
    data: statsRes,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
  } = useAdminDashboardStats();

  const {
    data: applicationsTrendRes,
    isLoading: trendLoading,
    isError: trendError,
    refetch: refetchTrend,
  } = useAdminApplicationsPerMonthStats();

  const {
    data: successRateRes,
    isLoading: successRateLoading,
    isError: successRateError,
    refetch: refetchSuccessRate,
  } = useAdminApplicationSuccessRateMonthlyStats();

  const {
    data: categoriesRes,
    isLoading: categoriesLoading,
    isError: categoriesError,
    refetch: refetchCategories,
  } = useAdminJobsByCategoryStats();

  const {
    data: companiesRes,
    isLoading: companiesLoading,
    isError: companiesError,
    refetch: refetchCompanies,
  } = useAdminTopCompaniesStats();

  const isLoading =
    statsLoading ||
    trendLoading ||
    successRateLoading ||
    categoriesLoading ||
    companiesLoading;

  const isError =
    statsError ||
    trendError ||
    successRateError ||
    categoriesError ||
    companiesError;

  const stats = statsRes?.data;
  const applicationsTrend = applicationsTrendRes?.data || [];
  const successRate = successRateRes?.data || [];
  const categories = categoriesRes?.data || [];
  const companies = companiesRes?.data || [];

  const handleRetry = () => {
    refetchStats();
    refetchTrend();
    refetchSuccessRate();
    refetchCategories();
    refetchCompanies();
  };

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  if (isError) {
    return <DashboardErrorState onRetry={handleRetry} />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-2 sm:px-6 lg:px-8">
      <AdminStatsGrid stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ApplicationsTrendChart data={applicationsTrend} />
        <SuccessRateBarChart data={successRate} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminJobCategoryDistribution categories={categories} />
        <TopCompaniesList companies={companies} />
      </div>
    </div>
  );
}
