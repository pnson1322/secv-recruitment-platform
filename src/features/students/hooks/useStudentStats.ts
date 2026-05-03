"use client";

import { useQuery } from "@tanstack/react-query";
import { getStudentGeneralStats } from "../api/student.api";

export function useStudentStats() {
  return useQuery({
    queryKey: ["admin-student-stats"],
    queryFn: () => getStudentGeneralStats(),
    select: (res) => res.data,
  });
}
