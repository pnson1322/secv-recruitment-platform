"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/useAuth";
import CompanyProfilePage from "./CompanyProfilePage";
import { useCompanyProfile } from "../../hooks/useCompanyProfile";
import { useCompanyProfileJobs } from "../../hooks/useCompanyProfileJobs";
import EditBasicInfoModal from "../edit-profile/EditBasicInfoModal";
import EditDescriptionModal from "../edit-profile/EditDescriptionModal";
import EditDetailModal from "../edit-profile/EditDetailModal";
import EditContactModal from "../edit-profile/EditContactModal";
import EditCoverImageModal from "../edit-profile/EditCoverImageModal";
import EditLogoModal from "../edit-profile/EditLogoModal";
import ManageOfficeImagesModal from "../edit-profile/ManageOfficeImagesModal";
import CompanyProfileLoading from "./CompanyProfileLoading";
import CompanyProfileError from "./CompanyProfileError";
import { getCategoriesList } from "@/features/job-postings/api/job-postings.api";

type CompanyProfilePageContentProps = {
  companyId?: string;
};

type ModalKey =
  | null
  | "basic-info"
  | "description"
  | "detail"
  | "contact"
  | "cover"
  | "logo"
  | "office-images";

export default function CompanyProfilePageContent({
  companyId,
}: CompanyProfilePageContentProps) {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const viewerRole = user?.role;

  const { data, isLoading, error } = useCompanyProfile({
    viewerRole,
    companyId,
  });

  const company = data?.data;

  const jobsQuery = useCompanyProfileJobs({
    companyId: company?.companyId,
    enabled: !!company?.companyId,
  });

  const categoriesQuery = useQuery({
    queryKey: ["job-postings", "categories"],
    queryFn: getCategoriesList,
  });

  const jobs = jobsQuery.data?.data?.data ?? [];
  const categories = categoriesQuery.data?.data ?? [];

  const [activeModal, setActiveModal] = useState<ModalKey>(null);

  if (isAuthLoading || !viewerRole) {
    return <CompanyProfileLoading />;
  }

  if (isLoading) {
    return <CompanyProfileLoading />;
  }

  if (error || !company) {
    return <CompanyProfileError />;
  }

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <CompanyProfilePage
        company={company}
        viewerRole={viewerRole}
        jobs={jobs}
        categories={categories}
        isJobsLoading={jobsQuery.isLoading || categoriesQuery.isLoading}
        isOwner={viewerRole === "COMPANY" && !companyId}
        onViewJobDetail={(jobId) => router.push(`/jobs-detail/${jobId}`)}
        onEditBasicInfo={() => setActiveModal("basic-info")}
        onEditDescription={() => setActiveModal("description")}
        onEditDetail={() => setActiveModal("detail")}
        onEditContact={() => setActiveModal("contact")}
        onManageOfficeImages={() => setActiveModal("office-images")}
        onChangeCoverImage={() => setActiveModal("cover")}
        onChangeLogo={() => setActiveModal("logo")}
        onFollow={() => undefined}
        onRestrict={() => undefined}
      />

      {activeModal === "basic-info" && (
        <EditBasicInfoModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "description" && (
        <EditDescriptionModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "detail" && (
        <EditDetailModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "contact" && (
        <EditContactModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "cover" && (
        <EditCoverImageModal open onClose={closeModal} />
      )}

      {activeModal === "logo" && (
        <EditLogoModal open company={company} onClose={closeModal} />
      )}

      {activeModal === "office-images" && (
        <ManageOfficeImagesModal open company={company} onClose={closeModal} />
      )}
    </>
  );
}
