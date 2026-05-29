"use client";

import { Building2, Globe, Mail, MapPin, Phone, Users } from "lucide-react";
import type { CompanyProfile } from "../../types/company.types";
import CompanySectionCard from "./CompanySectionCard";
import CompanySectionActionButton from "./CompanySectionActionButton";
import CompanyDetailItem from "./CompanyDetailItem";

type Props = {
  company: CompanyProfile;
  isOwner: boolean;
  onEditDetail?: () => void;
  onEditContact?: () => void;
};

export default function CompanyInfoGrid({
  company,
  isOwner = false,
  onEditDetail,
  onEditContact,
}: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <CompanySectionCard>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[1.18rem] font-extrabold tracking-[-0.02em] text-[#0F172A]">
            Thông tin chi tiết
          </h3>

          {isOwner && (
            <CompanySectionActionButton onClick={onEditDetail}>
              Chỉnh sửa
            </CompanySectionActionButton>
          )}
        </div>

        <div className="mt-6 space-y-6">
          <CompanyDetailItem
            icon={<Building2 size={22} />}
            label="Ngành nghề"
            value={company.industry || "Chưa cập nhật"}
          />
          <CompanyDetailItem
            icon={<Users size={22} />}
            label="Quy mô"
            value={company.companySize + " nhân viên" || "Chưa cập nhật"}
          />
          <CompanyDetailItem
            icon={<MapPin size={22} />}
            label="Địa chỉ"
            value={company.address || "Chưa cập nhật"}
          />
        </div>
      </CompanySectionCard>

      <CompanySectionCard>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[1.18rem] font-extrabold tracking-[-0.02em] text-[#0F172A]">
            Liên hệ
          </h3>

          {isOwner && (
            <CompanySectionActionButton onClick={onEditContact}>
              Chỉnh sửa
            </CompanySectionActionButton>
          )}
        </div>

        <div className="mt-6 space-y-6">
          <CompanyDetailItem
            icon={<Globe size={22} />}
            label="Website"
            value={company.website || "Chưa cập nhật"}
            isLink={!!company.website}
          />
          <CompanyDetailItem
            icon={<Mail size={22} />}
            label="Email"
            value={company.contactEmail || "Chưa cập nhật"}
          />
          <CompanyDetailItem
            icon={<Phone size={22} />}
            label="Điện thoại"
            value={company.contactPhone || "Chưa cập nhật"}
          />
        </div>
      </CompanySectionCard>
    </div>
  );
}
