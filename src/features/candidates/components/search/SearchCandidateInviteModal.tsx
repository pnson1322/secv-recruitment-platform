"use client";

import { Mail, Send, Star, X } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";
import CustomSelect from "@/components/CustomSelect";
import type { JobPostingDataItem } from "@/features/job-postings/types/job-postings.types";
import type { StudentCardItem } from "../../types/student-card.types";
import CandidateAvatar from "../shared/CandidateAvatar";

type Props = {
  open: boolean;
  candidate: StudentCardItem | null;
  jobs: JobPostingDataItem[];
  selectedJobId: string;
  message: string;
  error?: string | null;
  isSubmitting?: boolean;
  onJobChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

function getYearLabel(student: StudentCardItem): string {
  const currentYear = String(student.currentYear ?? "").trim();
  const studentStatus = String(student.studentStatus ?? "")
    .trim()
    .toUpperCase();

  if (
    studentStatus === "GRADUATED" ||
    currentYear.toUpperCase() === "GRADUATED"
  ) {
    return "Đã tốt nghiệp";
  }

  return currentYear ? `Năm ${currentYear}` : "";
}

function getGpaLabel(gpa: StudentCardItem["gpa"]): string {
  if (gpa === null || gpa === undefined || gpa === "") {
    return "N.A";
  }
  const numericValue = Number(gpa);
  return Number.isFinite(numericValue) ? numericValue.toFixed(1) : String(gpa);
}

export default function SearchCandidateInviteModal({
  open,
  candidate,
  jobs,
  selectedJobId,
  message,
  error,
  isSubmitting = false,
  onJobChange,
  onMessageChange,
  onClose,
  onSubmit,
}: Props) {
  if (!open || !candidate) return null;

  const canClose = !isSubmitting;
  const trimmedMessageLength = message.trim().length;
  const jobOptions = jobs.map((job) => ({
    label: job.jobTitle,
    value: String(job.jobId),
  }));

  const yearLabel = getYearLabel(candidate);
  const subtitleLabel = yearLabel;

  return (
    <ClientPortal>
      <div
        className="fixed inset-0 z-500 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-[6px] transition-all duration-300"
        onClick={() => {
          if (canClose) onClose();
        }}
      >
        <div
          className="w-full max-w-[640px] overflow-hidden rounded-[36px] border border-white/20 bg-white shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)] transition-all animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative px-8 pb-5 pt-9 bg-gradient-to-b from-slate-50/50 to-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-cyan-500 shadow-lg shadow-cyan-200 text-white transition-transform hover:scale-105 duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h2 className="text-[22px] font-bold text-slate-900 leading-tight tracking-tight">
                    Mời ứng viên ứng tuyển
                  </h2>
                  <p className="mt-1.5 text-[14px] text-slate-500 font-medium">
                    Gửi lời mời đến:{" "}
                    <span className="text-cyan-600 font-bold decoration-cyan-100 underline-offset-4 decoration-2 underline">
                      {candidate.fullName}
                    </span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                disabled={!canClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-100 text-slate-400 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-600 hover:rotate-90 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="px-9 py-5 space-y-7">
            <div className="group relative overflow-hidden flex items-center gap-5 rounded-[28px] border border-cyan-200 bg-gradient-to-br from-cyan-100/60 to-white p-6 transition-all hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100/50">
              <div className="relative">
                <CandidateAvatar
                  name={candidate.fullName}
                  avatarUrl={candidate.avatarUrl}
                  size={64}
                />
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
              </div>
              
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[19px] font-extrabold text-slate-900 group-hover:text-cyan-600 transition-colors">
                  {candidate.fullName}
                </h3>
                <p className="mt-1 text-[13px] font-medium text-slate-500 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {subtitleLabel}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-2 py-1 text-[13px] font-bold text-amber-600">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span>GPA: {getGpaLabel(candidate.gpa)}</span>
                  </div>
                  {candidate.isOpenToWork && (
                    <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[12px] font-bold text-emerald-600">
                      Đang tìm việc
                    </span>
                  )}
                </div>
              </div>

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-100/20 blur-3xl transition-all group-hover:bg-cyan-200/30" />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[14px] font-bold text-slate-800">
                Chọn tin tuyển dụng
                <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500" />
              </label>
              <CustomSelect
                label=""
                placeholder="-- Chọn tin tuyển dụng --"
                value={selectedJobId}
                options={jobOptions}
                onChange={onJobChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-bold text-slate-800">
                  Lời nhắn tùy chỉnh
                </label>
                <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {trimmedMessageLength} ký tự
                </span>
              </div>
              <div className="relative group">
                <textarea
                  value={message}
                  onChange={(e) => onMessageChange(e.target.value)}
                  disabled={isSubmitting}
                  rows={7}
                  placeholder="Nhập nội dung lời nhắn..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[14px] leading-relaxed text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 disabled:bg-slate-50 hover:border-slate-300"
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-focus-within:opacity-100 transition-opacity">
                   <div className="h-1 w-8 rounded-full bg-cyan-400" />
                </div>
              </div>
              <p className="flex items-center gap-2 text-[12px] text-slate-400 font-medium italic">
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                Lời nhắn này sẽ được gửi kèm lời mời ứng tuyển qua email của ứng viên
              </p>
            </div>

            {error ? (
              <div className="flex items-center gap-3 rounded-2xl bg-rose-50/50 px-4 py-3.5 text-[13px] text-rose-600 border border-rose-100 animate-in slide-in-from-top-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  !
                </div>
                {error}
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-4 border-t border-slate-100 bg-white px-8 py-6">
            <button
              type="button"
              onClick={onClose}
              disabled={!canClose}
              className="h-12 rounded-2xl border border-slate-200 bg-white px-8 text-[14px] font-bold text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-95 disabled:opacity-50"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={
                isSubmitting || !selectedJobId || trimmedMessageLength === 0
              }
              className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-cyan-500 px-10 text-[14px] font-bold text-white shadow-lg shadow-cyan-200 transition-all hover:bg-cyan-600 hover:shadow-cyan-300 hover:translate-y-[-1px] active:scale-95 active:translate-y-0 disabled:bg-cyan-200 disabled:shadow-none disabled:translate-y-0"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Đang gửi...</span>
                </div>
              ) : (
                <>
                  <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <span>Gửi lời mời ngay</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
