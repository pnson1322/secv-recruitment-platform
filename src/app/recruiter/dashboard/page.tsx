import { Metadata } from "next";
import RecruiterDashboardPage from "@/features/dashboard/components/RecruiterDashboardPage";

export const metadata: Metadata = {
  title: "Tổng quan Tuyển dụng",
  description: "Báo cáo hiệu suất tuyển dụng mới nhất của công ty bạn",
};

export default function Page() {
  return <RecruiterDashboardPage />;
}
