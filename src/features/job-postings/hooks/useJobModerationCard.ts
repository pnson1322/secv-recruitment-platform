import { useState } from "react";
import { usePatchJobPostingMutation } from "../hooks/usePatchJobPostingMutation";
import { JobPostingCardAdminCompanyItem } from "../types/job-postings.types";

export function useJobModerationCard(jobId: number) {
  const mutation = usePatchJobPostingMutation(jobId);
  const [modalMode, setModalMode] = useState<"reject" | "restrict" | null>(null);

  const getStatusBadge = (status: string | undefined) => {
    if (!status) return { label: "N/A", className: "bg-slate-50 text-slate-400 border-slate-100" };
    
    switch (status) {
      case "pending":
        return { label: "Chờ duyệt", className: "bg-amber-50 text-amber-600 border-amber-100" };
      case "approved":
        return { label: "Hoạt động", className: "bg-emerald-50 text-emerald-600 border-emerald-100" };
      case "rejected":
        return { label: "Rớt", className: "bg-red-50 text-red-600 border-red-100" };
      case "restricted":
        return { label: "Bị hạn chế", className: "bg-slate-100 text-slate-600 border-slate-200" };
      default:
        return { label: status.toUpperCase(), className: "bg-slate-50 text-slate-600 border-slate-100" };
    }
  };

  const formatSalary = (job: JobPostingCardAdminCompanyItem) => {
    if (job.isSalaryNegotiable) return "Thỏa thuận";
    if (job.salaryMin && job.salaryMax) {
      return `${(job.salaryMin / 1000000).toFixed(0)}-${(job.salaryMax / 1000000).toFixed(0)} triệu VNĐ`;
    }
    return "Mức lương hấp dẫn";
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    if (dateString.includes("ngày") || dateString.includes("giờ") || dateString.includes("tháng")) {
      return dateString;
    }
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString("vi-VN");
  };

  const handleAction = (action: "approve" | "reject" | "restrict") => {
    if (action === "approve") {
      mutation.mutate({
        action: "approve",
        payload: { status: "approved" }
      });
    } else {
      setModalMode(action);
    }
  };

  const confirmAction = (reason: string) => {
    if (!modalMode) return;
    
    mutation.mutate({
      action: modalMode,
      payload: { 
        status: modalMode === "reject" ? "rejected" : "restricted",
        admin_note: reason
      }
    }, {
      onSuccess: () => setModalMode(null)
    });
  };

  return {
    isPending: mutation.isPending,
    modalMode,
    getStatusBadge,
    formatSalary,
    formatDate,
    handleAction,
    confirmAction,
    closeModal: () => setModalMode(null)
  };
}
