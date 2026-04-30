import { CheckCircle2, X, Users } from "lucide-react";
import type {
  Application,
  ResultStats,
  ResultSubFilter,
} from "../../types/candidate.types";
import CandidateAvatar from "../shared/CandidateAvatar";
import CandidateStatusBadge from "../shared/CandidateStatusBadge";

type Props = {
  applications: Application[];
  resultStats: ResultStats | null;
  resultFilter: ResultSubFilter;
  onFilterChange: (filter: ResultSubFilter) => void;
  onViewProfile?: (application: Application) => void;
};

const SUB_FILTERS: { key: ResultSubFilter; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "passed", label: "Đậu" },
  { key: "rejected", label: "Rớt" },
];

export default function CandidateTableResult({
  applications,
  resultStats,
  resultFilter,
  onFilterChange,
  onViewProfile,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-semibold text-slate-500">Tổng kết quả</p>
              <p className="mt-2 text-[28px] font-bold text-slate-900">
                {resultStats?.total ?? 0}
              </p>
              <p className="text-[13px] text-slate-400">ứng viên</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <Users size={20} />
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-semibold text-emerald-600">Đã tuyển</p>
              <p className="mt-2 text-[28px] font-bold text-emerald-600">
                {resultStats?.passed ?? 0}
              </p>
              <p className="text-[13px] text-emerald-500">ứng viên</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
              <CheckCircle2 size={22} />
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-semibold text-red-500">Đã loại</p>
              <p className="mt-2 text-[28px] font-bold text-slate-900">
                {resultStats?.failed ?? 0}
              </p>
              <p className="text-[13px] text-slate-400">ứng viên</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <X size={22} />
            </div>
          </div>
        </article>
      </div>

      <div className="inline-flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50/80 p-1.5 shadow-sm">
        {SUB_FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => onFilterChange(f.key)}
            className={`rounded-full px-5 py-2 text-[14px] font-semibold transition ${
              resultFilter === f.key
                ? "bg-cyan-500 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-16 text-center shadow-inner">
          <p className="text-[15px] font-medium text-slate-400">Không có kết quả nào</p>
        </div>
      ) : (
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
                  Trạng thái cuối
                </th>
                <th className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-wider text-slate-500">
                  Ngày cập nhật
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
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <CandidateStatusBadge status={c.status} showIcon />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-[14px] text-slate-600">
                    {c.updatedAt
                      ? new Date(c.updatedAt).toLocaleDateString("vi-VN")
                      : new Date(c.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onViewProfile?.(c)}
                        className="rounded-lg bg-cyan-500 px-4 py-1.5 text-[13px] font-semibold text-white transition hover:bg-cyan-600"
                      >
                        Xem hồ sơ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
