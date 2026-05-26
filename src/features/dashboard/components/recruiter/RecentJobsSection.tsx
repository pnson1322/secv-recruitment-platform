"use client";

import { ArrowRight } from "lucide-react";
import type { JobPostingCardAdminCompanyItem } from "@/features/job-postings/types/job-postings.types";
import CompanyJobPostingCard from "@/features/job-postings/components/company/CompanyJobPostingCard";

type Props = {
  recentJobs: JobPostingCardAdminCompanyItem[];
  onViewDetail: (jobId: number) => void;
  onSeeAll: () => void;
};

export default function RecentJobsSection({
  recentJobs,
  onViewDetail,
  onSeeAll,
}: Props) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Tin tuyển dụng gần đây
          </h2>
          <p className="text-[14px] text-slate-400">
            Danh sách các tin tuyển dụng mới nhất được đăng tải
          </p>
        </div>
        <button
          type="button"
          onClick={onSeeAll}
          className="group inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-slate-800 to-slate-900 px-5 py-2.5 text-[14px] font-bold text-white shadow-xs transition-all hover:shadow-md hover:brightness-110 active:scale-98"
        >
          Xem tất cả
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>

      {recentJobs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-xs">
          <h3 className="text-[17px] font-bold text-slate-700">
            Chưa có tin tuyển dụng nào được tạo
          </h3>
          <p className="mt-2 text-[14px] text-slate-400 max-w-sm mx-auto">
            Bắt đầu thu hút nhân tài bằng cách đăng tin tuyển dụng đầu tiên của công ty bạn ngay hôm nay.
          </p>
          <button
            type="button"
            onClick={onSeeAll}
            className="mt-5 inline-flex items-center gap-1.5 rounded-2xl bg-(--color-accent) px-5 py-2.5 text-[14px] font-bold text-white transition hover:brightness-95"
          >
            Đăng tin tuyển dụng
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {recentJobs.map((item) => (
            <CompanyJobPostingCard
              key={item.jobId}
              item={item}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      )}
    </div>
  );
}
