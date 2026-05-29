"use client";

import { TrendingUp } from "lucide-react";
import type { ApplicationRateStat } from "../../types/dashboard.types";

type Props = {
  data: ApplicationRateStat[];
};

export default function ApplicationCountChart({ data }: Props) {
  const chartHeight = 160;
  const chartWidth = 500;
  const paddingX = 40;
  const paddingY = 25;

  const maxCount = Math.max(...data.map((d) => d.count), 5);

  interface Point {
    x: number;
    y: number;
    label: string;
    value: number;
  }

  const points: Point[] = data.map((item, index) => {
    const x =
      paddingX +
      (index * (chartWidth - paddingX * 2)) / Math.max(1, data.length - 1);
    const count = item.count || 0;

    const y =
      chartHeight -
      paddingY -
      (count / maxCount) * (chartHeight - paddingY * 2);

    let formatLabel = item.date;
    if (item.date && item.date.includes("-")) {
      const parts = item.date.split("-");
      formatLabel = `${parts[2]}/${parts[1]}`;
    }

    return { x, y, label: formatLabel, value: count };
  });

  const linePath = points.reduce((path: string, p: Point, i: number) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
  }, "");

  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
    : "";

  const yAxisSteps = [0, 0.25, 0.5, 0.75, 1].map((multiplier) =>
    Math.ceil(maxCount * multiplier),
  );
  const uniqueYAxisSteps = Array.from(new Set(yAxisSteps));

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-800">
              Lượt ứng tuyển (7 Ngày Qua)
            </h3>
            <p className="text-[13px] text-slate-400">
              Thống kê số lượng hồ sơ nộp vào công ty
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col justify-end">
        {data.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-slate-400">
            Không có dữ liệu thống kê
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

              {/* Vẽ các đường grid ngang trục Y */}
              {uniqueYAxisSteps.map((val) => {
                const y =
                  chartHeight -
                  paddingY -
                  (val / maxCount) * (chartHeight - paddingY * 2);
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
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Fill Gradient & Line */}
              {areaPath && <path d={areaPath} fill="url(#chartGradient)" />}
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

              {/* Các điểm dữ liệu & Tooltip */}
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
                      {p.value} hồ sơ
                    </text>
                  </g>
                </g>
              ))}

              {/* Trục X: Ngày tháng */}
              {points.map((p: Point, i: number) => (
                <text
                  key={i}
                  x={p.x}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  className="fill-slate-400 text-[10px] font-bold"
                >
                  {p.label}
                </text>
              ))}
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
