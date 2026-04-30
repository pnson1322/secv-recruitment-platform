import { api } from "@/lib/axios";
import type {
  ApiResponse,
  ApplicationData,
  ApplicationStatus,
  ApplicationStatsResponse,
  InvitationData,
  InvitationStatsResponse,
  InvitationStatus,
  UpdateApplicationStatus,
  SendInvitation,
} from "../types/candidate.types";

export type GetApplicationsParams = {
  page?: number;
  limit?: number;
  status?: ApplicationStatus | ApplicationStatus[];
  jobId?: number;
  categoryId?: number;
  dateRange?: "7days" | "30days";
  search?: string;
};

export type GetInvitationsParams = {
  page?: number;
  limit?: number;
  status?: InvitationStatus | InvitationStatus[];
  categoryId?: number;
  dateRange?: "7days" | "30days";
  search?: string;
};

export async function getApplications(params: GetApplicationsParams) {
  const { page = 1, limit = 10, status, jobId, categoryId, dateRange, search } = params;
  
  const query = new URLSearchParams();
  query.append("page", page.toString());
  query.append("limit", limit.toString());
  
  if (jobId) query.append("jobId", jobId.toString());
  if (categoryId) query.append("categoryId", categoryId.toString());
  if (dateRange) query.append("dateRange", dateRange);
  if (search?.trim()) query.append("search", search.trim());

  if (status) {
    if (Array.isArray(status)) {
      status.forEach(s => query.append("status", s));
    } else {
      query.append("status", status);
    }
  }

  const res = await api.get<ApiResponse<ApplicationData>>(
    "/application/company/applications",
    { params: query }
  );

  return res.data;
}

export async function getInvitations(params: GetInvitationsParams) {
  const { page = 1, limit = 10, status, categoryId, dateRange, search } = params;
  
  const query = new URLSearchParams();
  query.append("page", page.toString());
  query.append("limit", limit.toString());
  
  if (categoryId) query.append("categoryId", categoryId.toString());
  if (dateRange) query.append("dateRange", dateRange);
  if (search?.trim()) query.append("search", search.trim());

  if (status) {
    if (Array.isArray(status)) {
      status.forEach(s => query.append("status", s));
    } else {
      query.append("status", status);
    }
  }

  const res = await api.get<ApiResponse<InvitationData>>(
    "/application/company/invitations",
    { params: query }
  );

  return res.data;
}

export async function getApplicationStats(params?: { jobId?: number }) {
  const res = await api.get<ApiResponse<ApplicationStatsResponse>>(
    "/application/company/applications/stats",
    { params }
  );
  return res.data;
}

export async function getInvitationStats() {
  const res = await api.get<ApiResponse<InvitationStatsResponse>>(
    "/application/company/invitation/stats"
  );
  return res.data;
}

export async function updateApplicationStatus(
  applicationId: number,
  status: ApplicationStatus
) {
  const res = await api.patch<ApiResponse<UpdateApplicationStatus>>(
    `/application/company/applications/${applicationId}/status`, 
    { status }
  );
  return res.data;
}

export async function sendInvitation(data: {
  studentId: number;
  jobId: number;
  message: string;
}) {
  const res = await api.post<ApiResponse<SendInvitation>>("/application/invitation", data);
  return res.data;
}
