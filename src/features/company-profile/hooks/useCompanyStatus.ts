"use client";

import { useState } from "react";
import { toast } from "sonner";
import { changeStatusCompany } from "../api/company.api";
import { CompanyStatus } from "../types/company.types";

export function useCompanyStatus(companyId: number, onStatusChanged?: () => void) {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [statusModal, setStatusModal] = useState<{
    open: boolean;
    mode: "REJECTED" | "RESTRICTED";
  }>({ open: false, mode: "REJECTED" });

  const handleChangeStatus = async (status: CompanyStatus, reason?: string) => {
    if (status === "REJECTED" || status === "RESTRICTED") {
      if (!reason) {
        setStatusModal({ open: true, mode: status });
        return;
      }
    }

    try {
      setIsStatusLoading(true);
      await changeStatusCompany(companyId, {
        status,
        admin_note: reason,
      });
      toast.success("Cập nhật trạng thái công ty thành công");
      setStatusModal((prev) => ({ ...prev, open: false }));
      onStatusChanged?.();
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái công ty");
    } finally {
      setIsStatusLoading(false);
    }
  };

  const closeStatusModal = () => {
    setStatusModal((prev) => ({ ...prev, open: false }));
  };

  return {
    isStatusLoading,
    statusModal,
    handleChangeStatus,
    closeStatusModal,
  };
}
