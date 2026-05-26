import { Metadata } from "next";
import StudentDashboardPage from "@/features/dashboard/components/StudentDashboardPage";

export const metadata: Metadata = {
  title: "Trang chủ Tìm việc",
  description: "Trang tổng quan tìm kiếm việc làm phù hợp dành cho Sinh viên",
};

export default function Page() {
  return <StudentDashboardPage />;
}
