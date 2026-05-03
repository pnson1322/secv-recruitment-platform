"use client";

import { useState } from "react";
import { useStudentStats } from "../../hooks/useStudentStats";
import { useStudentListAdmin } from "../../hooks/useStudentListAdmin";
import StudentStatsCards from "./StudentStatsCards";
import StudentFilters from "./StudentFilters";
import StudentTable from "./StudentTable";
import Pagination from "@/components/Pagination";

export default function StudentManagementPage() {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    status: "",
    keyword: "",
  });

  const { data: stats, isLoading: isStatsLoading } = useStudentStats();
  const { data: studentRes, isLoading: isListLoading } = useStudentListAdmin(params);

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (keyword: string) => {
    setParams((prev) => ({ ...prev, keyword, page: 1 }));
  };

  const handleFilterStatus = (status: string) => {
    setParams((prev) => ({ ...prev, status, page: 1 }));
  };

  const handleReset = () => {
    setParams({
      page: 1,
      limit: 10,
      status: "",
      keyword: "",
    });
  };

  return (
    <div className="space-y-8 px-12 py-5 max-w-[1600px] mx-auto">
      <div className="space-y-7">
        <StudentStatsCards stats={stats} isLoading={isStatsLoading} />
        <StudentFilters 
          onSearch={handleSearch}
          onFilterStatus={handleFilterStatus}
          onReset={handleReset}
          currentStatus={params.status}
          currentKeyword={params.keyword}
        />
      </div>

      <div className="space-y-6">
        <StudentTable 
          students={studentRes?.data ?? []} 
          isLoading={isListLoading} 
        />

          {studentRes?.meta && studentRes.meta.totalPages > 1 && (
            <div className="flex justify-center py-4">
              <Pagination
                currentPage={studentRes.meta.currentPage}
                totalPages={studentRes.meta.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
  );
}
