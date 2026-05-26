"use client";

import { GraduationCap, Building2, BriefcaseBusiness, FileText } from "lucide-react";
import type { AdminDashboardStat } from "../../types/dashboard.types";

type Props = {
  stats?: AdminDashboardStat;
};

export default function AdminStatsGrid({ stats }: Props) {
  const cards = [
    {
      title: "Tổng sinh viên",
      value: stats?.totalStudents ?? 0,
      icon: GraduationCap,
      colorClass: "bg-blue-50 text-blue-600",
      changeText: "+12% so với tháng trước",
      changeColor: "text-emerald-600",
    },
    {
      title: "Doanh nghiệp đối tác",
      value: stats?.totalCompanies ?? 0,
      icon: Building2,
      colorClass: "bg-emerald-50 text-emerald-600",
      changeText: "+8% so với tháng trước",
      changeColor: "text-emerald-600",
    },
    {
      title: "Tin tuyển dụng",
      value: stats?.totalJobPostings ?? 0,
      icon: BriefcaseBusiness,
      colorClass: "bg-purple-50 text-purple-600",
      changeText: "+15% so với tháng trước",
      changeColor: "text-emerald-600",
    },
    {
      title: "Tổng lượt ứng tuyển",
      value: stats?.totalApplications ?? 0,
      icon: FileText,
      colorClass: "bg-amber-50 text-amber-600",
      changeText: "+5% so với tháng trước",
      changeColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-[14px] font-semibold text-slate-500">{card.title}</p>
                <h4 className="text-3xl font-black text-slate-800 tracking-tight transition-all duration-300 group-hover:scale-105 origin-left">
                  {card.value.toLocaleString()}
                </h4>
              </div>
              <div className={`rounded-2xl p-3.5 transition-transform duration-300 group-hover:scale-110 ${card.colorClass}`}>
                <Icon size={24} />
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold">
              <span className={card.changeColor}>↗ {card.changeText}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
