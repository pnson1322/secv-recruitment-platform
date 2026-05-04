import SearchCandidatesPage from "@/features/candidates/components/SearchCandidatesPage";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm kiếm Ứng viên",
  description: "Tìm kiếm và kết nối với các sinh viên tiềm năng",
};

export default function RecruiterSearchCandidatesRoute() {
  return (
    <ProtectedRoute allowedRoles={["COMPANY"]}>
      <SearchCandidatesPage />
    </ProtectedRoute>
  );
}
