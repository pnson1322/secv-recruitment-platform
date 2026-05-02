import { BarChart3, Clock, CheckCircle2, XCircle } from "lucide-react";
import StatCard from "./StatCard";
import type { InvitationStats } from "../../types/application.types";

type Props = {
  stats?: InvitationStats;
  isLoading: boolean;
};

export default function InvitationStatsGrid({ stats, isLoading }: Props) {
  console.log(stats)
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Tổng lời mời"
        count={stats?.total}
        unit="lời mời"
        icon={<BarChart3 size={20} />}
        colorClass="text-slate-500"
        bgClass="bg-white"
        iconBgClass="bg-slate-100"
        isLoading={isLoading}
      />
      <StatCard
        label="Chờ phản hồi"
        count={stats?.byStatus.pending}
        unit="lời mời"
        icon={<Clock size={20} />}
        colorClass="text-amber-500"
        bgClass="bg-white"
        iconBgClass="bg-amber-50"
        isLoading={isLoading}
      />
      <StatCard
        label="Đã chấp nhận"
        count={stats?.byStatus.accepted}
        unit="lời mời"
        icon={<CheckCircle2 size={22} />}
        colorClass="text-emerald-500"
        bgClass="bg-white"
        iconBgClass="bg-emerald-50"
        isLoading={isLoading}
      />
      <StatCard
        label="Đã từ chối"
        count={stats?.byStatus.rejected}
        unit="lời mời"
        icon={<XCircle size={22} />}
        colorClass="text-red-500"
        bgClass="bg-white"
        iconBgClass="bg-red-50"
        isLoading={isLoading}
      />
    </div>
  );
}
