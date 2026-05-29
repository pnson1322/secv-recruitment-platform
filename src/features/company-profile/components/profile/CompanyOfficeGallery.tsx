"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { OfficeImage } from "../../types/company.types";
import CompanySectionCard from "./CompanySectionCard";
import CompanySectionActionButton from "./CompanySectionActionButton";

type Props = {
  officeImages: OfficeImage[];
  isOwner: boolean;
  onManageOfficeImages?: () => void;
};

export default function CompanyOfficeGallery({
  officeImages,
  isOwner = false,
  onManageOfficeImages,
}: Props) {
  return (
    <CompanySectionCard>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <ImageIcon className="text-[#06B6D4]" size={28} />
          <h3 className="text-[1.18rem] font-extrabold tracking-[-0.02em] text-[#0F172A]">
            Hình ảnh văn phòng
          </h3>
        </div>

        {isOwner && (
          <CompanySectionActionButton onClick={onManageOfficeImages}>
            Quản lý ảnh
          </CompanySectionActionButton>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {officeImages.length > 0 ? (
          officeImages.map((image) => (
            <div
              key={image.imageId}
              className="relative h-50 overflow-hidden rounded-2xl bg-slate-100"
            >
              <Image
                src={image.imageUrl}
                alt="Office"
                fill
                className="object-cover transition duration-300 hover:scale-[1.02]"
              />
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-[1rem] font-medium text-slate-500">
            Chưa có hình ảnh văn phòng.
          </div>
        )}
      </div>
    </CompanySectionCard>
  );
}
