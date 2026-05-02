import {
  ApiResponse,
  ApplicationData,
  ApplicationParams,
  PostBody,
  ApplicationStats,
  ApplicationPagination,
  InvitationPagination,
  InvitationParams,
  RespondInvitationBody,
  InvitationStats,
} from "../types/application.types";
import { api } from "@/lib/axios";

export const createApplication = async (body: PostBody) => {
  const response = await api.post<ApiResponse<ApplicationData>>(
    "/application",
    body,
  );
  return response.data;
};

export const getApplications = async (params: ApplicationParams) => {
  const { page = 1, limit = 10, status } = params;

  const response = await api.get<ApiResponse<ApplicationPagination>>(
    "/application/me",
    { params: { page, limit, status } },
  );
  return response.data;
};

export const getApplicationStats = async () => {
  const response = await api.get<ApiResponse<ApplicationStats>>(
    "/application/me/stats",
  );
  return response.data;
};

export const getInvitations = async (params: InvitationParams) => {
  const { page = 1, limit = 10, ...rest } = params;

  const response = await api.get<ApiResponse<InvitationPagination>>(
    "/application/me/invitations",
    { params: { page, limit, ...rest } },
  );
  return response.data;
};

export const respondToInvitation = async (
  invitationId: number,
  body: RespondInvitationBody,
) => {
  const response = await api.patch<ApiResponse<Record<string, never>>>(
    `/application/me/invitations/${invitationId}/respond`,
    body,
  );
  return response.data;
};

export const getInvitationStats = async () => {
  const response = await api.get<ApiResponse<InvitationStats>>(
    "/application/student/invitation/stats",
  );
  return response.data;
};
