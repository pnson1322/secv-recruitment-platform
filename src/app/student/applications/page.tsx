import StudentApplicationsPage from "@/features/applications/components/StudentApplicationsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Việc làm của tôi",
  description: "Quản lý danh sách các công việc bạn đã ứng tuyển",
};

export default function Page() {
  return <StudentApplicationsPage />;
}
