"use client";

import { Clock3, MapPin, Wallet } from "lucide-react";
import { toast } from "sonner";
import type { Role } from "@/features/auth/constants/roles";
import type { JobPostingDataItem } from "@/features/job-postings/types/job-postings.types";
import { getJobPostingStatusMeta } from "@/features/job-postings/utils/job-postings.utils";

type Props = {
  job: JobPostingDataItem;
  viewerRole: Role;
  onViewDetail: (jobId: number) => void;
};

export default function CompanyJobCard({
  job,
  viewerRole,
  onViewDetail,
}: Props) {
  const isStudent = viewerRole === "STUDENT";
  const hasStatus = typeof job.status === "string" && job.status.length > 0;
  const statusMeta = hasStatus ? getJobPostingStatusMeta(job.status) : null;

  const salaryText =
    job.isSalaryNegotiable || job.salaryType === "NEGOTIABLE"
      ? "Thỏa thuận"
      : formatSalaryRange(job.salaryMin, job.salaryMax);

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-[16.5px] font-semibold text-slate-900 md:text-[17.5px]">
              {job.jobTitle}
            </h3>

            {!isStudent && statusMeta ? (
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-[12px] font-semibold ${statusMeta.className}`}
              >
                {statusMeta.label}
              </span>
            ) : null}
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] leading-6 text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-400" />
              {job.city || "Chưa cập nhật"}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Wallet size={14} className="text-slate-400" />
              {salaryText}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} className="text-slate-400" />
              {formatDate(job.applicationDeadline)}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          {isStudent ? (
            <button
              type="button"
              onClick={() => toast.info("Chưa có API ứng tuyển")}
              className="rounded-lg border border-(--color-accent) bg-cyan-50 px-4 py-2 text-[14px] font-semibold text-(--color-accent) shadow-sm transition hover:bg-(--color-accent) hover:text-white hover:shadow-md"
            >
              Ứng tuyển
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => onViewDetail(job.jobId)}
            className="rounded-lg bg-(--color-accent) px-4 py-2 text-[14px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:brightness-95 hover:shadow-md"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

function formatSalaryRange(
  salaryMin: number | null | undefined,
  salaryMax: number | null | undefined,
) {
  if (salaryMin == null || salaryMax == null) {
    return "Chưa cập nhật";
  }

  return `${formatMoney(salaryMin)} - ${formatMoney(salaryMax)}`;
}

function formatMoney(value: number) {
  return `${new Intl.NumberFormat("vi-VN").format(value)} VNĐ`;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
  }).format(date);
}
