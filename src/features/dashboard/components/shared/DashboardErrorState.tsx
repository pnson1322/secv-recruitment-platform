"use client";

import { AlertCircle, RotateCcw } from "lucide-react";

type Props = {
  onRetry: () => void;
  message?: string;
};

export default function DashboardErrorState({ onRetry, message = "Đã xảy ra lỗi khi tải dữ liệu tổng quan." }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-3xl border border-rose-100 bg-rose-50/20 text-center max-w-md mx-auto my-12 shadow-xs">
      <div className="rounded-2xl bg-rose-50 p-4 text-rose-600 mb-4 animate-bounce">
        <AlertCircle size={32} />
      </div>
      <h3 className="text-lg font-bold text-slate-800">Không thể tải dữ liệu</h3>
      <p className="text-sm text-slate-500 mt-1 mb-6">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 shadow-sm cursor-pointer active:scale-95"
      >
        <RotateCcw size={16} />
        Thử lại
      </button>
    </div>
  );
}
