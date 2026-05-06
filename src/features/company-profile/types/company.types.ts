export type CompanyStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "RESTRICTED"
  | string;

export type OfficeImage = {
  imageId: number;
  companyId: number;
  imageUrl: string;
  createAt: string;
};

export type CompanyProfile = {
  companyId?: number;
  userId?: number;
  companyName?: string;
  industry?: string;
  slogan?: string | null;
  companySize?: string | null;
  website?: string | null;
  description?: string | null;
  address?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  logoUrl?: string | null;
  coverImageUrl?: string | null;
  rating?: number;
  totalJobsPosted?: number;
  totalFollowers?: number;
  status?: CompanyStatus;
  createdAt?: string;
  updatedAt?: string;
  officeImages?: OfficeImage[];
  adminNote: string;
  followed?: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type BasicInfoBody = {
  company_name?: string;
  slogan?: string | null;
};

export type ContactBody = {
  website?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
};

export type DetailBody = {
  industry?: string;
  company_size?: string | null;
  address?: string | null;
};

export type EmptyBody = Record<string, never>;

// for Admin:
export type AdminCompanyDataPart = {
  companyId: number;
  companyName: string;
  logoUrl: string;
  industry: string;
  status: CompanyStatus;
  rating: number;
  followers: number;
  totalJobs: number;
  companySize: string;
  createdAt: string;
};

export type AdminCompanyStatusPart = {
  status: string;
  count: number;
};

export type AdminPaginationMeta = {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
};

export type AdminCompanyListData = {
  data: AdminCompanyDataPart[];
  status: AdminCompanyStatusPart[];
  meta: AdminPaginationMeta;
};

export type ChangeStatusBody = {
  status: CompanyStatus;
  admin_note?: string;
};

// for Student:
export type StudentCompanyDataPart = {
  companyId: number;
  companyName: string;
  logoUrl: string;
  industry: string;
  activeJobs: number;
  followed?: boolean;
};

export type StudentPaginationMeta = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type StudentCompanyListData = {
  data: StudentCompanyDataPart[];
  meta: StudentPaginationMeta;
};

export type MonitorStats = {
  totalCompanies: number;
  avgRating: number;
  totalApplications: number;
  totalPassed: number;
};

