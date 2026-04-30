"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  Application,
  ApplicationStatus,
  CandidateTab,
  Invitation,
  ResultSubFilter,
  ApplicationStatsResponse,
  InvitationStatsResponse,
} from "../types/candidate.types";
import type { CategoryItem } from "../../job-postings/types/job-postings.types";
import {
  getApplications,
  getApplicationStats,
  getInvitations,
  getInvitationStats,
} from "../api/candidate.api";
import { getCategoriesList } from "../../job-postings/api/job-postings.api";
import { useDebounce } from "@/hooks/useDebounce";

export function useCandidatesPage() {
  const [tab, setTab] = useState<CandidateTab>("all");
  const [resultFilter, setResultFilter] = useState<ResultSubFilter>("all");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  
  const [positionFilter, setPositionFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  
  const [appStats, setAppStats] = useState<ApplicationStatsResponse | null>(null);
  const [invStats, setInvStats] = useState<InvitationStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    
    let dateRange: "7days" | "30days" | undefined = undefined;
    if (dateFilter === "7_days") dateRange = "7days";
    else if (dateFilter === "30_days") dateRange = "30days";

    let status: ApplicationStatus | ApplicationStatus[] | undefined = undefined;
    if (tab === "pending") status = "submitted";
    else if (tab === "approved") status = "interviewing";
    else if (tab === "result") {
      if (resultFilter === "passed") status = "passed";
      else if (resultFilter === "rejected") status = "rejected";
      else status = ["passed", "rejected"];
    }

    const categoryId = positionFilter === "all" ? undefined : Number(positionFilter);

    const commonParams = {
      dateRange,
      page,
      limit: 10,
      search: debouncedSearch,
      categoryId,           
    };

    try {
      if (tab === "invited") {
        try {
          const res = await getInvitations({
            page,
            limit: 10,
            categoryId,
            dateRange,
            search: debouncedSearch,
            status: undefined,
          });
          const invsData = res.data;
          
          if (invsData?.meta) {
            setTotalPages(invsData.meta.totalPages);
            setTotalItems(invsData.meta.totalItems);
            setInvitations(invsData.data || []);
          } else {
            setTotalPages(1);
            setTotalItems(Array.isArray(invsData) ? invsData.length : 0);
            setInvitations(Array.isArray(invsData) ? invsData : (invsData?.data || []));
          }
        } catch (e) {
          setInvitations([]);
          setTotalPages(1);
          setTotalItems(0);
          throw e;
        }
        setApplications([]);
      } else {
        try {
          const res = await getApplications({
            ...commonParams,
            status,
          });
          const appsData = res.data;
          
          let fetchedApps = [];
          if (appsData?.meta) {
            setTotalPages(appsData.meta.totalPages);
            setTotalItems(appsData.meta.totalItems);
            fetchedApps = appsData.data || [];
          } else {
            setTotalPages(1);
            setTotalItems(Array.isArray(appsData) ? appsData.length : 0);
            fetchedApps = Array.isArray(appsData) ? appsData : (appsData?.data || []);
          }
          
          setApplications(fetchedApps);
        } catch (e) {
          setApplications([]);
          setTotalPages(1);
          setTotalItems(0);
          throw e;
        }
        setInvitations([]);
      }

      const [appStatsRes, invStatsRes, categoriesRes] = await Promise.allSettled([
        getApplicationStats(),
        getInvitationStats(),
        getCategoriesList(),
      ]);

      if (appStatsRes.status === "fulfilled" && appStatsRes.value.success) {
        setAppStats(appStatsRes.value.data);
      }
      if (invStatsRes.status === "fulfilled" && invStatsRes.value.success) {
        setInvStats(invStatsRes.value.data);
      }
      if (categoriesRes.status === "fulfilled" && categoriesRes.value.data) {
        setCategories(categoriesRes.value.data);
      }
      
    } catch (error) {
      console.error("Fetch candidates error:", error);
      setIsError(true);
      setApplications([]);
      setInvitations([]);
    } finally {
      setIsLoading(false);
    }
  }, [tab, resultFilter, dateFilter, page, debouncedSearch, positionFilter]);

  useEffect(() => {
    setPage(1);
  }, [tab, dateFilter, resultFilter, debouncedSearch, positionFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tabCounts = useMemo(() => {
    return {
      total: appStats?.total ?? 0,
      pending: appStats?.byStatus.submitted ?? 0,
      approved: appStats?.byStatus.interviewing ?? 0,
      result: (appStats?.byStatus.passed ?? 0) + (appStats?.byStatus.rejected ?? 0),
      invited: invStats?.total ?? 0,
    };
  }, [appStats, invStats]);

  const resultStats = useMemo(() => {
    return {
      total: (appStats?.byStatus.passed ?? 0) + (appStats?.byStatus.rejected ?? 0),
      passed: appStats?.byStatus.passed ?? 0,
      failed: appStats?.byStatus.rejected ?? 0,
    };
  }, [appStats]);

  return {
    tab,
    setTab,
    resultFilter,
    setResultFilter,
    search,
    setSearch,
    positionFilter,
    setPositionFilter,
    dateFilter,
    setDateFilter,
    categories,
    applications, 
    invitations,  
    invStats,
    tabCounts,
    resultStats,
    isLoading,
    isError,
    page,
    setPage,
    totalPages,
    totalItems,
    refetch: fetchData,
  };
}
