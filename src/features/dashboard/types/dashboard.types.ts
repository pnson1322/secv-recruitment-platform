export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ApplicationRateStat = {
  month: string;
  successRate: number;
};

export type JobItem = {
  jobId: number;
  jobTitle: string;
};

export type JobByCategoryStat = {
  categoryId: number;
  categoryName: string;
  jobs: JobItem[];
};

export type MonitorStat = {
  totalCompanies: number;
  avgRating: number;
  totalApplications: number;
  totalPassed: number;
};

export type CompanyDashboardStat = {
  totalJobs: number;
  totalApplications: number;
  totalReviews: number;
  totalHired: number;
};

export type AdminDashboardStat = {
  totalCompanies: number;
  totalStudents: number;
  totalApplications: number;
  totalJobPostings: number;
};

export type AdminJobByCategoryStat = {
  categoryId: number;
  categoryName: string;
  totalJobs: number;
};

export type AdminApplicationSuccessRateMonthlyStat = {
  month: string;
  successRate: number;
};

export type AdminApplicationsPerMonthStat = {
  month: string;
  totalApplications: number;
};

export type AdminTopCompanyStat = {
  companyId: number;
  companyName: string;
  totalJobs: number;
};

