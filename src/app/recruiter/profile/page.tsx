import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import CompanyProfilePageContent from "@/features/company-profile/components/profile/CompanyProfilePageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hồ sơ Công ty",
  description: "Quản lý thông tin và hồ sơ giới thiệu của doanh nghiệp",
};

export default function RecruiterProfilePage() {
  return (
    <ProtectedRoute allowedRoles={["COMPANY"]}>
      <CompanyProfilePageContent />
    </ProtectedRoute>
  );
}
