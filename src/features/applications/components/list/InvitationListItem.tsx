"use client";

import Link from "next/link";
import { Mail, DollarSign, MapPin, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import { formatSalary } from "@/features/job-postings/utils/job-postings.utils";
import type { InvitationItem } from "../../types/application.types";

type Props = {
  invitation: InvitationItem;
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
};

export default function InvitationListItem({ invitation, onAccept, onReject }: Props) {
  const isPending = invitation.status === "pending";
  const isAccepted = invitation.status === "accepted";
  const isRejected = invitation.status === "rejected";
  const isExpired = invitation.status === "expired";

  const statusConfig = {
    pending: { label: "Chờ phản hồi", className: "bg-amber-50 text-amber-600 border-amber-100" },
    accepted: { label: "Đã chấp nhận", className: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    rejected: { label: "Đã từ chối", className: "bg-rose-50 text-rose-600 border-rose-100" },
    expired: { label: "Hết hạn", className: "bg-slate-100 text-slate-500 border-slate-200" },
  };

  const config = statusConfig[invitation.status] || statusConfig.pending;

  const salaryText = formatSalary({
    salaryMin: invitation.job.salaryMin,
    salaryMax: invitation.job.salaryMax,
    salaryType: invitation.job.salaryType as any,
    isSalaryNegotiable: invitation.job.isSalaryNegotiable,
  });

  return (
    <div className="group overflow-hidden rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-cyan-200 hover:shadow-md">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <Link href={`/jobs-detail/${invitation.job.jobId}`} className="flex gap-4 flex-1 group/link">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-100 transition-transform group-hover/link:scale-105">
              <Mail size={28} />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[18px] font-bold text-slate-900 group-hover/link:text-cyan-600 transition-colors">
                {invitation.job.jobTitle}
              </h3>
              <p className="font-medium text-slate-600">{invitation.company.companyName}</p>
              
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <DollarSign size={14} className="text-amber-500" />
                  <span>{salaryText}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-rose-400" />
                  <span>{invitation.job.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-400" />
                  <span>Gửi: {new Date(invitation.createdAt).toLocaleDateString("vi-VN")}</span>
                </div>
              </div>
            </div>
          </Link>

          <span className={`self-start rounded-full border px-4 py-1 text-[12px] font-bold ${config.className}`}>
            {config.label}
          </span>
        </div>

        <div className="rounded-2xl bg-slate-50/80 p-4 border border-slate-50">
          <p className="text-[14px] leading-relaxed text-slate-600 italic">
            "{invitation.message}"
          </p>
        </div>

        <div className="mt-2">
          {isPending && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => onAccept?.(invitation.invitationId)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-[14px] font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-700 hover:shadow-emerald-200"
              >
                <CheckCircle2 size={18} />
                Chấp nhận
              </button>
              <button
                onClick={() => onReject?.(invitation.invitationId)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-rose-100 bg-white py-3 text-[14px] font-bold text-rose-600 transition-all hover:border-rose-200 hover:bg-rose-50"
              >
                <XCircle size={18} />
                Từ chối
              </button>
            </div>
          )}

          {isAccepted && (
            <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100 flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 text-emerald-500" size={18} />
              <p className="text-[14px] font-bold text-emerald-700">
                Đã chấp nhận lời mời. <span className="font-normal opacity-80">Công ty sẽ liên hệ với bạn sớm để bắt đầu quá trình phỏng vấn.</span>
              </p>
            </div>
          )}

          {isRejected && (
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-3 text-slate-500">
              <XCircle className="mt-0.5" size={18} />
              <p className="text-[14px] font-medium">Bạn đã từ chối lời mời này.</p>
            </div>
          )}

          {isExpired && (
            <div className="rounded-2xl bg-rose-50/50 p-4 border border-rose-100/50 flex items-start gap-3 text-rose-500">
              <Clock className="mt-0.5" size={18} />
              <p className="text-[14px] font-medium italic">Lời mời này đã hết hạn đăng ký.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
