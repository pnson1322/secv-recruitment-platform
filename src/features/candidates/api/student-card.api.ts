import { api } from "@/lib/axios";
import type {
  GetStudentCardsParams,
  StudentCardListResponse,
} from "../types/student-card.types";
import type { ApiResponse } from "../types/candidate.types";

export async function getStudentCards(
  params: GetStudentCardsParams = {},
): Promise<StudentCardListResponse> {
  const {
    page = 1,
    limit = 4,
    search,
    majorId,
    years,
    skillIds,
    isOpenToWork,
  } = params;

  const query = new URLSearchParams();

  query.append("page", String(page));
  query.append("limit", String(limit));

  if (search?.trim()) {
    query.append("search", search.trim());
  }

  if (typeof majorId === "number") {
    query.append("majorId", String(majorId));
  }

  if (Array.isArray(years) && years.length > 0) {
    years.forEach((year) => {
      query.append("years", String(year));
    });
  }

  if (Array.isArray(skillIds) && skillIds.length > 0) {
    skillIds.forEach((skillId) => {
      query.append("skillIds", String(skillId));
    });
  }

  if (typeof isOpenToWork === "boolean") {
    query.append("isOpenToWork", String(isOpenToWork));
  }

  const res = await api.get<StudentCardListResponse>(
    `/student/card?${query.toString()}`,
  );

  return res.data;
}
export async function getMajors(): Promise<ApiResponse<{ majorId: number; majorName: string }[]>> {
  const res = await api.get<ApiResponse<{ majorId: number; majorName: string }[]>>(
    "/student/majors",
  );
  return res.data;
}
