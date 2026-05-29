"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Banknote, Calendar, Eye, CheckCircle, Ban, AlertCircle, RefreshCcw } from "lucide-react";
import { useJobModerationCard } from "../../hooks/useJobModerationCard";
import JobPostingModerationModal from "../company/detail/JobPostingModerationModal";
import { JobPostingCardAdminCompanyItem } from "../../types/job-postings.types";

type Props = {
  job: JobPostingCardAdminCompanyItem;
};

export default function JobModerationCard({ job }: Props) {
  const { 
    isPending, 
    modalMode, 
    getStatusBadge, 
    formatSalary, 
    formatDate, 
    handleAction, 
    confirmAction, 
    closeModal 
  } = useJobModerationCard(job.jobId);
  
  const statusInfo = getStatusBadge(job.status);

  return (
    <div className="group relative flex flex-col rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">
            {job.logoUrl ? (
              <img src={job.logoUrl} alt={job.companyName} className="h-full w-full object-cover" />
            ) : (
              <div className="text-slate-300"><Eye size={24} /></div>
            )}
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-slate-900 leading-snug group-hover:text-cyan-600 transition-colors line-clamp-1">
              {job.jobTitle}
            </h3>
            <p className="text-[13px] font-medium text-slate-500 line-clamp-1">{job.companyName}</p>
          </div>
        </div>
        <div className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${statusInfo.className} border whitespace-nowrap`}>
          {statusInfo.label}
        </div>
      </div>

      <div className="space-y-2.5 mb-6">
        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
          <MapPin size={16} className="text-slate-400" />
          <span>{job.city || "Toàn quốc"}</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
          <Banknote size={16} className="text-slate-400" />
          <span>{formatSalary(job)}</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
          <Calendar size={16} className="text-slate-400" />
          <span>{formatDate(job.applicationDeadline || (job as { postedAt?: string }).postedAt || job.createdAt)}</span>
        </div>
      </div>

      <Link
        href={`/jobs-detail/${job.jobId}`}
        className="mb-3 flex h-11 items-center justify-center rounded-xl bg-cyan-500 text-[14px] font-bold text-white transition hover:bg-cyan-600 active:scale-95"
      >
        Xem chi tiết
      </Link>

      <div className="grid grid-cols-2 gap-3">
        {job.status === "pending" && (
          <>
            <button 
              onClick={() => handleAction("approve")}
              disabled={isPending}
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-[13px] font-bold text-white transition hover:bg-emerald-600 active:scale-95 disabled:opacity-50"
            >
              <CheckCircle size={16} />
              Duyệt
            </button>
            <button 
              onClick={() => handleAction("reject")}
              disabled={isPending}
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-red-500 text-[13px] font-bold text-white transition hover:bg-red-600 active:scale-95 disabled:opacity-50"
            >
              <AlertCircle size={16} />
              Từ chối
            </button>
          </>
        )}

        {job.status === "approved" && (
          <button 
            onClick={() => handleAction("restrict")}
            disabled={isPending}
            className="col-span-2 flex h-10 items-center justify-center gap-2 rounded-xl bg-orange-500 text-[13px] font-bold text-white transition hover:bg-orange-600 active:scale-95 disabled:opacity-50"
          >
            <Ban size={16} />
            Hạn chế
          </button>
        )}

        {(job.status === "rejected" || job.status === "restricted") && (
          <button 
            onClick={() => handleAction("approve")}
            disabled={isPending}
            className="col-span-2 flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-[13px] font-bold text-white transition hover:bg-emerald-700 active:scale-95 disabled:opacity-50"
          >
            <RefreshCcw size={16} />
            Duyệt lại
          </button>
        )}
      </div>

      <JobPostingModerationModal
        open={!!modalMode}
        mode={modalMode || "reject"}
        onClose={closeModal}
        onConfirm={confirmAction}
        isLoading={isPending}
      />
    </div>
  );
}
