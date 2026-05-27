import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getJobPostingCardsForStudent } from "../api/job-postings.api";
import { JobPostingCardsParams } from "../types/job-postings.types";

export function useJobPostingCardsForStudent(params: JobPostingCardsParams) {
  return useQuery({
    queryKey: ["job-posting-cards-student", params],
    queryFn: () => getJobPostingCardsForStudent(params),
    placeholderData: keepPreviousData,
  });
}
