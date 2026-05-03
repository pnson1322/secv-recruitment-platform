"use client";

import { useQuery } from "@tanstack/react-query";
import { getStudentListForAdmin } from "../api/student.api";
import type { StudentListParams } from "../types/student.types";

export function useStudentListAdmin(params: StudentListParams) {
  return useQuery({
    queryKey: ["admin-students", params],
    queryFn: () => getStudentListForAdmin(params),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
  });
}
