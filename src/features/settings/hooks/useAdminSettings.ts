"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getAllAdmins, createAdmin, deleteAdmin } from "../api/admin.api";

export function useAdminSettings() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; email: string } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    data: responseData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admins"],
    queryFn: getAllAdmins,
  });

  const admins = responseData?.data || [];

  const createAdminMutation = useMutation({
    mutationFn: createAdmin,
    onSuccess: (res) => {
      toast.success(res?.message || "Thêm tài khoản admin mới thành công");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      setIsAddOpen(false);
    },
    onError: (err: unknown) => {
      const responseData = (err as { response?: { data?: { message?: unknown; error?: unknown } } })?.response?.data;
      let message = "Không thể thêm tài khoản admin";
      
      if (typeof responseData?.message === "string") {
        message = responseData.message;
      } else if (Array.isArray(responseData?.message)) {
        message = (responseData.message[0] as string) || message;
      } else if (typeof responseData?.message === "object" && responseData?.message !== null) {
        const msgObj = responseData.message as { message?: string; error?: string };
        message = msgObj.message || msgObj.error || message;
      } else if (responseData?.error && typeof responseData.error === "string") {
        message = responseData.error;
      }
      
      toast.error(message);
    },
  });

  const deleteAdminMutation = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: (res) => {
      toast.success(res?.message || "Xóa tài khoản admin thành công");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      setDeleteTarget(null);

      const updatedTotal = admins.length - 1;
      if (updatedTotal <= 10) {
        setCurrentPage(1);
      } else {
        const totalPages = Math.ceil(updatedTotal / pageSize);
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
        }
      }
    },
    onError: (err: unknown) => {
      const responseData = (err as { response?: { data?: { message?: unknown; error?: unknown } } })?.response?.data;
      let message = "Không thể xóa tài khoản admin";
      
      if (typeof responseData?.message === "string") {
        message = responseData.message;
      } else if (Array.isArray(responseData?.message)) {
        message = (responseData.message[0] as string) || message;
      } else if (typeof responseData?.message === "object" && responseData?.message !== null) {
        const msgObj = responseData.message as { message?: string; error?: string };
        message = msgObj.message || msgObj.error || message;
      } else if (responseData?.error && typeof responseData.error === "string") {
        message = responseData.error;
      }
      
      toast.error(message);
    },
  });

  const formatDate = (value: string | undefined | null) => {
    if (!value) return "Chưa đăng nhập";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const showPagination = admins.length > 10;
  const totalPages = showPagination ? Math.ceil(admins.length / pageSize) : 1;
  const startIndex = showPagination ? (currentPage - 1) * pageSize : 0;
  const paginatedAdmins = showPagination
    ? admins.slice(startIndex, startIndex + pageSize)
    : admins;

  const handlePageChange = (page: number) => {
    if (showPagination && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    user,

    admins,
    isLoading,
    isError,
    refetch,

    isAddOpen,
    setIsAddOpen,
    isAddingAdmin: createAdminMutation.isPending,
    handleAddAdmin: async (values: { email: string; password?: string }) => {
      await createAdminMutation.mutateAsync({
        email: values.email,
        password: values.password || "",
        confirmPassword: values.password || "",
      });
    },

    deleteTarget,
    setDeleteTarget,
    isDeletingAdmin: deleteAdminMutation.isPending,
    handleDeleteAdmin: (id: number) => {
      deleteAdminMutation.mutate(id);
    },

    currentPage,
    totalPages,
    paginatedAdmins,
    handlePageChange,
    showPagination,

    formatDate,
  };
}
