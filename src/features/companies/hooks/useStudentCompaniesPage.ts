import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCompaniesForStudent, StudentGetCompanyParams } from "@/features/company-profile/api/company.api";

export function useStudentCompaniesPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [scale, setScale] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  const params: StudentGetCompanyParams = {
    page,
    limit,
    search: search || undefined,
    location: location || undefined,
    scale: scale || undefined,
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["student-companies", params],
    queryFn: () => getCompaniesForStudent(params),
    placeholderData: (previousData) => previousData,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    companies: data?.data?.data ?? [],
    meta: data?.data?.meta ?? null,
    isLoading,
    isError,
    search,
    setSearch,
    location,
    setLocation,
    scale,
    setScale,
    page,
    setPage: handlePageChange,
    refetch,
  };
}
