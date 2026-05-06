import React from "react";
import StudentSavedPage from "@/features/students/components/saved/StudentSavedPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đã lưu & Theo dõi",
  description: "Quản lý các công việc và công ty mà bạn đã lưu và theo dõi",
};

export default function Page() {
  return <StudentSavedPage />;
}
