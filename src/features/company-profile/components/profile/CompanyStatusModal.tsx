"use client";

import { useState, useEffect } from "react";
import ClientPortal from "@/components/ClientPortal";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  mode: "REJECTED" | "RESTRICTED";
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
};

export default function CompanyStatusModal({
  open,
  mode,
  onClose,
  onConfirm,
  isLoading = false,
}: Props) {
  const [reason, setReason] = useState("");
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setReason("");
    }
  }

  if (!open) return null;

  const isReject = mode === "REJECTED";

  return (
    <ClientPortal>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <div 
          className="w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative px-8 pb-4 pt-8">
            <button 
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-900">
              {isReject ? "Từ chối hồ sơ công ty" : "Hạn chế hoạt động công ty"}
            </h3>

            <p className="mt-3 text-[15px] leading-relaxed text-slate-500">
              {isReject
                ? "Vui lòng nhập lý do từ chối để gửi phản hồi cho doanh nghiệp. Hồ sơ này sẽ không thể đăng tin tuyển dụng."
                : "Công ty sẽ bị ẩn khỏi danh sách công khai và không thể đăng tin mới. Vui lòng nhập lý do hạn chế."}
            </p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={isReject ? "Nhập lý do từ chối..." : "Nhập lý do hạn chế..."}
              rows={4}
              className="mt-6 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-[15px] text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-50 px-8 py-5 bg-slate-50/30">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-2.5 text-[14px] font-bold text-slate-500 transition hover:bg-slate-100"
            >
              Hủy
            </button>

            <button
              type="button"
              disabled={isLoading || !reason.trim()}
              onClick={() => onConfirm(reason.trim())}
              className={`rounded-xl px-6 py-2.5 text-[14px] font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                isReject
                  ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-100"
                  : "bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-100"
              }`}
            >
              {isLoading ? "Đang xử lý..." : isReject ? "Xác nhận từ chối" : "Xác nhận hạn chế"}
            </button>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
