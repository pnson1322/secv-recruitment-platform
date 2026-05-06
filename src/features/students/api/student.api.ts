import { api } from "@/lib/axios";
import {
  StudentProfile,
  ApiResponse,
  EvaluationBody,
  EvaluationResponse,
  UploadResumeResponse,
  MyProfile,
  UpdateStudentInfoBody,
  StudentGeneralStats,
  StudentAdminListItem,
  StudentListParams,
} from "../types/student.types";

export async function getStudentGeneralStats() {
  const res = await api.get<ApiResponse<StudentGeneralStats>>("/student/general");
  return res.data;
}

export async function getStudentListForAdmin(params: StudentListParams) {
  const {page = 1, limit = 10, status, keyword } = params
  const res = await api.get<ApiResponse<{ data: StudentAdminListItem[]; meta: any }>>("/student", {
    params: {page, limit, status: status || undefined, keyword: keyword || undefined}
  });
  return res.data;
}

export async function getStudentProfile(studentId: number) {
  const res = await api.get<ApiResponse<StudentProfile>>(
    `/student/${studentId}`,
  );
  return res.data.data;
}

export async function getMyProfile() {
  const res = await api.get<ApiResponse<MyProfile>>("/student/me");
  return res.data.data;
}

export async function createEvaluation(body: EvaluationBody) {
  const res = await api.post<ApiResponse<EvaluationResponse>>(
    "/comments",
    body,
  );
  return res.data;
}

export async function patchJobStatus(body: { isOpenToWork: boolean }) {
  const res = await api.patch<ApiResponse<Record<string, never>>>(
    "/student/me/job-status",
    body,
  );
  return res.data;
}

export async function putSkills(body: { skillIds: number[] }) {
  const res = await api.put<ApiResponse<Record<string, never>>>(
    "/student/me/skills",
    body,
  );
  return res.data;
}

export async function uploadResume(cvFile: File, resumeName?: string) {
  const formData = new FormData();
  formData.append("cvFile", cvFile);
  if (resumeName) {
    formData.append("resumeName", resumeName);
  }

  const res = await api.post<ApiResponse<UploadResumeResponse>>(
    "/student/me/resumes",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
}

export async function setDefaultResume(resumeId: number) {
  const res = await api.patch<ApiResponse<UploadResumeResponse>>(
    `/student/me/resumes/${resumeId}/default`,
  );
  return res.data;
}

export async function updateAvatar(avatarFile: File) {
  const formData = new FormData();
  formData.append("avatar", avatarFile);

  const res = await api.patch<ApiResponse<{ avatarUrl: string }>>(
    "/student/me/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
}

export async function updateStudentInfo(body: UpdateStudentInfoBody) {
  const res = await api.patch<ApiResponse<Record<string, never>>>(
    "/student/me/info",
    body,
  );
  return res.data;
}

export async function deleteResume(resumeId: number) {
  const res = await api.delete<ApiResponse<Record<string, never>>>(
    `/student/me/resumes/${resumeId}`,
  );
  return res.data;
}

export async function updateStudentActiveStatus(studentId: number, isActive: boolean) {
  const res = await api.patch<ApiResponse<Record<string, never>>>(
    `/student/${studentId}/active`,
    { isActive }
  );
  return res.data;
}
