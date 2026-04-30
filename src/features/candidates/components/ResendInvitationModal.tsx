"use client";

import { Send, X } from "lucide-react";

import ClientPortal from "@/components/ClientPortal";

import type { Invitation } from "../types/candidate.types";

type Props = {
  open: boolean;
  invitation: Invitation | null;
  message: string;
  isSubmitting?: boolean;
  onMessageChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function ResendInvitationModal({
  open,
  invitation,
  message,
  isSubmitting = false,
  onMessageChange,
  onClose,
  onSubmit,
}: Props) {
  if (!open || !invitation) return null;

  const canClose = !isSubmitting;
  const trimmedMessageLength = message.trim().length;

  return (
    <ClientPortal>
      <div
        className="fixed inset-0 z-[420] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
        onClick={() => {
          if (canClose) onClose();
        }}
      >
        <div
          className="w-full max-w-[680px] overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-slate-100 bg-white px-7 py-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-600">
                  <Send size={20} />
                </div>

                <h2 className="text-[22px] font-bold text-slate-900">
                  Gửi lại lời mời ứng tuyển
                </h2>

                <p className="mt-1 text-[14px] leading-6 text-slate-500">
                  Chỉnh sửa lời nhắn trước khi gửi lại đến{" "}
                  <span className="font-semibold text-slate-700">
                    {invitation.student.fullName}
                  </span>
                  .
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={!canClose}
                className="rounded-full bg-slate-100 p-2.5 text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 grid gap-3 rounded-[24px] border border-cyan-100 bg-cyan-50/30 p-4 sm:grid-cols-2">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400">
                  Ứng viên
                </p>
                <p className="mt-1 text-[15px] font-semibold text-slate-800">
                  {invitation.student.fullName}
                </p>
                <p className="text-[13px] text-slate-500">
                  {invitation.student.email}
                </p>
              </div>

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400">
                  Vị trí đề xuất
                </p>
                <p className="mt-1 text-[15px] font-semibold text-slate-800">
                  {invitation.job.jobTitle}
                </p>
                <p className="text-[13px] text-slate-500">
                  Gửi lần đầu: {new Date(invitation.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-white px-7 py-6">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="resend-invitation-message"
                className="text-[15px] font-semibold text-slate-800"
              >
                Lời nhắn gửi đến sinh viên
              </label>

              <span className="text-[12px] font-medium text-slate-400">
                {trimmedMessageLength} ký tự
              </span>
            </div>

            <textarea
              id="resend-invitation-message"
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
              disabled={isSubmitting}
              rows={8}
              autoFocus
              placeholder="Nhập lời nhắn gửi tới sinh viên..."
              className="w-full resize-none rounded-[24px] border border-slate-200 bg-white px-4 py-3.5 text-[15px] leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 disabled:cursor-not-allowed disabled:bg-slate-50"
            />

            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-[13px] leading-6 text-slate-500">
              Mẹo: một lời nhắn ngắn, rõ ràng về vị trí tuyển dụng và mong muốn
              trao đổi sẽ giúp sinh viên phản hồi tốt hơn.
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-white px-7 py-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={!canClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-[14px] font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Hủy
            </button>

            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting || trimmedMessageLength === 0}
              className="rounded-xl bg-cyan-500 px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-cyan-300"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi lại lời mời"}
            </button>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}