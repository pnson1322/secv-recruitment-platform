"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { AdminApplicationSuccessRateMonthlyStat } from "../../types/dashboard.types";

type Props = {
  data: AdminApplicationSuccessRateMonthlyStat[];
};

export default function SuccessRateBarChart({ data }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const sortedData = [...data]
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-12);

  const width = 500;
  const height = 240;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = Math.max(...sortedData.map((d) => d.successRate), 10);
  const yMax = maxVal > 50 ? 100 : 50;

  const barWidth = Math.max(8, (chartWidth / sortedData.length) * 0.55);
  const gap = (chartWidth - barWidth * sortedData.length) / Math.max(sortedData.length - 1, 1);

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
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-800">Tỉ lệ Duyệt Hồ sơ (%)</h3>
            <p className="text-[13px] text-slate-400">Phần trăm hồ sơ ứng tuyển được duyệt hàng tháng</p>
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        {sortedData.length === 0 ? (
          <div className="flex h-56 items-center justify-center text-slate-400">
            Không có dữ liệu tỉ lệ duyệt hồ sơ
          </div>
        ) : (
          <>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full overflow-visible">
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="barGradHover" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#312e81" />
                  <stop offset="100%" stopColor="#4f46e5" />
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
                    />
                    <text
                      x={paddingLeft - 8}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-slate-400 text-[10px] font-semibold"
                    >
                      {value}%
                    </text>
                  </g>
                );
              })}

              {sortedData.map((d, idx) => {
                const x = paddingLeft + idx * (barWidth + gap);
                const barHeight = (d.successRate / yMax) * chartHeight;
                const y = height - paddingBottom - barHeight;

                const isHovered = hoveredIdx === idx;
                const isAnyHovered = hoveredIdx !== null;

                return (
                  <g key={idx}>
                    <rect
                      x={x - gap / 2}
                      y={paddingTop}
                      width={barWidth + gap}
                      height={chartHeight}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    />


                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={Math.max(barHeight, 2)}
                      rx={4}
                      ry={4}
                      fill={isHovered ? "url(#barGradHover)" : "url(#barGrad)"}
                      opacity={isAnyHovered && !isHovered ? 0.45 : 1}
                      className="transition-all duration-300 pointer-events-none"
                    />
                  </g>
                );
              })}

              {sortedData.map((d, idx) => {
                const x = paddingLeft + idx * (barWidth + gap) + barWidth / 2;
                return (
                  <text
                    key={idx}
                    x={x}
                    y={height - paddingBottom + 20}
                    textAnchor="middle"
                    className="fill-slate-400 text-[10px] font-bold"
                  >
                    {formatMonth(d.month)}
                  </text>
                );
              })}
            </svg>

            {hoveredIdx !== null && sortedData[hoveredIdx] && (
              <div
                className="absolute z-10 rounded-xl border border-slate-100 bg-slate-900 px-3.5 py-2 text-white shadow-lg pointer-events-none transition-all duration-150 whitespace-nowrap min-w-[100px]"
                style={{
                  left: `${
                    ((paddingLeft + hoveredIdx * (barWidth + gap) + barWidth / 2) / width) * 100
                  }%`,
                  top: `${
                    (((height -
                      paddingBottom -
                      (sortedData[hoveredIdx].successRate / yMax) * chartHeight) /
                      height) *
                      100) -
                    10
                  }%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Tháng {sortedData[hoveredIdx].month.split("-")[1]}
                </p>
                <p className="text-sm font-black mt-0.5">
                  Đã duyệt: {sortedData[hoveredIdx].successRate.toFixed(1)}%
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
