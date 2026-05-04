"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getCompaniesForAdmin, changeStatusCompany } from "../api/company.api";
import { CompanyStatus, ChangeStatusBody } from "../types/company.types";
import { toast } from "sonner";

export function useCompanyMonitoring() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<CompanyStatus | undefined>(undefined);
  const [search, setSearch] = useState("");
  const limit = 9;

  const { data, isLoading, isError, isPlaceholderData, refetch } = useQuery({
    queryKey: ["admin-companies", page, status, search],
    queryFn: () => getCompaniesForAdmin({ page, limit, status, search }),
    placeholderData: (prev) => prev,
  });

  const changeStatusMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ChangeStatusBody }) =>
      changeStatusCompany(id, payload),
    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["admin-companies"] });
    },
    onError: () => {
      toast.error("Không thể cập nhật trạng thái");
    },
  });

  return {
    companies: data?.data?.data ?? [],
    statusStats: data?.data?.status ?? [],
    meta: data?.data?.meta,
    isLoading,
    isError,
    refetch,
    isPlaceholderData,
    page,
    setPage,
    status,
    setStatus,
    search,
    setSearch,
    changeStatusMutation,
  };
}
