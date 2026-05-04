import { api } from "@/lib/axios";
import {
  ApiResponse,
  JobCategoriesData,
  JobCategoriesStats,
} from "../types/job-categories.types";

export async function getJobCategories(params: {
  page: number;
  limit: number;
}) {
  const { page = 1, limit = 10 } = params;

  const res = await api.get<ApiResponse<JobCategoriesData>>("/job-categories", {
    params: { page, limit },
  });
  return res.data;
}

export async function createJobCategories(categoryName: string) {
  const res = await api.post<ApiResponse<{ id: number }>>("/job-categories", {
    categoryName,
  });
  return res.data;
}

export async function patchJobCategories(id: number, categoryName: string) {
  const res = await api.patch<ApiResponse<Record<string, never>>>(
    `/job-categories/${id}`,
    {
      categoryName,
    },
  );
  return res.data;
}

export async function deleteJobCategories(id: number) {
  const res = await api.delete<ApiResponse<Record<string, never>>>(
    `/job-categories/${id}`,
  );
  return res.data;
}

export async function toggleJobCategories(id: number) {
  const res = await api.patch<ApiResponse<Record<string, never>>>(
    `/job-categories/${id}/toggle`,
  );
  return res.data;
}

export async function getJobCategoriesStats() {
  const res = await api.get<ApiResponse<JobCategoriesStats>>(
    "/job-categories/stats",
  );
  return res.data;
}
