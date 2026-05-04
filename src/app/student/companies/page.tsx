import React from "react";
import StudentCompaniesPage from "@/features/companies/components/StudentCompaniesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khám phá Doanh nghiệp",
  description: "Khám phá và tìm kiếm các đối tác doanh nghiệp trên hệ thống",
};

export default function Page() {
  return <StudentCompaniesPage />;
}
