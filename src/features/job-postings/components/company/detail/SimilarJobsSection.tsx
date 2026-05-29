"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useJobRecommendations } from "../../../hooks/useJobRecommendations";
import { formatSalary } from "../../../utils/job-postings.utils";
import { MapPin, Sparkles, BriefcaseBusiness } from "lucide-react";

export default function SimilarJobsSection() {
  const router = useRouter();
  const { data, isLoading } = useJobRecommendations({ limit: 4 });
  const jobs = data?.data || [];

  console.log(data);

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
        <h3 className="text-[18px] font-bold text-(--color-text)">
          Việc làm phù hợp với bạn
        </h3>
        <div className="mt-5 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 rounded-2xl border border-(--color-border) p-4">
              <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-100" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (jobs.length === 0) return null;

  return (
    <section className="rounded-3xl border border-(--color-border) bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50">
          <Sparkles className="h-4 w-4 text-amber-500" />
        </div>
        <h3 className="text-[18px] font-bold text-(--color-text)">
          Việc làm phù hợp với bạn
        </h3>
      </div>

      <div className="mt-5 space-y-4">
        {jobs.map((job) => (
          <div
            key={job.jobId}
            onClick={() => router.push(`/jobs-detail/${job.jobId}`)}
            className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-(--color-border) p-4 transition-all hover:border-(--color-primary) hover:bg-slate-50/50 hover:shadow-md active:scale-[0.98]"
          >
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 text-slate-400 group-hover:bg-white transition-colors">
              {job.logoUrl ? (
                <Image
                  src={job.logoUrl}
                  alt={job.companyName}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform group-hover:scale-110"
                />
              ) : (
                <BriefcaseBusiness size={24} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <p className="truncate text-[16px] font-bold text-(--color-text) group-hover:text-(--color-primary) transition-colors">
                  {job.jobTitle}
                </p>
                <p className="shrink-0 text-[15px] font-bold text-(--color-accent)">
                  {formatSalary({
                    salaryMin: job.salaryMin,
                    salaryMax: job.salaryMax,
                    salaryType: job.salaryType as "RANGE" | "NEGOTIABLE",
                    isSalaryNegotiable: job.isSalaryNegotiable,
                  })}
                </p>
              </div>
              
              <p className="mt-1 text-[14px] font-medium text-(--color-muted) truncate">
                {job.companyName}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <div className="flex items-center gap-1 text-[13px] text-(--color-muted)">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{job.city}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="text-[13px] text-(--color-muted)">
                    {job.postedAt}
                  </span>
                </div>
              </div>

              {job.skills && job.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill.skillId}
                      className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 transition-colors group-hover:bg-white group-hover:border group-hover:border-slate-200"
                    >
                      {skill.skillName}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="text-[11px] font-medium text-slate-400">
                      +{job.skills.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
