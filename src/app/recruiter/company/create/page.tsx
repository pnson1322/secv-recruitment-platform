import RecruiterRegisterPageContent from "@/features/recruiter-register/components/RecruiterRegisterPageContent";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký Doanh nghiệp",
  description: "Tạo hồ sơ doanh nghiệp để bắt đầu tuyển dụng",
};

export default function RecruiterCompanyCreatePage() {
  return (
    <ProtectedRoute allowedRoles={["COMPANY"]}>
      <RecruiterRegisterPageContent />
    </ProtectedRoute>
  );
}
