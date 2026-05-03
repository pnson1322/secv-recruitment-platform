"use client";

import React from "react";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";
import { AdminJobPostingsStats } from "../../types/job-postings.types";

type Props = {
  stats?: AdminJobPostingsStats;
  isLoading: boolean;
};

export default function JobModerationStats({ stats, isLoading }: Props) {
  const cards = [
    {
      label: "Tổng tin đăng",
      value: stats?.total ?? 0,
      subLabel: "Tin tuyển dụng",
      icon: <FileText size={20} />,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Đang chờ duyệt",
      value: stats?.pending ?? 0,
      subLabel: "Cần xử lý",
      icon: <Clock size={20} />,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      label: "Đã duyệt hôm nay",
      value: stats?.approvedToday ?? 0,
      subLabel: "Thành công",
      icon: <CheckCircle2 size={20} />,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "Đã từ chối",
      value: stats?.rejected ?? 0,
      subLabel: "Không đạt yêu cầu",
      icon: <XCircle size={20} />,
      color: "bg-red-500",
      lightColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[140px] animate-pulse rounded-[32px] bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className="relative overflow-hidden rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md group"
        >
          <div className="relative z-10">
            <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">{card.label}</p>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-[28px] font-black text-slate-900 leading-none mb-1.5">{card.value.toLocaleString()}</h3>
                <p className="text-[13px] font-medium text-slate-500">{card.subLabel}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.lightColor} ${card.textColor} transition-transform group-hover:scale-110 shadow-inner`}>
                {card.icon}
              </div>
            </div>
          </div>
          <div className={`absolute -right-4 -bottom-4 h-20 w-20 rounded-full ${card.lightColor} opacity-20 blur-2xl transition-all group-hover:scale-150`} />
        </div>
      ))}
    </div>
  );
}
