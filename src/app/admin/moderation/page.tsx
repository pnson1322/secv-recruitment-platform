import JobModerationPage from "@/features/job-postings/components/moderation/JobModerationPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kiểm duyệt tin đăng | Admin Dashboard",
  description: "Quản lý và kiểm duyệt các tin tuyển dụng trên hệ thống.",
};

export default function Page() {
  return <JobModerationPage />;
}
