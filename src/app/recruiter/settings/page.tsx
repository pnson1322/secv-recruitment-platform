import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import RecruiterSettingsPage from "@/features/settings/components/RecruiterSettingsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cài đặt",
  description: "Cài đặt tài khoản và bảo mật dành cho nhà tuyển dụng",
};

export default function RecruiterSettingsRoute() {
  return (
    <ProtectedRoute allowedRoles={["COMPANY"]}>
      <RecruiterSettingsPage />
    </ProtectedRoute>
  );
}
