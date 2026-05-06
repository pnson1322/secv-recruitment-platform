import { useQuery } from "@tanstack/react-query";
import { getSavedJobPostings } from "@/features/job-postings/api/job-postings.api";
import type { JobPostingCardsParams } from "@/features/job-postings/types/job-postings.types";

export function useStudentSavedJobs(params: JobPostingCardsParams) {
  return useQuery({
    queryKey: ["student-saved-jobs", params],
    queryFn: () => getSavedJobPostings(params),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
  });
}
