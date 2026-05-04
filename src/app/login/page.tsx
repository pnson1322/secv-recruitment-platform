import LoginPageContent from "@/features/auth/components/LoginPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập vào hệ thống",
};

export default async function LoginPage() {
  return <LoginPageContent />;
}
