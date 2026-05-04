import { Metadata } from "next";
import RecruiterJobPostingsClient from "./RecruiterJobPostingsClient";

export const metadata: Metadata = {
  title: "Quản lý Tin tuyển dụng",
  description: "Quản lý và đăng tải các tin tuyển dụng của công ty",
};

export default function RecruiterJobPostingsPage() {
  return <RecruiterJobPostingsClient />;
}
