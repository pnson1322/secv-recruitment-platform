import StudentProfilePage from "@/features/students/components/profile/StudentProfilePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hồ sơ & CV",
  description: "Quản lý thông tin cá nhân và danh sách CV của bạn",
};

export default function Page() {
  return <StudentProfilePage />;
}
