import { api } from "@/lib/axios";
import type {
  ApiResponse,
  ApplicationRateStat,
  JobByCategoryStat,
  MonitorStat,
  CompanyDashboardStat,
  AdminDashboardStat,
  AdminJobByCategoryStat,
  AdminApplicationSuccessRateMonthlyStat,
  AdminApplicationsPerMonthStat,
  AdminTopCompanyStat,
} from "../types/dashboard.types";

export const getApplicationRateStats = async () => {
  const response = await api.get<ApiResponse<ApplicationRateStat[]>>(
    "/statistics/applications/7-days"
  );
  return response.data;
};

export const getJobsByCategoryStats = async () => {
  const response = await api.get<ApiResponse<JobByCategoryStat[]>>(
    "/statistics/jobs/by-category"
  );
  return response.data;
};

export const getMonitorStats = async () => {
  const response = await api.get<ApiResponse<MonitorStat>>(
    "/statistics/monitor"
  );
  return response.data;
};

export const getCompanyDashboardStats = async () => {
  const response = await api.get<ApiResponse<CompanyDashboardStat>>(
    "/statistics/company/stats"
  );
  return response.data;
};

export const getAdminDashboardStats = async () => {
  const response = await api.get<ApiResponse<AdminDashboardStat>>(
    "/statistics/admin/dashboard"
  );
  return response.data;
};

export const getAdminJobsByCategoryStats = async () => {
  const response = await api.get<ApiResponse<AdminJobByCategoryStat[]>>(
    "/statistics/admin/jobs-by-category"
  );
  return response.data;
};

export const getAdminApplicationSuccessRateMonthlyStats = async () => {
  const response = await api.get<ApiResponse<AdminApplicationSuccessRateMonthlyStat[]>>(
    "/statistics/admin/application-success-rate-monthly"
  );
  return response.data;
};

export const getAdminApplicationsPerMonthStats = async () => {
  const response = await api.get<ApiResponse<AdminApplicationsPerMonthStat[]>>(
    "/statistics/admin/applications-per-month"
  );
  return response.data;
};

export const getAdminTopCompaniesStats = async () => {
  const response = await api.get<ApiResponse<AdminTopCompanyStat[]>>(
    "/statistics/admin/top-companies"
  );
  return response.data;
};

