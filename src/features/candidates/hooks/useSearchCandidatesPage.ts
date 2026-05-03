"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ROLES } from "@/features/auth/constants/roles";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import {
  getJobPostingsListByCompanyId,
  getSkillList,
} from "@/features/job-postings/api/job-postings.api";
import type { JobPostingDataItem } from "@/features/job-postings/types/job-postings.types";
import { getApiErrorMessage } from "@/utils/api-error";
import { sendInvitation } from "../api/candidate.api";
import { getStudentCards, getMajors } from "../api/student-card.api";
import type {
  SearchCandidatesFiltersValue,
  StudentCardItem,
  StudentCardYearValue,
} from "../types/student-card.types";

function createDefaultFilters(): SearchCandidatesFiltersValue {
  return {
    search: "",
    majorId: "",
    years: [],
    minGpa: 0,
    skillIds: [],
    isOpenToWork: true,
  };
}

function getPageSizeFromWidth(width: number): number {
  if (width < 768) return 3;
  return 6;
}

function buildDefaultInviteMessage(studentName: string, jobTitle: string) {
  return `Chào ${studentName}, công ty bên mình thấy hồ sơ của bạn phù hợp với vị trí ${jobTitle}. Nếu bạn quan tâm, bên mình rất mong có cơ hội trao đổi thêm với bạn.`;
}

export function useSearchCandidatesPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] =
    useState<SearchCandidatesFiltersValue>(createDefaultFilters());
  const [appliedFilters, setAppliedFilters] =
    useState<SearchCandidatesFiltersValue>(createDefaultFilters());

  const [selectedProfileStudentId, setSelectedProfileStudentId] = useState<
    number | null
  >(null);
  const [candidateToInvite, setCandidateToInvite] =
    useState<StudentCardItem | null>(null);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviteError, setInviteError] = useState<string | null>(null);

  useEffect(() => {
    const updatePageSize = () => {
      setPageSize(getPageSizeFromWidth(window.innerWidth));
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);

    return () => {
      window.removeEventListener("resize", updatePageSize);
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const companyQuery = useCompanyProfile({ 
    viewerRole: user?.role === ROLES.RECRUITER ? ROLES.RECRUITER : undefined,
    companyId: undefined 
  });
  const companyId = companyQuery.data?.data?.companyId;

  const skillsQuery = useQuery({
    queryKey: ["candidate-search-skills"],
    queryFn: getSkillList,
    staleTime: 1000 * 60 * 5,
  });

  const majorsQuery = useQuery({
    queryKey: ["candidate-search-majors"],
    queryFn: getMajors,
    staleTime: 1000 * 60 * 60,
  });

  const jobsQuery = useQuery({
    queryKey: ["candidate-search-jobs", companyId],
    enabled: typeof companyId === "number",
    staleTime: 1000 * 60,
    queryFn: async () => {
      if (typeof companyId !== "number") {
        throw new Error("companyId is required");
      }

      return getJobPostingsListByCompanyId({
        companyId,
        page: 1,
        limit: 100,
      });
    },
  });

  const approvedJobs = useMemo(() => {
    const jobs = jobsQuery.data?.data?.data ?? [];

    return jobs.filter(
      (job): job is JobPostingDataItem => job.status === "approved",
    );
  }, [jobsQuery.data]);

  const cardsQuery = useQuery({
    queryKey: ["student-cards", appliedFilters, page, pageSize],
    queryFn: () =>
      getStudentCards({
        page,
        limit: pageSize,
        search: appliedFilters.search.trim() || undefined,
        majorId: appliedFilters.majorId
          ? Number(appliedFilters.majorId)
          : undefined,
        years: appliedFilters.years.length ? appliedFilters.years : undefined,
        minGpa: appliedFilters.minGpa,
        skillIds: appliedFilters.skillIds.length
          ? appliedFilters.skillIds
          : undefined,
        isOpenToWork: appliedFilters.isOpenToWork ? true : undefined,
      }),
  });

  const inviteMutation = useMutation({
    mutationFn: (payload: {
      studentId: number;
      jobId: number;
      message: string;
    }) => sendInvitation(payload),
    onSuccess: () => {
      toast.success("Đã gửi lời mời ứng tuyển");
      setCandidateToInvite(null);
      setSelectedJobId("");
      setInviteMessage("");
      setInviteError(null);
    },
    onError: (error) => {
      const message = getApiErrorMessage(error);
      setInviteError(message);
      toast.error(message);
    },
  });

  const totalPages = cardsQuery.data?.data.meta.totalPages ?? 1;
  const totalItems = cardsQuery.data?.data.meta.totalItems ?? 0;
  const candidates = cardsQuery.data?.data.data ?? [];
  const skills = skillsQuery.data?.data ?? [];
  const majorOptions = useMemo(() => {
    const data = majorsQuery.data?.data ?? [];
    return data.map((m) => ({
      label: m.majorName,
      value: String(m.majorId),
    }));
  }, [majorsQuery.data]);

  const inviteDisabledReason = useMemo(() => {
    if (companyQuery.isLoading || jobsQuery.isLoading) {
      return "Đang tải danh sách tin tuyển dụng...";
    }

    if (companyQuery.isError || jobsQuery.isError) {
      return "Không tải được danh sách tin tuyển dụng để gửi lời mời.";
    }

    if (approvedJobs.length === 0) {
      return "Bạn chưa có tin tuyển dụng đã được duyệt để mời ứng viên.";
    }

    return null;
  }, [
    approvedJobs.length,
    companyQuery.isError,
    companyQuery.isLoading,
    jobsQuery.isError,
    jobsQuery.isLoading,
  ]);

  const activeAppliedFiltersCount = useMemo(() => {
    let count = 0;

    if (appliedFilters.search.trim()) count += 1;
    if (appliedFilters.majorId) count += 1;
    if (appliedFilters.years.length > 0) count += 1;
    if (appliedFilters.minGpa > 0) count += 1;
    if (appliedFilters.skillIds.length > 0) count += 1;
    if (appliedFilters.isOpenToWork) count += 1;

    return count;
  }, [appliedFilters]);

  const updateSearch = (value: string) => {
    setDraftFilters((prev) => ({ ...prev, search: value }));
  };

  const updateMajorId = (value: string) => {
    setDraftFilters((prev) => ({ ...prev, majorId: value }));
  };

  const toggleYear = (year: StudentCardYearValue) => {
    setDraftFilters((prev) => ({
      ...prev,
      years: prev.years.includes(year)
        ? prev.years.filter((item) => item !== year)
        : [...prev.years, year],
    }));
  };

  const updateMinGpa = (value: number) => {
    setDraftFilters((prev) => ({ ...prev, minGpa: value }));
  };

  const toggleSkill = (skillId: number) => {
    setDraftFilters((prev) => ({
      ...prev,
      skillIds: prev.skillIds.includes(skillId)
        ? prev.skillIds.filter((item) => item !== skillId)
        : [...prev.skillIds, skillId],
    }));
  };

  const updateOpenToWork = (checked: boolean) => {
    setDraftFilters((prev) => ({ ...prev, isOpenToWork: checked }));
  };

  const applyFilters = () => {
    setAppliedFilters({
      ...draftFilters,
      search: draftFilters.search.trim(),
    });
    setPage(1);
    setMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    const nextFilters = createDefaultFilters();
    setDraftFilters(nextFilters);
    setAppliedFilters(nextFilters);
    setPage(1);
    setMobileFiltersOpen(false);
  };

  const openInviteModal = (candidate: StudentCardItem) => {
    if (inviteDisabledReason || approvedJobs.length === 0) {
      toast.error(inviteDisabledReason || "Không thể gửi lời mời lúc này");
      return;
    }

    const defaultJob = approvedJobs[0];

    setCandidateToInvite(candidate);
    setSelectedJobId(String(defaultJob.jobId));
    setInviteMessage(
      buildDefaultInviteMessage(candidate.fullName, defaultJob.jobTitle),
    );
    setInviteError(null);
  };

  const closeInviteModal = () => {
    if (inviteMutation.isPending) return;

    setCandidateToInvite(null);
    setSelectedJobId("");
    setInviteMessage("");
    setInviteError(null);
  };

  const submitInvite = async () => {
    if (!candidateToInvite) return;

    if (!selectedJobId) {
      const message = "Vui lòng chọn tin tuyển dụng";
      setInviteError(message);
      toast.error(message);
      return;
    }

    const trimmedMessage = inviteMessage.trim();

    if (!trimmedMessage) {
      setInviteError("Vui lòng nhập lời nhắn gửi tới sinh viên");
      return;
    }

    setInviteError(null);

    await inviteMutation.mutateAsync({
      studentId: candidateToInvite.studentId,
      jobId: Number(selectedJobId),
      message: trimmedMessage,
    });
  };

  return {
    page,
    setPage,
    pageSize,
    totalPages,
    totalItems,
    candidates,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    draftFilters,
    updateSearch,
    updateMajorId,
    toggleYear,
    updateMinGpa,
    toggleSkill,
    updateOpenToWork,
    applyFilters,
    clearFilters,
    activeAppliedFiltersCount,
    skills,
    skillsError: skillsQuery.isError
      ? "Không tải được danh sách kỹ năng"
      : null,
    isSkillsLoading: skillsQuery.isLoading,
    majorOptions,
    isMajorsLoading: majorsQuery.isLoading,
    isLoading: cardsQuery.isLoading,
    isError: cardsQuery.isError,
    isFetching: cardsQuery.isFetching,
    refetch: cardsQuery.refetch,
    selectedProfileStudentId,
    setSelectedProfileStudentId,
    candidateToInvite,
    selectedJobId,
    setSelectedJobId,
    inviteMessage,
    setInviteMessage,
    inviteError,
    approvedJobs,
    inviteDisabledReason,
    openInviteModal,
    closeInviteModal,
    submitInvite,
    isSubmittingInvite: inviteMutation.isPending,
  };
}
