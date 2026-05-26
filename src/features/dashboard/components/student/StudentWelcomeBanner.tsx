"use client";

import { useApplicationStats } from "@/features/applications/hooks/useApplicationStats";
import { FileText, Calendar, CheckCircle2, XCircle } from "lucide-react";

export default function StudentWelcomeBanner() {
  const { data: statsRes, isLoading: isStatsLoading } = useApplicationStats();
  const stats = statsRes?.data;

  if (isStatsLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 w-full">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[76px] w-full animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 w-full">
      <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition hover:shadow-md">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <FileText size={20} />
        </div>
        <div>
          <div className="text-[13px] font-medium text-slate-400">Đã ứng tuyển</div>
          <div className="text-xl font-bold text-slate-800">{stats?.total || 0}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition hover:shadow-md">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
          <Calendar size={20} />
        </div>
        <div>
          <div className="text-[13px] font-medium text-slate-400">Phỏng vấn</div>
          <div className="text-xl font-bold text-slate-800">{stats?.byStatus?.interviewing || 0}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition hover:shadow-md">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <div className="text-[13px] font-medium text-slate-400">Đã tuyển chọn</div>
          <div className="text-xl font-bold text-slate-800">{stats?.byStatus?.passed || 0}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs transition hover:shadow-md">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
          <XCircle size={20} />
        </div>
        <div>
          <div className="text-[13px] font-medium text-slate-400">Bị từ chối</div>
          <div className="text-xl font-bold text-slate-800">{stats?.byStatus?.rejected || 0}</div>
        </div>
      </div>
    </div>
  );
}
