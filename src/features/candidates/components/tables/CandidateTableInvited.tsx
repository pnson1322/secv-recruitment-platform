import { Send, CheckCircle2, Calendar, X } from "lucide-react";
import type {
  Invitation,
  InvitationStatsResponse,
} from "../../types/candidate.types";
import CandidateAvatar from "../shared/CandidateAvatar";
import CandidateStatusBadge from "../shared/CandidateStatusBadge";

type Props = {
  invitations: Invitation[];
  invStats: InvitationStatsResponse | null;
  onResend?: (invitation: Invitation) => void;
  onViewProfile?: (invitation: Invitation) => void;
};

export default function CandidateTableInvited({
  invitations,
  invStats,
  onResend,
  onViewProfile,
}: Props) {
  const stats = {
    total: invStats?.total ?? 0,
    accepted: invStats?.byStatus.accepted ?? 0,
    pending: invStats?.byStatus.pending ?? 0,
    rejected:
      (invStats?.byStatus.rejected ?? 0) + (invStats?.byStatus.expired ?? 0),
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-6">
      <div className="flex items-center gap-3 rounded-xl border border-cyan-100 bg-cyan-50/50 p-4 text-cyan-700">
        <Send size={18} className="shrink-0" />
        <p className="text-[14px] font-medium">
          Đây là danh sách sinh viên mà bạn đã chủ động gửi lời mời ứng tuyển
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <article className="rounded-2xl border border-cyan-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-semibold text-slate-600">Tổng gửi</p>
              <p className="mt-1 text-[26px] font-bold text-cyan-500">{stats.total}</p>
              <p className="text-[12px] text-slate-400">lời mời</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-500">
              <Send size={18} />
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-semibold text-emerald-600">Chấp nhận</p>
              <p className="mt-1 text-[26px] font-bold text-emerald-600">
                {stats.accepted}
              </p>
              <p className="text-[12px] text-emerald-500">ứng viên</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-orange-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-semibold text-orange-500">Chờ phản hồi</p>
              <p className="mt-1 text-[26px] font-bold text-orange-500">{stats.pending}</p>
              <p className="text-[12px] text-orange-400">ứng viên</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <Calendar size={18} />
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-semibold text-slate-600">Từ chối</p>
              <p className="mt-1 text-[26px] font-bold text-slate-800">{stats.rejected}</p>
              <p className="text-[12px] text-slate-400">ứng viên</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <X size={20} />
            </div>
          </div>
        </article>
      </div>

      {invitations.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-16 text-center shadow-inner">
          <p className="text-[15px] font-medium text-slate-400">Không có lời mời nào</p>
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
                  Vị trí đề xuất
                </th>
                <th className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-wider text-slate-500">
                  Ngày gửi lời mời
                </th>
                <th className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-wider text-slate-500">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-center text-[12px] font-bold uppercase tracking-wider text-slate-500">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {invitations.map((inv) => (
                <tr key={inv.invitationId} className="transition hover:bg-slate-50/50">
                  <td className="pl-8 pr-6 py-4 text-left">
                    <div className="flex items-center gap-3">
                      <CandidateAvatar
                        name={inv.student.fullName}
                        avatarUrl={inv.student.avatarUrl}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold text-slate-900">
                          {inv.student.fullName}
                        </p>
                        <p className="truncate text-[13px] text-slate-500">
                          {inv.student.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-[14px] font-medium text-slate-700">
                    {inv.job.jobTitle}
                  </td>
                  <td className="px-6 py-4 text-center text-[14px] text-slate-600">
                    {new Date(inv.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CandidateStatusBadge status={inv.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onResend?.(inv)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        Gửi lại
                      </button>
                      <button
                        type="button"
                        onClick={() => onViewProfile?.(inv)}
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
