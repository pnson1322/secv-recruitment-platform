import { useQuery } from "@tanstack/react-query";
import { getFollowedCompanies } from "@/features/company-profile/api/company.api";
import type { StudentGetCompanyParams } from "@/features/company-profile/api/company.api";

export function useStudentFollowedCompanies(params: StudentGetCompanyParams) {
  return useQuery({
    queryKey: ["student-followed-companies", params],
    queryFn: () => getFollowedCompanies(params),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
  });
}
