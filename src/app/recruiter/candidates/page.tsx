import CandidatesPage from "@/features/candidates/components/CandidatesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ứng viên đã ứng tuyển",
  description: "Quản lý danh sách các ứng viên đã nộp hồ sơ vào công ty",
};

export default function RecruiterCandidatesPage() {
  return <CandidatesPage />;
}
