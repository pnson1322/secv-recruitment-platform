import { Suspense } from "react";
import OAuthCallbackPageContent from "@/features/auth/components/OAuthCallbackPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xử lý đăng nhập",
  description: "Đang xử lý đăng nhập với Google...",
};

export default function OAuthCallbackPage() {
  return (
    <Suspense>
      <OAuthCallbackPageContent />
    </Suspense>
  );
}
