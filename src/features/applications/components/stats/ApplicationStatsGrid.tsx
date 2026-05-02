import { BarChart3, Clock, Users, CheckCircle2, XCircle } from "lucide-react";
import StatCard from "./StatCard";
import type { ApplicationStats } from "../../types/application.types";

type Props = {
  stats?: ApplicationStats;
  isLoading: boolean;
};

export default function ApplicationStatsGrid({ stats, isLoading }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <StatCard
        label="Tổng đơn"
        count={stats?.total}
        unit="đơn ứng tuyển"
        icon={<BarChart3 size={20} />}
        colorClass="text-slate-500"
        bgClass="bg-white"
        iconBgClass="bg-slate-100"
        isLoading={isLoading}
      />
      <StatCard
        label="Chờ duyệt"
        count={stats?.byStatus.submitted}
        unit="đơn"
        icon={<Clock size={20} />}
        colorClass="text-amber-500"
        bgClass="bg-white"
        iconBgClass="bg-amber-50"
        isLoading={isLoading}
      />
      <StatCard
        label="Phỏng vấn"
        count={stats?.byStatus.interviewing}
        unit="đơn"
        icon={<Users size={20} />}
        colorClass="text-purple-500"
        bgClass="bg-white"
        iconBgClass="bg-purple-50"
        isLoading={isLoading}
      />
      <StatCard
        label="Đậu"
        count={stats?.byStatus.passed}
        unit="đơn"
        icon={<CheckCircle2 size={22} />}
        colorClass="text-emerald-500"
        bgClass="bg-white"
        iconBgClass="bg-emerald-50"
        isLoading={isLoading}
      />
      <StatCard
        label="Loại"
        count={stats?.byStatus.rejected}
        unit="đơn"
        icon={<XCircle size={22} />}
        colorClass="text-red-500"
        bgClass="bg-white"
        iconBgClass="bg-red-50"
        isLoading={isLoading}
      />
    </div>
  );
}
