import SearchCandidatesPage from "@/features/candidates/components/SearchCandidatesPage";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function RecruiterSearchCandidatesRoute() {
  return (
    <ProtectedRoute allowedRoles={["COMPANY"]}>
      <SearchCandidatesPage />
    </ProtectedRoute>
  );
}
