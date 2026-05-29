"use client";

import type { CompanyProfile } from "../../types/company.types";
import CompanySectionCard from "./CompanySectionCard";
import CompanySectionActionButton from "./CompanySectionActionButton";
import CompanyInfoGrid from "./CompanyInfoGrid";
import CompanyOfficeGallery from "./CompanyOfficeGallery";

type Props = {
  company: CompanyProfile;
  isOwner: boolean;
  onEditDescription?: () => void;
  onEditDetail?: () => void;
  onEditContact?: () => void;
  onManageOfficeImages?: () => void;
};

export default function CompanyAboutSection({
  company,
  isOwner = false,
  onEditDescription,
  onEditDetail,
  onEditContact,
  onManageOfficeImages,
}: Props) {
  const description = company.description || "Chưa có mô tả về công ty.";

  return (
    <div className="space-y-4">
      <CompanySectionCard>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[1.35rem] font-extrabold tracking-[-0.02em] text-[#0F172A] md:text-[1.48rem]">
            Về chúng tôi
          </h2>

          {isOwner && (
            <CompanySectionActionButton onClick={onEditDescription}>
              Chỉnh sửa
            </CompanySectionActionButton>
          )}
        </div>

        <div className="mt-4 space-y-4 text-[0.98rem] leading-7 text-slate-600">
          {description.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </CompanySectionCard>

      <CompanyInfoGrid
        company={company}
        isOwner={isOwner}
        onEditDetail={onEditDetail}
        onEditContact={onEditContact}
      />

      <CompanyOfficeGallery
        officeImages={company.officeImages || []}
        isOwner={isOwner}
        onManageOfficeImages={onManageOfficeImages}
      />
    </div>
  );
}
