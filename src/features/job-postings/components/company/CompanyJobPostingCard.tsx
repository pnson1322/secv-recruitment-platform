"use client";

import Image from "next/image";
import { BriefcaseBusiness, CalendarDays, MapPin, Wallet } from "lucide-react";
import type { JobPostingCardAdminCompanyItem } from "../../types/job-postings.types";
import {
  formatRelativeDate,
  formatSalary,
  getJobPostingStatusMeta,
  getJobPostingTagMeta,
} from "../../utils/job-postings.utils";

type Props = {
  item: JobPostingCardAdminCompanyItem;
  onViewDetail?: (jobId: number) => void;
};

export default function CompanyJobPostingCard({ item, onViewDetail }: Props) {
  const statusMeta = getJobPostingStatusMeta(item.status);
  const tagMeta = getJobPostingTagMeta(item.tag);

  return (
    <article className="flex flex-col h-full rounded-3xl border border-(--color-border) bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-(--color-accent)">
      <div className="flex flex-1 flex-col">
        <div className="flex items-start gap-4">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-(--color-surface) text-(--color-muted)">
            {item.logoUrl ? (
              <Image
                src={item.logoUrl}
                alt={item.companyName}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <BriefcaseBusiness size={30} />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="line-clamp-1 text-[17px] font-bold text-(--color-text)">
              {item.jobTitle}
            </h3>
            <p className="mt-1 text-[15px] text-(--color-accent)">
              {item.companyName}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-(--color-muted)">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} />
            {item.city || "Chưa cập nhật"}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Wallet size={15} />
            {formatSalary({
              salaryMin: item.salaryMin,
              salaryMax: item.salaryMax,
              salaryType: item.salaryType,
              isSalaryNegotiable: item.isSalaryNegotiable,
            })}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={15} />
            {formatRelativeDate(item.createdAt)}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[13px] font-semibold ${tagMeta.className}`}
          >
            {tagMeta.label}
          </span>

          <span
            className={`inline-flex rounded-full px-3 py-1 text-[13px] font-semibold ${statusMeta.className}`}
          >
            {statusMeta.label}
          </span>
        </div>

        <div className="mt-4 mb-5 flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <span
              key={skill.skillId}
              className="rounded-full bg-(--color-surface) px-3 py-1 text-[13px] text-(--color-muted)"
            >
              {skill.skillName}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-(--color-border)">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[14px] text-(--color-muted)">
              {item.applicantCount} ứng viên
            </span>

            <button
              type="button"
              onClick={() => onViewDetail?.(item.jobId)}
              className="rounded-2xl bg-(--color-accent) px-5 py-2.5 text-[15px] font-semibold text-white transition hover:brightness-95"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
