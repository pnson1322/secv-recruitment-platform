"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  Application,
  ApplicationStatus,
  CandidateTab,
  ResultSubFilter,
  ApplicationStatsResponse,
} from "@/features/candidates/types/candidate.types";
import {
  getApplications,
  getApplicationStats,
} from "@/features/candidates/api/candidate.api";
import { useDebounce } from "@/hooks/useDebounce";

export type JobApplicantTab = "all" | "submitted" | "interviewing" | "passed" | "rejected";

export function useJobApplicants(jobId: number, enabled = true) {
  const [tab, setTab] = useState<JobApplicantTab>("all");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [appStats, setAppStats] = useState<ApplicationStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    if (!jobId || !enabled) return;
    
    setIsLoading(true);
    setIsError(false);
    
    let status: ApplicationStatus | ApplicationStatus[] | undefined = undefined;
    if (tab !== "all") {
      status = tab as ApplicationStatus;
    }

    try {
      const [appsRes, statsRes] = await Promise.all([
        getApplications({
          jobId,
          page,
          limit: 10,
          search: debouncedSearch,
          status,
        }),
        getApplicationStats({ jobId }),
      ]);

      if (appsRes.success) {
        const appsData = appsRes.data;
        if (appsData?.meta) {
          setTotalPages(appsData.meta.totalPages);
          setTotalItems(appsData.meta.totalItems);
          setApplications(appsData.data || []);
        } else {
          setTotalPages(1);
          setTotalItems(Array.isArray(appsData) ? appsData.length : 0);
          setApplications(Array.isArray(appsData) ? appsData : (appsData?.data || []));
        }
      }

      if (statsRes.success) {
        setAppStats(statsRes.data);
      }
      
    } catch (error) {
      console.error("Fetch job applicants error:", error);
      setIsError(true);
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  }, [jobId, tab, page, debouncedSearch, enabled]);

  useEffect(() => {
    setPage(1);
  }, [tab, debouncedSearch]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [fetchData, enabled]);

  const tabCounts = useMemo(() => {
    return {
      all: appStats?.total ?? 0,
      submitted: appStats?.byStatus.submitted ?? 0,
      interviewing: appStats?.byStatus.interviewing ?? 0,
      passed: appStats?.byStatus.passed ?? 0,
      rejected: appStats?.byStatus.rejected ?? 0,
    };
  }, [appStats]);

  return {
    tab,
    setTab,
    search,
    setSearch,
    applications,
    tabCounts,
    isLoading,
    isError,
    page,
    setPage,
    totalPages,
    totalItems,
    refetch: fetchData,
  };
}
