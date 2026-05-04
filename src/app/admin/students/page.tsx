import StudentManagementPage from "@/features/students/components/admin/StudentManagementPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Sinh viên",
  description: "Quản lý thông tin và hồ sơ sinh viên trong hệ thống",
};

export default function AdminStudentsPage() {
  return <StudentManagementPage />;
}
