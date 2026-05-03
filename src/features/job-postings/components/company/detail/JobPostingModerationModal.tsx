"use client";

import { useState, useEffect } from "react";
import ClientPortal from "@/components/ClientPortal";

type Props = {
  open: boolean;
  mode: "reject" | "restrict";
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
};

export default function JobPostingModerationModal({
  open,
  mode,
  onClose,
  onConfirm,
  isLoading = false,
}: Props) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) setReason("");
  }, [open]);

  if (!open) return null;

  const isReject = mode === "reject";

  return (
    <ClientPortal>
      <div 
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/45 px-4"
        onClick={onClose}
      >
        <div 
          className="w-full max-w-115 overflow-hidden rounded-3xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 pb-4 pt-6">
            <h3 className="text-[18px] font-bold text-(--color-text)">
              {isReject ? "Từ chối tin tuyển dụng" : "Hạn chế tin tuyển dụng"}
            </h3>

            <p className="mt-3 text-[14px] leading-7 text-(--color-muted)">
              {isReject
                ? "Vui lòng nhập lý do từ chối để gửi phản hồi cho nhà tuyển dụng"
                : "Tin này sẽ bị ẩn khỏi danh sách công khai. Vui lòng nhập lý do hạn chế"}
            </p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={isReject ? "Lý do từ chối..." : "Lý do hạn chế..."}
              rows={5}
              className="mt-4 w-full resize-none rounded-2xl border border-(--color-border) px-4 py-3 text-[15px] outline-none transition focus:border-(--color-accent)"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-(--color-border) px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-(--color-border) bg-white px-5 py-3 text-[15px] font-semibold text-(--color-text)"
            >
              Hủy
            </button>

            <button
              type="button"
              disabled={isLoading || !reason.trim()}
              onClick={() => onConfirm(reason.trim())}
              className={`rounded-2xl px-5 py-3 text-[15px] font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                isReject
                  ? "bg-red-400 hover:bg-red-500"
                  : "bg-orange-400 hover:bg-orange-500"
              }`}
            >
              {isReject ? "Xác nhận từ chối" : "Xác nhận hạn chế"}
            </button>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
