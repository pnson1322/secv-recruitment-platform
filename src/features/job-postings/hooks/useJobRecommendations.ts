import { useQuery } from "@tanstack/react-query";
import { getJobRecommendations } from "../api/job-postings.api";
import { JobRecommendationsParams } from "../types/job-postings.types";

export function useJobRecommendations(params: JobRecommendationsParams = {}) {
  return useQuery({
    queryKey: ["job-recommendations", params],
    queryFn: () => getJobRecommendations(params),
  });
}
