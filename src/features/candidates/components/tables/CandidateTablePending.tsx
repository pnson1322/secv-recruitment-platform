import { Check, X } from "lucide-react";
import type { Application } from "../../types/candidate.types";
import CandidateAvatar from "../shared/CandidateAvatar";

type Props = {
  applications: Application[];
  onApprove?: (application: Application) => void;
  onReject?: (application: Application) => void;
  onViewCV?: (application: Application) => void;
};

export default function CandidateTablePending({
  applications,
  onApprove,
  onReject,
  onViewCV,
}: Props) {
  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <p className="text-[15px] text-slate-400">Không có ứng viên chờ duyệt</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60">
            <th className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Ứng viên
            </th>
            <th className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Vị trí
            </th>
            <th className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Ngày nộp
            </th>
            <th className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-wider text-slate-500">
              CV
            </th>
            <th className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-wider text-slate-500">
              Hành động
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {applications.map((c) => (
            <tr key={c.applicationId} className="transition hover:bg-slate-50/50">
              <td className="pl-8 pr-6 py-4 text-left">
                <div className="flex items-center gap-3">
                  <CandidateAvatar
                    name={c.student.fullName}
                    avatarUrl={c.student.avatarUrl}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-slate-900">
                      {c.student.fullName}
                    </p>
                    <p className="truncate text-[13px] text-slate-500">
                      {c.student.email}
                    </p>
                    {c.student.phone && (
                      <p className="text-[12px] text-slate-400">{c.student.phone}</p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center text-[14px] text-slate-700">
                {c.job.jobTitle}
              </td>
              <td className="px-6 py-4 text-center text-[14px] text-slate-600">
                {new Date(c.createdAt).toLocaleDateString("vi-VN")}
              </td>
              <td className="px-6 py-4 text-center">
                {c.cvUrl && (
                  <button
                    type="button"
                    onClick={() => onViewCV?.(c)}
                    className="rounded-lg bg-cyan-500 px-4 py-1.5 text-[13px] font-semibold text-white transition hover:bg-cyan-600"
                  >
                    Xem hồ sơ
                  </button>
                )}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => onApprove?.(c)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-1.5 text-[13px] font-semibold text-white transition hover:bg-emerald-600"
                  >
                    <Check size={14} /> Duyệt
                  </button>
                  <button
                    type="button"
                    onClick={() => onReject?.(c)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 px-4 py-1.5 text-[13px] font-semibold text-red-500 transition hover:bg-red-50"
                  >
                    <X size={14} /> Loại
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
