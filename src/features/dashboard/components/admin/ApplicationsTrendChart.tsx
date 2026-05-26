"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import type { AdminApplicationsPerMonthStat } from "../../types/dashboard.types";

type Props = {
  data: AdminApplicationsPerMonthStat[];
};

export default function ApplicationsTrendChart({ data }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const sortedData = [...data]
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-12);

  const width = 500;
  const height = 240;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = Math.max(...sortedData.map((d) => d.totalApplications), 10);
  const yMax = Math.ceil(maxVal / 10) * 10;
  const points = sortedData.map((d, i) => {
    const x = paddingLeft + (i / Math.max(sortedData.length - 1, 1)) * chartWidth;
    const y = height - paddingBottom - (d.totalApplications / yMax) * chartHeight;
    return { x, y, raw: d };
  });

  let pathD = "";
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathD += ` L ${points[i].x} ${points[i].y}`;
    }
  }

  const gradientD =
    points.length > 0
      ? `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${
          height - paddingBottom
        } Z`
      : "";

  const formatMonth = (monthStr: string) => {
    const parts = monthStr.split("-");
    if (parts.length >= 2) {
      return `T${parseInt(parts[1], 10)}`;
    }
    return monthStr;
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-800">Xu hướng Ứng tuyển</h3>
            <p className="text-[13px] text-slate-400">Số lượng hồ sơ ứng tuyển theo từng tháng</p>
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        {sortedData.length === 0 ? (
          <div className="flex h-56 items-center justify-center text-slate-400">
            Không có dữ liệu xu hướng ứng tuyển
          </div>
        ) : (
          <>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingTop + ratio * chartHeight;
                const value = Math.round(yMax * (1 - ratio));
                return (
                  <g key={i} className="opacity-40">
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={width - paddingRight}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingLeft - 8}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-slate-400 text-[10px] font-semibold"
                    >
                      {value}
                    </text>
                  </g>
                );
              })}

              {gradientD && <path d={gradientD} fill="url(#areaGrad)" />}

              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {points.map((pt, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <g key={idx}>
                    {isHovered && (
                      <line
                        x1={pt.x}
                        y1={paddingTop}
                        x2={pt.x}
                        y2={height - paddingBottom}
                        stroke="#93c5fd"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    )}

                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="16"
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    />

                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? "6" : "4"}
                      fill={isHovered ? "#3b82f6" : "#ffffff"}
                      stroke="#3b82f6"
                      strokeWidth={isHovered ? "3" : "2"}
                      className="transition-all duration-150 pointer-events-none"
                    />
                  </g>
                );
              })}

              {points.map((pt, idx) => (
                <text
                  key={idx}
                  x={pt.x}
                  y={height - paddingBottom + 20}
                  textAnchor="middle"
                  className="fill-slate-400 text-[10px] font-bold"
                >
                  {formatMonth(pt.raw.month)}
                </text>
              ))}
            </svg>

            {hoveredIdx !== null && points[hoveredIdx] && (
              <div
                className="absolute z-10 rounded-xl border border-slate-100 bg-slate-900 px-3.5 py-2 text-white shadow-lg pointer-events-none transition-all duration-150 whitespace-nowrap min-w-[100px]"
                style={{
                  left: `${(points[hoveredIdx].x / width) * 100}%`,
                  top: `${(points[hoveredIdx].y / height) * 100 - 24}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Tháng {points[hoveredIdx].raw.month.split("-")[1]}
                </p>
                <p className="text-sm font-black mt-0.5">
                  {points[hoveredIdx].raw.totalApplications} hồ sơ
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
