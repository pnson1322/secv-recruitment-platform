import { api } from "@/lib/axios";
import { StudentProfile, ApiResponse, EvaluationBody, EvaluationResponse } from "../types/student.types";

export async function getStudentProfile(studentId: number) {
  const res = await api.get<ApiResponse<StudentProfile>>(`/student/${studentId}`);
  return res.data.data;
}

export async function createEvaluation(body: EvaluationBody) {
  const res = await api.post<ApiResponse<EvaluationResponse>>("/comments", body);
  return res.data;
}
