"use client";

import Image from "next/image";
import {
  BriefcaseBusiness,
  CalendarDays,
  Eye,
  EyeOff,
  Loader2,
  MapPin,
  Pencil,
  Users,
  Wallet,
  Check,
  X,
  ShieldAlert,
  Bookmark,
} from "lucide-react";
import type {
  JobPostingStatus,
  JobPostingTag,
} from "../../../types/job-postings.types";

type Props = {
  viewerRole: string;
  status: JobPostingStatus;
  tag: JobPostingTag;
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string | null;
  city?: string | null;
  salaryText: string;
  postedAtText: string;
  deadlineText: string;
  isExpired?: boolean;
  isExpiringSoon?: boolean;
  applicantCount: number;
  statusLabel: string;
  statusClassName: string;
  tagLabel: string;
  tagClassName: string;
  isLoading?: boolean;
  isClosed?: boolean;
  isSaved?: boolean;
  onEdit: () => void;
  onHide: () => void;
  onViewApplicants: () => void;
  onApply: () => void;
  onSave: () => void;
  onApprove: () => void;
  onReject: () => void;
  onRestrict: () => void;
  onReapprove: () => void;
};

export default function JobPostingDetailHeader({
  viewerRole,
  status,
  tag,
  jobTitle,
  companyName,
  companyLogoUrl,
  city,
  salaryText,
  postedAtText,
  deadlineText,
  isExpired = false,
  isExpiringSoon = false,
  applicantCount,
  statusLabel,
  statusClassName,
  tagLabel,
  tagClassName,
  isLoading = false,
  isClosed = false,
  isSaved = false,
  onEdit,
  onHide,
  onViewApplicants,
  onApply,
  onSave,
  onApprove,
  onReject,
  onRestrict,
  onReapprove,
}: Props) {
  const isCompany = viewerRole === "COMPANY";
  const isAdmin = viewerRole === "ADMIN";
  const isStudent = viewerRole === "STUDENT";
  const isHidden = tag === "Hidden";
  const canToggleVisible =
    isCompany && status === "approved" && tag !== "Closed";

  return (
    <section className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
      <div className="flex gap-5">
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-(--color-border) bg-(--color-surface) text-(--color-muted)">
          {companyLogoUrl ? (
            <Image
              src={companyLogoUrl}
              alt={companyName}
              fill
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <BriefcaseBusiness size={32} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-[25px] font-bold leading-tight text-(--color-text) md:text-[29px]">
            {jobTitle}
          </h1>

          <p className="mt-2 text-[16px] font-semibold text-(--color-accent)">
            {companyName}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-(--color-muted)">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} />
              {city || "Chưa cập nhật"}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Wallet size={16} />
              {salaryText}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={16} />
              {postedAtText}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={16} />
              Hạn: {deadlineText}
            </span>

            {isExpired ? (
              <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-[12px] font-semibold text-rose-700">
                Đã hết hạn
              </span>
            ) : null}

            {!isExpired && isExpiringSoon && isStudent ? (
              <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-[12px] font-semibold text-amber-700">
                Sắp hết hạn
              </span>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[13px] font-semibold ${statusClassName}`}
            >
              {statusLabel}
            </span>

            {isCompany || isAdmin ? (
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[13px] font-semibold ${tagClassName}`}
              >
                {tagLabel}
              </span>
            ) : null}

            {!isStudent ? (
              <span className="inline-flex items-center gap-1.5 text-[14px] text-(--color-muted)">
                <Users size={16} />
                {applicantCount} ứng viên
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-(--color-border) pt-5">
        {isCompany ? (
          <div className="grid gap-3 md:grid-cols-3">
            <button
              type="button"
              onClick={onEdit}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--color-accent) px-5 py-3 text-[15px] font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Pencil size={18} />
              )}
              Chỉnh sửa
            </button>

            <button
              type="button"
              onClick={onHide}
              disabled={isLoading || !canToggleVisible}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-(--color-border) bg-white px-5 py-3 text-[15px] font-semibold text-(--color-text) transition hover:bg-slate-50 disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : isHidden ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
              {isHidden ? "Hiện tin" : "Ẩn tin"}
            </button>

            <button
              type="button"
              onClick={onViewApplicants}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-(--color-accent) bg-white px-5 py-3 text-[15px] font-semibold text-(--color-accent) transition hover:bg-cyan-50"
            >
              <Users size={18} />
              Xem ứng viên
            </button>
          </div>
        ) : null}

        {isAdmin ? (
          <div className="grid gap-3 md:grid-cols-3">
            {status === "pending" ? (
              <>
                <button
                  type="button"
                  onClick={onApprove}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-60"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Check size={18} />
                  )}
                  Phê duyệt
                </button>

                <button
                  type="button"
                  onClick={onReject}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                >
                  <X size={18} />
                  Từ chối
                </button>
              </>
            ) : null}

            {status === "approved" ? (
              <button
                type="button"
                onClick={onRestrict}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
              >
                <ShieldAlert size={18} />
                Hạn chế
              </button>
            ) : null}

            {status === "restricted" || status === "rejected" ? (
              <button
                type="button"
                onClick={onReapprove}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Check size={18} />
                )}
                Duyệt lại
              </button>
            ) : null}
          </div>
        ) : null}

        {isStudent ? (
          <div className="grid gap-3 md:grid-cols-2">
            <button
              type="button"
              onClick={onApply}
              disabled={isExpired || isClosed}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-(--color-accent) px-5 py-3 text-[15px] font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
            >
              <Check size={18} />
              {isExpired || isClosed ? "Đã hết hạn ứng tuyển" : "Ứng tuyển ngay"}
            </button>

            <button
              type="button"
              onClick={onSave}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-[15px] font-semibold transition ${
                isSaved
                  ? "border-amber-100 bg-amber-50 text-amber-600 hover:bg-amber-100"
                  : "border-(--color-accent) bg-white text-(--color-accent) hover:bg-cyan-50"
              }`}
            >
              <Bookmark size={18} className={isSaved ? "fill-amber-600" : ""} />
              {isSaved ? "Đã lưu" : "Lưu tin"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
