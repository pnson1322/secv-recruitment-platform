"use client";

import { useState } from "react";
import { useAdminJobPostingStats } from "../hooks/useAdminJobPostingStats";
import { useAdminJobPostings } from "../hooks/useAdminJobPostings";
import { JobPostingCardsParams, JobPostingStatus } from "../types/job-postings.types";

export function useJobModerationPage() {
  const [params, setParams] = useState<JobPostingCardsParams>({
    page: 1,
    limit: 9,
    search: "",
    status: "",
    city: "",
  });

  const { 
    data: statsRes, 
    isLoading: isStatsLoading, 
    isError: isStatsError, 
    refetch: refetchStats 
  } = useAdminJobPostingStats();
  
  const { 
    data: listRes, 
    isLoading: isListLoading, 
    isError: isListError, 
    refetch: refetchList 
  } = useAdminJobPostings(params);
  
  const stats = statsRes?.data;
  const jobs = listRes?.data?.data || [];
  const meta = listRes?.data?.meta;

  const handleSearch = (keyword: string) => {
    setParams((prev) => ({ ...prev, search: keyword, page: 1 }));
  };

  const handleFilterStatus = (status: string) => {
    setParams((prev) => ({ ...prev, status: status as JobPostingStatus | "", page: 1 }));
  };

  const handleFilterCity = (city: string) => {
    setParams((prev) => ({ ...prev, city, page: 1 }));
  };

  const handleReset = () => {
    setParams({
      page: 1,
      limit: 9,
      search: "",
      status: "",
      city: "",
    });
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAnyError = isStatsError || isListError;
  
  const handleRetry = () => {
    refetchStats();
    refetchList();
  };

  return {
    params,
    stats,
    jobs,
    meta,
    isStatsLoading,
    isListLoading,
    isListError,
    isStatsError,
    isAnyError,
    handleSearch,
    handleFilterStatus,
    handleFilterCity,
    handleReset,
    handlePageChange,
    handleRetry,
  };
}
