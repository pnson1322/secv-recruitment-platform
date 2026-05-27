import { Metadata } from "next";
import AdminSettingsPage from "@/features/settings/components/AdminSettingsPage";

export const metadata: Metadata = {
  title: "Cài đặt Admin",
  description: "Cài đặt tài khoản, bảo mật và quản lý quản trị viên hệ thống",
};

export default function Page() {
  return <AdminSettingsPage />;
}
