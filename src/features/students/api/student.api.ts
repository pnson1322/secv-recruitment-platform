import { api } from "@/lib/axios";
import { StudentProfile } from "../types/student.types";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function getStudentProfile(studentId: number): Promise<StudentProfile> {
  const res = await api.get<ApiResponse<StudentProfile>>(`/student/${studentId}`);
  return res.data.data;
}
