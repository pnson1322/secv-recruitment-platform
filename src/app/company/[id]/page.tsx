import CompanyProfilePageContent from "@/features/company-profile/components/profile/CompanyProfilePageContent";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import AppHeader from "@/features/navigation/components/AppHeader";
import AppFooter from "@/components/layout/AppFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi tiết Doanh nghiệp",
  description: "Xem thông tin chi tiết và các tin tuyển dụng của doanh nghiệp",
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CompanyDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <ProtectedRoute allowedRoles={["STUDENT", "ADMIN"]}>
      <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
        <AppHeader />
        <main className="px-6 py-6 flex-1">
          <CompanyProfilePageContent companyId={id} />
        </main>
        <AppFooter />
      </div>
    </ProtectedRoute>
  );
}
