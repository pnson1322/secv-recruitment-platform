"use client";

import React from "react";

export default function JobModerationSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="h-14 w-14 rounded-2xl bg-slate-100 animate-pulse" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-slate-100 animate-pulse rounded-md" />
                <div className="h-4 w-24 bg-slate-50 animate-pulse rounded-md" />
              </div>
            </div>
            <div className="h-6 w-20 bg-slate-100 animate-pulse rounded-full" />
          </div>

          <div className="space-y-3 py-2">
            <div className="h-4 w-full bg-slate-50 animate-pulse rounded-md" />
            <div className="h-4 w-2/3 bg-slate-50 animate-pulse rounded-md" />
            <div className="h-4 w-1/2 bg-slate-50 animate-pulse rounded-md" />
          </div>

          <div className="h-11 w-full bg-slate-100 animate-pulse rounded-xl" />
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <div className="h-10 bg-slate-50 animate-pulse rounded-xl" />
            <div className="h-10 bg-slate-50 animate-pulse rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
