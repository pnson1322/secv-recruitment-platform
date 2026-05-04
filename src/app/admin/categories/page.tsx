import React from "react";
import JobCategoriesPage from "@/features/job-categories/components/JobCategoriesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý Thể loại",
  description: "Quản lý các thể loại công việc trong hệ thống",
};

export default function Page() {
  return <JobCategoriesPage />;
}