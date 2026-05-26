"use client";

import { Building2, ShieldCheck } from "lucide-react";
import type { AdminTopCompanyStat } from "../../types/dashboard.types";

type Props = {
  companies: AdminTopCompanyStat[];
};

export default function TopCompaniesList({ companies }: Props) {
  const topCompanies = [...companies]
    .sort((a, b) => b.totalJobs - a.totalJobs)
    .slice(0, 5);

  const rankThemes = [
    {
      bg: "bg-blue-50/20 hover:bg-blue-50/40",
      border: "border-blue-100/50",
      badge: "bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-100",
      text: "text-blue-600",
    },
    {
      bg: "bg-indigo-50/20 hover:bg-indigo-50/40",
      border: "border-indigo-100/50",
      badge: "bg-gradient-to-br from-indigo-500 to-purple-500 shadow-indigo-100",
      text: "text-indigo-600",
    },
    {
      bg: "bg-purple-50/20 hover:bg-purple-50/40",
      border: "border-purple-100/50",
      badge: "bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-100",
      text: "text-purple-600",
    },
    {
      bg: "bg-cyan-50/20 hover:bg-cyan-50/40",
      border: "border-cyan-100/50",
      badge: "bg-gradient-to-br from-cyan-500 to-blue-500 shadow-cyan-100",
      text: "text-cyan-600",
    },
    {
      bg: "bg-emerald-50/20 hover:bg-emerald-50/40",
      border: "border-emerald-100/50",
      badge: "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-100",
      text: "text-emerald-600",
    },
  ];

  return (
    <div className="flex flex-col h-full rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
            <Building2 size={20} />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-800">
              Top 5 Công ty - Nhiều Tin nhất
            </h3>
            <p className="text-[13px] text-slate-400">
              Các doanh nghiệp hoạt động tích cực nhất
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-6 space-y-3.5">
        {topCompanies.length === 0 ? (
          <div className="flex h-44 items-center justify-center text-slate-400">
            Không có dữ liệu doanh nghiệp
          </div>
        ) : (
          topCompanies.map((comp, idx) => {
            const rank = idx + 1;
            const theme = rankThemes[idx % rankThemes.length];

            return (
              <div
                key={comp.companyId}
                className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 hover:shadow-sm hover:translate-x-1 cursor-pointer ${theme.bg} ${theme.border}`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-black text-[13px] text-white shadow-xs transition-transform duration-300 group-hover:scale-110 ${theme.badge}`}>
                    #{rank}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[14px] font-bold text-slate-800 truncate">
                        {comp.companyName}
                      </h4>
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-600 border border-emerald-100/30 shrink-0">
                        <ShieldCheck size={10} />
                        Đã xác thực
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-400 mt-0.5 font-medium">
                      {comp.totalJobs} tin tuyển dụng
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-4">
                  <span className={`text-lg font-black block leading-none ${theme.text}`}>{comp.totalJobs}</span>
                  <span className="text-[11px] font-bold text-slate-400 block mt-0.5">tin</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
