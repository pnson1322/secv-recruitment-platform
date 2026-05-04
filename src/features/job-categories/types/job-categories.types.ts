export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type PaginationMeta = {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
};

export type JobCategoriesDataItem = {
  categoryId: number;
  categoryName: string;
  isActive: boolean;
  jobCount: number;
  createdAt: string;
};

export type JobCategoriesData = {
  data: JobCategoriesDataItem[];
  meta: PaginationMeta;
};

export type JobCategoriesStats = {
  totalCategories: number;
  activeCategories: number;
  totalJobs: number;
};
