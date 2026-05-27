import { Metadata } from "next";
import StudentSettingsPage from "@/features/settings/components/StudentSettingsPage";

export const metadata: Metadata = {
  title: "Cài đặt tài khoản",
  description: "Cài đặt tài khoản, thông tin cá nhân và bảo mật dành cho sinh viên",
};

export default function Page() {
  return <StudentSettingsPage />;
}
