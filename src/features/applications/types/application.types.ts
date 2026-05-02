export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

export type ApplicationStatus =
  | "submitted"
  | "interviewing"
  | "passed"
  | "rejected";

export type InvitationStatus = "pending" | "accepted" | "rejected" | "expired";

export type ApplicationData = {
  props: {
    id: number;
    jobId: number;
    studentId: number;
    cvUrl: string;
    coverLetter?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type PostBody = {
  jobId: number;
  cvUrl: string;
  coverLetter?: string;
};

export type ApplicationParams = {
  page?: number;
  limit?: number;
  status?: ApplicationStatus | "";
};

export type DataPagination = {
  applicationId: number;
  status: ApplicationStatus;
  createdAt: string;
  job: {
    jobId: number;
    jobTitle: string;
    city: string;
    salaryMin: number;
    salaryMax: number;
    salaryType: string;
    isSalaryNegotiable: boolean;
  };
  company: {
    companyId: number;
    logoUrl: string;
    companyName: string;
  };
};

export type PaginationMeta = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type ApplicationPagination = {
  data: DataPagination[];
  meta: PaginationMeta;
};

export type ApplicationStats = {
  total: number;
  byStatus: {
    submitted: number;
    interviewing: number;
    passed: number;
    rejected: number;
  };
};

export type InvitationItem = {
  invitationId: number;
  status: InvitationStatus;
  message: string;
  createdAt: string;
  job: {
    jobId: number;
    jobTitle: string;
    city: string;
    salaryMin: number;
    salaryMax: number;
    salaryType: string;
    isSalaryNegotiable: boolean;
  };
  company: {
    companyId: number;
    companyName: string;
    logoUrl: string | null;
  };
};

export type InvitationParams = {
  page?: number;
  limit?: number;
  status?: InvitationStatus | "";
  search?: string;
  categoryId?: number;
  dateRange?: "7days" | "30days" | "";
};

export type InvitationPagination = {
  data: InvitationItem[];
  meta: PaginationMeta;
};

export type RespondInvitationBody = {
  action: "accept" | "reject";
  cvUrl?: string;
};

export type InvitationStats = {
  total: number;
  byStatus: {
    pending: number;
    accepted: number;
    rejected: number;
    expired: number;
  };
};
