"use client";

import { BriefcaseBusiness, Users, Star, UserCheck } from "lucide-react";

type StatsProps = {
  stats?: {
    totalJobs: number;
    totalApplications: number;
    totalReviews: number;
    totalHired: number;
  };
};

export default function RecruiterStatsGrid({ stats }: StatsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold tracking-wide text-slate-500 uppercase">
              Tin tuyển dụng
            </p>
            <h3 className="mt-2 text-3xl font-black text-slate-800 tracking-tight">
              {stats?.totalJobs || 0}
            </h3>
          </div>
          <div className="rounded-2xl bg-blue-50 p-3.5 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            <BriefcaseBusiness size={24} />
          </div>
        </div>
        <p className="mt-4 text-[13px] text-slate-400">
          Tin tuyển dụng đang hoạt động
        </p>
      </div>

      <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold tracking-wide text-slate-500 uppercase">
              Tổng lượt ứng tuyển
            </p>
            <h3 className="mt-2 text-3xl font-black text-slate-800 tracking-tight">
              {stats?.totalApplications || 0}
            </h3>
          </div>
          <div className="rounded-2xl bg-cyan-50 p-3.5 text-cyan-600 transition-colors group-hover:bg-cyan-600 group-hover:text-white">
            <Users size={24} />
          </div>
        </div>
        <p className="mt-4 text-[13px] text-slate-400">
          Hồ sơ ứng viên đã nhận được
        </p>
      </div>

      <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold tracking-wide text-slate-500 uppercase">
              Số lượt đánh giá
            </p>
            <h3 className="mt-2 text-3xl font-black text-slate-800 tracking-tight">
              {stats?.totalReviews || 0}
            </h3>
          </div>
          <div className="rounded-2xl bg-amber-50 p-3.5 text-amber-500 transition-colors group-hover:bg-amber-500 group-hover:text-white">
            <Star size={24} />
          </div>
        </div>
        <p className="mt-4 text-[13px] text-slate-400">
          Nhận xét từ các ứng viên
        </p>
      </div>

      <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md hover:border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-semibold tracking-wide text-slate-500 uppercase">
              Đã tuyển thành công
            </p>
            <h3 className="mt-2 text-3xl font-black text-slate-800 tracking-tight">
              {stats?.totalHired || 0}
            </h3>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-3.5 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
            <UserCheck size={24} />
          </div>
        </div>
        <p className="mt-4 text-[13px] text-slate-400">
          Ứng viên đã đạt trạng thái &quot;Passed&quot;
        </p>
      </div>
    </div>
  );
}
