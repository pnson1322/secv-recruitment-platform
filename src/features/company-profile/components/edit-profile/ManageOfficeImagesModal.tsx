"use client";

import type { CompanyProfile } from "../../types/company.types";
import { useOfficeImagesManager } from "../../hooks/useOfficeImagesManager";
import CompanyEditModal from "./CompanyEditModal";
import OfficeImageTile from "./OfficeImageTile";
import OfficeImageAddTile from "./OfficeImageAddTile";

type Props = {
  open: boolean;
  company: CompanyProfile;
  onClose: () => void;
};

export default function ManageOfficeImagesModal({
  open,
  company,
  onClose,
}: Props) {
  const {
    images,
    errorMessage,
    busyImageId,
    isAdding,
    addInputRef,
    maxImages,
    handleAddImages,
    handleDeleteImage,
    handleReplaceImage,
  } = useOfficeImagesManager({
    open,
    company,
  });

  return (
    <CompanyEditModal
      open={open}
      title="Quản lý hình ảnh văn phòng"
      onClose={onClose}
      maxWidthClassName="max-w-[1240px]"
      footer={
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[15px] font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Đóng
        </button>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <OfficeImageTile
              key={image.imageId}
              image={image}
              isBusy={busyImageId === image.imageId}
              onDelete={handleDeleteImage}
              onReplace={handleReplaceImage}
            />
          ))}

          {images.length < maxImages && (
            <OfficeImageAddTile
              disabled={isAdding}
              inputRef={addInputRef}
              onAdd={handleAddImages}
            />
          )}
        </div>

        <div className="space-y-2 pt-1">
          <p className="text-[14px] text-slate-500">
            Tối đa {maxImages} ảnh. Khuyến nghị: 1200x800px, định dạng JPG/PNG,
            dưới 5MB mỗi ảnh. Bạn có thể chọn nhiều ảnh cùng lúc.
          </p>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-600">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </CompanyEditModal>
  );
}
