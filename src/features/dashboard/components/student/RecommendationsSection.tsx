"use client";

import { useState } from "react";
import { Sparkles, HelpCircle } from "lucide-react";
import { useJobRecommendations } from "@/features/job-postings/hooks/useJobRecommendations";
import StudentJobCard from "@/features/job-postings/components/student/StudentJobCard";
import type { JobPostingCardStudentItem, SalaryType, JobRecommendation } from "@/features/job-postings/types/job-postings.types";

export default function RecommendationsSection() {
  const [limit, setLimit] = useState(4);
  const { data: recommendationsRes, isLoading, isError, isFetching } = useJobRecommendations({ limit });
  const recommendations = recommendationsRes?.data || [];

  const SkeletonCard = () => (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-xs animate-pulse">
      <div className="flex gap-4">
        <div className="h-16 w-16 shrink-0 rounded-xl bg-slate-100" />
        <div className="space-y-2 flex-1">
          <div className="h-4.5 w-3/4 bg-slate-200 rounded-lg" />
          <div className="h-3 w-1/2 bg-slate-100 rounded-lg" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3.5 w-full bg-slate-50 rounded-sm" />
        <div className="h-3.5 w-2/3 bg-slate-50 rounded-sm" />
      </div>
      <div className="mt-6 flex gap-2">
        <div className="h-[42px] w-[42px] bg-slate-100 rounded-xl" />
        <div className="h-[42px] flex-1 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );

  if (isError || (recommendations.length === 0 && !isLoading && !isFetching)) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-cyan-50 p-2 text-cyan-600">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Phù hợp với bạn</h3>
            <p className="text-[13px] text-slate-400">Gợi ý việc làm phù hợp với kỹ năng</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-xs">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
            <HelpCircle size={24} />
          </div>
          <h4 className="text-[15px] font-bold text-slate-700">Chưa có gợi ý phù hợp</h4>
          <p className="mt-1 max-w-sm text-xs text-slate-400 leading-relaxed">
            Hãy cập nhật đầy đủ thông tin kỹ năng, ngành nghề trong hồ sơ cá nhân để hệ thống AI gợi ý chính xác hơn nhé!
          </p>
        </div>
      </div>
    );
  }

  const showInitialSkeleton = isLoading && recommendations.length === 0;
  const skeletonCount = isFetching ? Math.max(0, limit - recommendations.length) : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="rounded-xl bg-cyan-50 p-2 text-cyan-600">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Phù hợp với bạn</h3>
          <p className="text-[13px] text-slate-400">Dựa trên hồ sơ và kỹ năng của bạn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {recommendations.map((rec) => {
          const adaptedJob: JobPostingCardStudentItem = {
            jobId: rec.jobId,
            companyId: rec.companyId,
            companyName: rec.companyName,
            logoUrl: rec.logoUrl,
            jobTitle: rec.jobTitle,
            city: rec.city,
            salaryMin: rec.salaryMin,
            salaryMax: rec.salaryMax,
            salaryType: rec.salaryType as SalaryType,
            isSalaryNegotiable: rec.isSalaryNegotiable,
            postedAt: rec.postedAt,
            applicantCount: (rec as JobRecommendation & { applicantCount?: number }).applicantCount ?? 0,
            skills: rec.skills,
            saved: rec.saved,
          };

          return <StudentJobCard key={adaptedJob.jobId} job={adaptedJob} />;
        })}

        {showInitialSkeleton && [...Array(4)].map((_, idx) => <SkeletonCard key={`init-${idx}`} />)}

        {skeletonCount > 0 && [...Array(skeletonCount)].map((_, idx) => <SkeletonCard key={`more-${idx}`} />)}
      </div>

      {recommendations.length >= limit && !isFetching && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setLimit((prev) => prev + 4)}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-2.5 text-[14px] font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 cursor-pointer"
          >
            <Sparkles size={16} className="text-cyan-500" />
            Xem thêm gợi ý
          </button>
        </div>
      )}
    </div>
  );
}
