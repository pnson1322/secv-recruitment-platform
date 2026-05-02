"use client";

import CompanySectionCard from "./CompanySectionCard";

export default function CompanyReviewsSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <CompanySectionCard>
        <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
          <div className="text-center lg:text-left space-y-3">
            <div className="h-12 w-16 mx-auto lg:mx-0 bg-slate-200 rounded-lg" />
            <div className="flex justify-center lg:justify-start gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-5 w-5 bg-slate-100 rounded-full" />
              ))}
            </div>
            <div className="h-4 w-24 mx-auto lg:mx-0 bg-slate-100 rounded" />
          </div>

          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className="grid grid-cols-[48px_1fr_52px] items-center gap-4"
              >
                <div className="h-4 w-10 bg-slate-100 rounded" />
                <div className="h-2.5 rounded-full bg-slate-200 w-full" />
                <div className="h-4 w-8 bg-slate-100 rounded ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </CompanySectionCard>

      <CompanySectionCard>
        <div className="h-7 w-48 bg-slate-200 rounded-lg mb-2" />
        <div className="h-4 w-36 bg-slate-100 rounded mb-8" />

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-white px-5 py-5 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                  <div className="h-3 w-24 bg-slate-100 rounded" />
                </div>
                <div className="space-y-1">
                    <div className="flex gap-1 justify-end">
                        {[1,2,3,4,5].map(s => <div key={s} className="h-3 w-3 bg-slate-100 rounded-full" />)}
                    </div>
                    <div className="h-3 w-20 bg-slate-100 rounded ml-auto" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-50 rounded" />
                <div className="h-4 w-11/12 bg-slate-50 rounded" />
                <div className="h-4 w-4/5 bg-slate-50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </CompanySectionCard>
    </div>
  );
}
