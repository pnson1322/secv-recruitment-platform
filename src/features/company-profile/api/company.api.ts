import { api } from "@/lib/axios";
import type {
  AdminCompanyListData,
  ApiResponse,
  BasicInfoBody,
  ChangeStatusBody,
  CompanyProfile,
  CompanyStatus,
  ContactBody,
  DetailBody,
  EmptyBody,
  StudentCompanyListData,
} from "../types/company.types";

// for Company:
export async function getMyCompany() {
  const res = await api.get<ApiResponse<CompanyProfile>>("/company/me");
  return res.data;
}

export async function getCompanyById(id: string) {
  const res = await api.get<ApiResponse<CompanyProfile>>(`/company/${id}`);
  return res.data;
}

export async function updateBasicInfoCompany(payload: BasicInfoBody) {
  const res = await api.patch<ApiResponse<EmptyBody>>(
    "/company/basic-info",
    payload,
  );
  return res.data;
}

export async function updateDescriptionCompany(payload: {
  description: string;
}) {
  const res = await api.patch<ApiResponse<EmptyBody>>(
    "/company/description",
    payload,
  );
  return res.data;
}

export async function updateContactCompany(payload: ContactBody) {
  const res = await api.patch<ApiResponse<EmptyBody>>(
    "/company/contact",
    payload,
  );
  return res.data;
}

export async function updateDetailCompany(payload: DetailBody) {
  const res = await api.patch<ApiResponse<EmptyBody>>(
    "/company/detail",
    payload,
  );
  return res.data;
}

export async function updataLogoCompany(file: File) {
  const formData = new FormData();
  formData.append("logo", file);

  const res = await api.patch<ApiResponse<EmptyBody>>(
    "/company/logo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
}

export async function updataCoverImageCompany(file: File) {
  const formData = new FormData();
  formData.append("coverImage", file);

  const res = await api.patch<ApiResponse<EmptyBody>>(
    "/company/cover-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
}

export async function updataOfficeImagesCompany(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const res = await api.patch<ApiResponse<EmptyBody>>(
    "/company/office-images",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
}

export async function deleteOfficeImage(id: string) {
  const res = await api.delete<ApiResponse<EmptyBody>>(
    `/company/office-images/${id}`,
  );
  return res.data;
}

// for Admin:
type AdminGetCompanyParams = {
  page?: number;
  limit?: number;
  status?: CompanyStatus;
};

export async function getCompaniesForAdmin(params: AdminGetCompanyParams = {}) {
  const { page = 1, limit = 10, status } = params;

  const res = await api.get<ApiResponse<AdminCompanyListData>>(
    "/company/all/admin",
    {
      params: { page, limit, status },
    },
  );

  return res.data;
}

export async function changeStatusCompany(
  id: number,
  payload: ChangeStatusBody,
) {
  const res = await api.patch<ApiResponse<EmptyBody>>(
    `/company/${id}/status/admin`,
    payload,
  );
  return res.data;
}

// for Student:
export type StudentGetCompanyParams = {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  scale?: string;
};

export async function getCompaniesForStudent(
  params: StudentGetCompanyParams = {},
) {
  const { page = 1, limit = 10, search, location, scale } = params;

  const res = await api.get<ApiResponse<StudentCompanyListData>>(
    "/company/all/user",
    {
      params: { page, limit, search, location, scale },
    },
  );

  return res.data;
}
