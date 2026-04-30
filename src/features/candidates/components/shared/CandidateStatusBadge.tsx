import type { ApplicationStatus, InvitationStatus } from "../../types/candidate.types";

type Props = {
  status: ApplicationStatus | InvitationStatus;
  showIcon?: boolean;
};

const CONFIG: Record<
  ApplicationStatus | InvitationStatus,
  { label: string; className: string }
> = {
  submitted: {
    label: "Chờ duyệt",
    className: "bg-amber-50 text-amber-600 border-amber-200",
  },
  interviewing: {
    label: "Phỏng vấn",
    className: "bg-indigo-50 text-indigo-600 border-indigo-200",
  },
  passed: {
    label: "Đậu",
    className: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  rejected: {
    label: "Rớt",
    className: "bg-red-50 text-red-500 border-red-200",
  },
  pending: {
    label: "Chờ phản hồi",
    className: "bg-amber-50 text-amber-600 border-amber-200",
  },
  accepted: {
    label: "Đã nhận",
    className: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  expired: {
    label: "Hết hạn",
    className: "bg-slate-50 text-slate-500 border-slate-200",
  },
};

export default function CandidateStatusBadge({ status, showIcon }: Props) {
  const cfg = CONFIG[status] || { label: status, className: "bg-slate-50 text-slate-600 border-slate-200" };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[13px] font-semibold ${cfg.className}`}
    >
      {showIcon && (status === "passed" || status === "rejected") && (
        <span className="text-[11px]">
          {status === "passed" ? "✓" : "✕"}
        </span>
      )}
      {cfg.label}
    </span>
  );
}
