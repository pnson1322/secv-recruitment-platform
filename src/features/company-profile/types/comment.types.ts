import { ApiResponse } from "./company.types";

export type CompanyComment = {
  id: number;
  companyId: number;
  rating: number;
  content: string;
  createdAt: string;
  studentId?: number;
  studentName?: string;
  studentAvatar?: string | null;
};

export type PaginationMeta = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type CompanyCommentsData = {
  data: CompanyComment[];
  meta: PaginationMeta;
};

export type CompanyCommentsResponse = ApiResponse<CompanyCommentsData>;

export type RatingDistribution = {
  rating: number;
  count: number;
  percentage: number;
};

export type CompanyStatsData = {
  totalComments: number;
  averageRating: number;
  distribution: RatingDistribution[];
};

export type CompanyStatsResponse = ApiResponse<CompanyStatsData>;
