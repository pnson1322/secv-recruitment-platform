import { api } from "@/lib/axios";
import type {
  AdminJobPostingsStats,
  ApiResponse,
  CategoryItem,
  JobItem,
  JobPosting,
  JobPostingCardAdminCompanyItem,
  JobPostingCardStudentItem,
  JobPostingCardsParams,
  JobPostingData,
  JobPostingDataItem,
  JobPostingsListParam,
  JobPostingsStats,
  JobPostingTag,
  JobRecommendation,
  JobRecommendationsParams,
  PatchBody,
  PostBody,
  PostResponse,
  PutBody,
  PutResponse,
  SkillItem,
} from "../types/job-postings.types";

// for all:
export async function getJobPostingById(id: number) {
  const res = await api.get<ApiResponse<JobPosting>>(`/job-postings/${id}`);
  return res.data;
}

export async function getJobPostingsListByCompanyId(
  params: JobPostingsListParam,
) {
  const { companyId, page = 1, limit = 10 } = params;

  const res = await api.get<ApiResponse<JobPostingData<JobPostingDataItem>>>(
    `/job-postings/company/${companyId}`,
    {
      params: { page, limit },
    },
  );

  return res.data;
}

export async function getCategoriesList() {
  const res = await api.get<ApiResponse<CategoryItem[]>>(
    "/job-postings/categories",
  );
  return res.data;
}

export async function getSkillList() {
  const res = await api.get<ApiResponse<SkillItem[]>>("/job-postings/skills");
  return res.data;
}

export async function getJobPostingsAll(params: JobPostingsListParam) {
  const { page = 1, limit = 10 } = params;

  const res = await api.get<ApiResponse<JobPostingData<JobItem>>>(
    "/job-postings/all",
    {
      params: { page, limit },
    },
  );
  return res.data;
}

export async function getJobPostingsStats() {
  const res = await api.get<ApiResponse<JobPostingsStats>>(
    "/job-postings/stats",
  );
  return res.data;
}

// for Company:
export async function createJobPosting(payload: PostBody) {
  const res = await api.post<ApiResponse<PostResponse>>(
    "/job-postings",
    payload,
  );
  return res.data;
}

export async function putJobPosting(id: number, payload: PutBody) {
  const res = await api.put<ApiResponse<PutResponse>>(
    `/job-postings/${id}`,
    payload,
  );
  return res.data;
}

export async function toggleJobPostingActive(id: number) {
  const res = await api.patch<ApiResponse<Record<string, never>>>(
    `/job-postings/${id}/toggle-active`,
  );
  return res.data;
}

export async function getJobPostingCardsForCompany(
  params: JobPostingCardsParams & { tag?: JobPostingTag | "" },
) {
  const { page = 1, limit = 10, search, city, tag } = params;

  const queryParams: Record<string, string | number> = {
    page,
    limit,
  };

  if (search?.trim()) {
    queryParams.search = search.trim();
  }

  if (city?.trim()) {
    queryParams.city = city.trim();
  }

  if (tag) {
    queryParams.tag = tag;
  }

  const res = await api.get<
    ApiResponse<JobPostingData<JobPostingCardAdminCompanyItem>>
  >("/job-postings/card/company", {
    params: queryParams,
  });

  return res.data;
}

// for Admin:
export async function patchJobPosting(id: number, payload: PatchBody) {
  const res = await api.patch<ApiResponse<number>>(
    `/job-postings/${id}/status`,
    payload,
  );
  return res.data;
}

export async function getJobPostingCardsForAdmin(
  params: JobPostingCardsParams,
) {
  const { page = 1, limit = 10, search, status, city } = params;

  const filteredParams: Record<string, unknown> = {};

  if (search || status || city || page > 1 || limit !== 10) {
    filteredParams.page = page;
    filteredParams.limit = limit;
    if (search) filteredParams.search = search;
    if (status) filteredParams.status = status;
    if (city) filteredParams.city = city;
  }

  const res = await api.get<
    ApiResponse<JobPostingData<JobPostingCardAdminCompanyItem>>
  >("/job-postings/card", {
    params: filteredParams,
  });

  return res.data;
}

export async function getAdminJobPostingsStats() {
  const res = await api.get<ApiResponse<AdminJobPostingsStats>>(
    "/job-postings/admin/stats",
  );
  return res.data;
}

// for Student:
export async function getJobPostingCardsForStudent(
  params: JobPostingCardsParams,
) {
  const { page = 1, limit = 10, search, city } = params;

  const res = await api.get<
    ApiResponse<JobPostingData<JobPostingCardStudentItem>>
  >("/job-postings/card", {
    params: {
      page,
      limit,
      search,
      city,
    },
  });

  return res.data;
}

export async function getSavedJobPostings(
  params: JobPostingCardsParams,
) {
  const { page = 1, limit = 10, search, city, status } = params;

  const res = await api.get<
    ApiResponse<JobPostingData<JobPostingCardStudentItem>>
  >("/job-postings/saved", {
    params: {
      page,
      limit,
      search: search || undefined,
      city: city || undefined,
      status: status || undefined,
    },
  });

  return res.data;
}

export async function saveJobPosting(jobId: number) {
  const res = await api.post<ApiResponse<{ jobId: number; isSaved: boolean }>>(
    `/saved-jobs/${jobId}`
  );
  return res.data;
}

export async function unsaveJobPosting(jobId: number) {
  const res = await api.delete<ApiResponse<{ jobId: number; isSaved: boolean }>>(
    `/saved-jobs/${jobId}`
  );
  return res.data;
}

export async function getJobRecommendations(params: JobRecommendationsParams) {
  const res = await api.get<ApiResponse<JobRecommendation[]>>(
    "/recommendations/jobs",
    {
      params,
    },
  );
  return res.data;
}
