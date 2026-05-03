"use client";

import { useQuery } from "@tanstack/react-query";
import { getJobPostingCardsForAdmin } from "../api/job-postings.api";
import { JobPostingCardsParams } from "../types/job-postings.types";

export function useAdminJobPostings(params: JobPostingCardsParams) {
  return useQuery({
    queryKey: ["job-postings", "admin", "list", params],
    queryFn: () => getJobPostingCardsForAdmin(params),
    placeholderData: (previousData) => previousData,
  });
}
