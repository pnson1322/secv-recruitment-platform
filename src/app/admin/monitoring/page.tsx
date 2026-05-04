import MonitoringPage from "@/features/company-profile/components/profile/MonitoringPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giám sát doanh nghiệp | Admin Monitoring",
  description: "Quản lý và phê duyệt hồ sơ doanh nghiệp",
};

export default function AdminMonitoringPage() {
  return <MonitoringPage />;
}
