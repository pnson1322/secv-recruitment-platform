"use client";

import { Layers3 } from "lucide-react";
import type { AdminJobByCategoryStat } from "../../types/dashboard.types";

type Props = {
  categories: AdminJobByCategoryStat[];
};

export default function AdminJobCategoryDistribution({ categories }: Props) {
  const sortedCategories = [...categories].sort((a, b) => b.totalJobs - a.totalJobs);

  const totalJobs = categories.reduce((acc, cat) => acc + cat.totalJobs, 0);

  const colors = [
    "bg-indigo-600",
    "bg-cyan-500",
    "bg-purple-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-slate-500",
  ];

  return (
    <div className="flex flex-col h-full rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-purple-50 p-2 text-purple-600">
            <Layers3 size={20} />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-800">
              Thống kê Tin tuyển dụng theo Danh mục
            </h3>
            <p className="text-[13px] text-slate-400">
              Phân bố tin tuyển dụng của toàn hệ thống
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-6 overflow-y-auto max-h-[300px] pr-1 space-y-4">
        {sortedCategories.length === 0 ? (
          <div className="flex h-44 items-center justify-center text-slate-400">
            Không có dữ liệu danh mục
          </div>
        ) : (
          sortedCategories.map((cat, idx) => {
            const percentage = totalJobs > 0 ? (cat.totalJobs / totalJobs) * 100 : 0;
            const colorClass = colors[idx % colors.length];

            return (
              <div key={cat.categoryId} className="group space-y-1.5">
                <div className="flex items-center justify-between text-[14px]">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${colorClass}`} />
                    <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                      {cat.categoryName}
                    </span>
                  </div>
                  <span className="font-bold text-slate-800">{cat.totalJobs} tin</span>
                </div>

                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {sortedCategories.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[15px] font-bold">
          <span className="text-slate-500">Tổng cộng</span>
          <span className="text-blue-600">{totalJobs} tin</span>
        </div>
      )}
    </div>
  );
}
