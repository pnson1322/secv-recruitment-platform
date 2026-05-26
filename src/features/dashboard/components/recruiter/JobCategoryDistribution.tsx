"use client";

import { useState } from "react";
import { PieChart } from "lucide-react";
import type { JobByCategoryStat } from "../../types/dashboard.types";

type Props = {
  categories: JobByCategoryStat[];
};

export default function JobCategoryDistribution({ categories }: Props) {
  // State to track which segment is hovered
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Calculate total jobs across categories
  const totalJobs = categories.reduce(
    (acc: number, cat: JobByCategoryStat) => acc + (cat.jobs?.length || 0),
    0
  );

  // SVG dimensions
  const center = 100;
  const colors = ["#06b6d4", "#6366f1", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

  let accumulatedPercent = 0;

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
      {/* Header with integrated total jobs badge */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-50 p-2 text-cyan-600">
            <PieChart size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[17px] font-bold text-slate-800">
                Phân bố Công việc theo Danh mục
              </h3>
              {totalJobs > 0 && (
                <span className="rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-2.5 py-0.5 text-[10px] font-extrabold text-white shadow-xs tracking-wider uppercase">
                  {totalJobs} tin đăng
                </span>
              )}
            </div>
            <p className="text-[13px] text-slate-400">
              Tỷ lệ ngành nghề tuyển dụng của công ty
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {categories.length === 0 ? (
          <div className="flex h-44 items-center justify-center text-slate-400">
            Không có dữ liệu ngành nghề tuyển dụng
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center">
            {/* SVG Donut/Pie Chart Container */}
            <div className="relative mx-auto h-[200px] w-[200px]">
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="transform -rotate-90 overflow-visible"
              >
                {/* Background track circle (visible by default as the donut hole background) */}
                <circle
                  cx={center}
                  cy={center}
                  r={60}
                  fill="transparent"
                  stroke="#f8fafc"
                  strokeWidth={30}
                />

                {/* Dynamic Pie segments */}
                {categories.map((cat, idx) => {
                  const count = cat.jobs?.length || 0;
                  if (count === 0 || totalJobs === 0) return null;

                  const percent = count / totalJobs;

                  // Geometry calculations based on active/inactive hover state
                  let currentRadius = 60;
                  let currentStrokeWidth = 30; // Default: inner = 45, outer = 75

                  if (hoveredIdx !== null) {
                    if (hoveredIdx === idx) {
                      // Active segment: solid slice, larger outer radius (inner = 0, outer = 96)
                      currentRadius = 48;
                      currentStrokeWidth = 96;
                    } else {
                      // Inactive segments: solid slice, smaller outer radius (inner = 0, outer = 64)
                      currentRadius = 32;
                      currentStrokeWidth = 64;
                    }
                  }

                  const segmentCircumference = 2 * Math.PI * currentRadius;
                  const strokeDasharray = `${percent * segmentCircumference} ${segmentCircumference}`;
                  const strokeDashoffset = -accumulatedPercent * segmentCircumference;
                  accumulatedPercent += percent;

                  const color = colors[idx % colors.length];

                  return (
                    <circle
                      key={cat.categoryId}
                      cx={center}
                      cy={center}
                      r={currentRadius}
                      fill="transparent"
                      stroke={color}
                      strokeWidth={currentStrokeWidth}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      style={{
                        transition:
                          "r 350ms cubic-bezier(0.4, 0, 0.2, 1), stroke-width 350ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dasharray 350ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 350ms cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      className="cursor-pointer"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Interactive Legend List */}
            <div className="space-y-2">
              {categories.map((cat, idx) => {
                const count = cat.jobs?.length || 0;
                const percentage = totalJobs > 0 ? Math.round((count / totalJobs) * 100) : 0;
                const color = colors[idx % colors.length];
                const isHovered = hoveredIdx === idx;
                const isAnyHovered = hoveredIdx !== null;

                return (
                  <div
                    key={cat.categoryId}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`group flex flex-col gap-1.5 p-2 rounded-2xl transition-all duration-300 cursor-pointer ${
                      isHovered
                        ? "bg-slate-50 shadow-xs translate-x-1"
                        : isAnyHovered
                        ? "opacity-50 scale-98"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between text-[14px]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`h-3 w-3 shrink-0 rounded-full transition-transform duration-300 ${
                            isHovered ? "scale-125" : ""
                          }`}
                          style={{ backgroundColor: color }}
                        ></span>
                        <span className="font-semibold text-slate-700 truncate group-hover:text-slate-900 transition-colors">
                          {cat.categoryName}
                        </span>
                      </div>
                      <span className="font-bold text-slate-900 ml-4 shrink-0">
                        {count} tin ({percentage}%)
                      </span>
                    </div>

                    {/* Micro horizontal progress bar inside the legend */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden ml-5.5">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: color,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
