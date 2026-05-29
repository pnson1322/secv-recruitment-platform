import { api } from "@/lib/axios";
import { ApiResponse, Admin, CreateAdminParams } from "../types/admin.types";

export async function getAllAdmins() {
    const response = await api.get<ApiResponse<Admin[]>>("/auth/admins");
    return response.data;
}

export async function createAdmin(params: CreateAdminParams) {
    const response = await api.post("/auth/admins", params);
    return response.data;
}

export async function deleteAdmin(id: number) {
    const response = await api.delete(`/auth/admins/${id}`);
    return response.data;
}