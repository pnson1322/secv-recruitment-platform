"use client";

import { TrendingUp } from "lucide-react";
import type { ApplicationRateStat } from "../../types/dashboard.types";

type Props = {
  successRates: ApplicationRateStat[];
};

export default function SuccessRateChart({ successRates }: Props) {
  const chartHeight = 160;
  const chartWidth = 500;
  const paddingX = 40;
  const paddingY = 25;

  interface Point {
    x: number;
    y: number;
    label: string;
    value: number;
  }

  const points: Point[] = successRates.map((item: ApplicationRateStat, index: number) => {
    const x =
      paddingX +
      (index * (chartWidth - paddingX * 2)) / Math.max(1, successRates.length - 1);
    const rate = item.successRate || 0;
    const y =
      chartHeight -
      paddingY -
      (rate / 100) * (chartHeight - paddingY * 2);
    return { x, y, label: item.month || "", value: rate };
  });

  const linePath = points.reduce((path: string, p: Point, i: number) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
  }, "");

  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
    : "";

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-800">
              Tỉ lệ Ứng tuyển Thành công
            </h3>
            <p className="text-[13px] text-slate-400">
              Phân tích tỉ lệ hồ sơ được duyệt theo từng tháng (%)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-end">
        {successRates.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-slate-400">
            Không có dữ liệu tỉ lệ thành công
          </div>
        ) : (
          <div className="relative w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {[0, 25, 50, 75, 100].map((val) => {
                const y =
                  chartHeight -
                  paddingY -
                  (val / 100) * (chartHeight - paddingY * 2);
                return (
                  <g key={val} className="opacity-40">
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                    <text
                      x={paddingX - 10}
                      y={y + 4}
                      textAnchor="end"
                      className="fill-slate-400 text-[10px] font-semibold"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {areaPath && (
                <path
                  d={areaPath}
                  fill="url(#chartGradient)"
                />
              )}

              {linePath && (
                <path
                  d={linePath}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {points.map((p: Point, i: number) => (
                <g key={i} className="group/point">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4.5"
                    className="fill-white stroke-[#06b6d4] stroke-[3px] transition-all duration-200 group-hover/point:r-6 cursor-pointer"
                  />
                  <g className="opacity-0 pointer-events-none transition-opacity duration-150 group-hover/point:opacity-100">
                    <rect
                      x={p.x - 30}
                      y={p.y - 32}
                      width="60"
                      height="22"
                      rx="6"
                      className="fill-slate-900"
                    />
                    <text
                      x={p.x}
                      y={p.y - 17}
                      textAnchor="middle"
                      className="fill-white text-[11px] font-bold"
                    >
                      {p.value}%
                    </text>
                  </g>
                </g>
              ))}

              {points.map((p: Point, i: number) => {
                if (points.length > 6 && i % 2 !== 0) return null;
                let formatMonth = p.label;
                if (p.label && p.label.includes("-")) {
                  const parts = p.label.split("-");
                  if (parts[0] && parts[1]) {
                    formatMonth = parts[1] + "/" + parts[0].substring(2);
                  }
                }
                return (
                  <text
                    key={i}
                    x={p.x}
                    y={chartHeight - 6}
                    textAnchor="middle"
                    className="fill-slate-400 text-[10px] font-bold"
                  >
                    {formatMonth}
                  </text>
                );
              })}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
