import React from "react";

type StatCardProps = {
  label: string;
  count?: number;
  unit: string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  iconBgClass: string;
  isLoading: boolean;
};

export default function StatCard({
  label,
  count,
  unit,
  icon,
  colorClass,
  bgClass,
  iconBgClass,
  isLoading,
}: StatCardProps) {
  return (
    <article className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className={`text-[13px] font-semibold ${colorClass}`}>{label}</p>
          {isLoading ? (
            <div className="mt-2 h-9 w-12 animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <p className="mt-2 text-[28px] font-bold text-slate-900 leading-tight">
              {count ?? 0}
            </p>
          )}
          <p className="text-[13px] text-slate-400">{unit}</p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBgClass} ${colorClass}`}>
          {icon}
        </div>
      </div>
    </article>
  );
}
