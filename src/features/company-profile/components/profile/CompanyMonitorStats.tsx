"use client";

import { Building2, Star, FileText, CheckCircle2 } from "lucide-react";
import type { MonitorStats } from "../../types/company.types";

type Props = {
  stats?: MonitorStats;
  isLoading: boolean;
};

export default function CompanyMonitorStats({ stats, isLoading }: Props) {
  const cards = [
    {
      label: "Tổng doanh nghiệp",
      value: stats?.totalCompanies ?? 0,
      subLabel: "doanh nghiệp",
      icon: Building2,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Đánh giá trung bình",
      value: stats?.avgRating ?? 0,
      subLabel: "điểm đánh giá",
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      label: "Tổng ứng tuyển",
      value: stats?.totalApplications ?? 0,
      subLabel: "hồ sơ ứng tuyển",
      icon: FileText,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      label: "Ứng viên trúng tuyển",
      value: stats?.totalPassed ?? 0,
      subLabel: "sinh viên",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[120px] animate-pulse rounded-[24px] border border-slate-100 bg-white" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <div 
          key={i} 
          className="flex items-center justify-between rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-slate-200"
        >
          <div className="flex flex-col">
            <p className="text-[13px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
              {card.label}
            </p>
            <p className="text-[28px] font-extrabold text-slate-900 leading-none">
              {card.label === "Đánh giá trung bình" 
                ? card.value.toFixed(1) 
                : card.value.toLocaleString()}
            </p>
            <p className="text-[13px] font-medium text-slate-400 mt-2">
              {card.subLabel}
            </p>
          </div>
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${card.bgColor} ${card.color}`}>
            <card.icon size={26} strokeWidth={2.5} />
          </div>
        </div>
      ))}
    </div>
  );
}
