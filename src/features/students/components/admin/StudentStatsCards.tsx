"use client";

import { Users, GraduationCap, School } from "lucide-react";
import type { StudentGeneralStats } from "../../types/student.types";

type Props = {
  stats?: StudentGeneralStats;
  isLoading: boolean;
};

export default function StudentStatsCards({ stats, isLoading }: Props) {
  const cards = [
    {
      label: "Tổng sinh viên",
      value: stats?.totalStudents ?? 0,
      subLabel: "sinh viên",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Đang học",
      value: stats?.studying ?? 0,
      subLabel: "sinh viên",
      icon: School,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      label: "Đã tốt nghiệp",
      value: stats?.graduated ?? 0,
      subLabel: "sinh viên",
      icon: GraduationCap,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[120px] animate-pulse rounded-[24px] border border-slate-100 bg-white" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {cards.map((card, i) => (
        <div 
          key={i} 
          className="flex items-center justify-between rounded-[24px] border border-slate-100 bg-white p-7 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-col">
            <p className="text-[14px] font-bold text-slate-500 mb-1">
              {card.label}
            </p>
            <p className="text-[32px] font-bold text-slate-900 leading-none">
              {card.value.toLocaleString()}
            </p>
            <p className="text-[13px] font-medium text-slate-400 mt-1">
              {card.subLabel}
            </p>
          </div>
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bgColor} ${card.color}`}>
            <card.icon size={28} />
          </div>
        </div>
      ))}
    </div>
  );
}
