import MonitoringPage from "@/features/company-profile/components/profile/MonitoringPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giám sát Doanh nghiệp",
  description: "Quản lý và phê duyệt hồ sơ các đối tác doanh nghiệp trên hệ thống",
};

export default function AdminMonitoringPage() {
  return <MonitoringPage />;
}
