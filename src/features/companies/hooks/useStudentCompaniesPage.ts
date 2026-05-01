import { useCallback, useEffect, useState } from "react";
import { getCompaniesForStudent, StudentGetCompanyParams } from "@/features/company-profile/api/company.api";
import { StudentCompanyDataPart, StudentPaginationMeta } from "@/features/company-profile/types/company.types";

export function useStudentCompaniesPage() {
  const [companies, setCompanies] = useState<StudentCompanyDataPart[]>([]);
  const [meta, setMeta] = useState<StudentPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [scale, setScale] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const params: StudentGetCompanyParams = {
        page,
        limit,
        search: search || undefined,
        location: location || undefined,
        scale: scale || undefined,
      };
      const res = await getCompaniesForStudent(params);
      if (res.success && res.data) {
        setCompanies(res.data.data);
        setMeta(res.data.meta);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, location, scale]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    companies,
    meta,
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
    refetch: fetchCompanies,
  };
}
