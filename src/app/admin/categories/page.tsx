import React from "react";
import JobCategoriesPage from "@/features/job-categories/components/JobCategoriesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Thể loại | Admin Dashboard",
  description: "Quản lý các thể loại công việc trong hệ thống",
};

export default function Page() {
  return <JobCategoriesPage />;
}