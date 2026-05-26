import { Metadata } from "next";
import AdminDashboardPage from "@/features/dashboard/components/AdminDashboardPage";

export const metadata: Metadata = {
  title: "Tổng quan Admin",
  description: "Trang tổng quan thống kê và giám sát hệ thống dành cho Quản trị viên",
};

export default function Page() {
  return <AdminDashboardPage />;
}
