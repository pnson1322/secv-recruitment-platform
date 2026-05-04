import RecruiterRegisterPageContent from "@/features/auth/components/RecruiterRegisterPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký Nhà tuyển dụng",
  description: "Tham gia hệ thống với vai trò Nhà tuyển dụng",
};

export default function RecruiterRegisterPage() {
  return <RecruiterRegisterPageContent />;
}
