"use client";

import { useEffect, useRef, useState } from "react";
import type { CompanyProfile, OfficeImage } from "../types/company.types";
import {
  useAddOfficeImageMutation,
  useDeleteOfficeImageMutation,
  useReplaceOfficeImageMutation,
} from "./useCompanyMutations";

const MAX_IMAGES = 6;
const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

type Params = {
  open: boolean;
  company: CompanyProfile;
};

export function useOfficeImagesManager({ open, company }: Params) {
  const [images, setImages] = useState<OfficeImage[]>(
    company.officeImages || [],
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [busyImageId, setBusyImageId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const addInputRef = useRef<HTMLInputElement | null>(null);

  const addMutation = useAddOfficeImageMutation();
  const deleteMutation = useDeleteOfficeImageMutation();
  const replaceMutation = useReplaceOfficeImageMutation();

  useEffect(() => {
    if (!open) return;
    setImages(company.officeImages || []);
    setErrorMessage("");
    setBusyImageId(null);
    setIsAdding(false);
  }, [open, company.officeImages]);

  const validateFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `Tệp "${file.name}" không đúng định dạng (chỉ hỗ trợ JPG/PNG).`;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return `Tệp "${file.name}" quá lớn (tối đa ${MAX_FILE_SIZE_MB}MB).`;
    }

    return "";
  };

  const handleAddImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage("");

    const newFiles = Array.from(files);
    const currentCount = images.length;
    const remainingSlots = MAX_IMAGES - currentCount;

    if (newFiles.length > remainingSlots) {
      setErrorMessage(`Bạn chỉ có thể thêm tối đa ${remainingSlots} ảnh nữa.`);
      return;
    }

    for (const file of newFiles) {
      const error = validateFile(file);
      if (error) {
        setErrorMessage(error);
        return;
      }
    }

    try {
      setIsAdding(true);
      for (const file of newFiles) {
        await addMutation.mutateAsync(file);
      }
    } catch {
      setErrorMessage("Một số ảnh không thể tải lên. Vui lòng thử lại.");
    } finally {
      setIsAdding(false);
      if (addInputRef.current) {
        addInputRef.current.value = "";
      }
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    setErrorMessage("");

    const previousImages = images;
    setImages((prev) => prev.filter((item) => item.imageId !== imageId));

    try {
      setBusyImageId(imageId);
      await deleteMutation.mutateAsync(String(imageId));
    } catch {
      setImages(previousImages);
      setErrorMessage("Không thể xóa ảnh. Vui lòng thử lại.");
    } finally {
      setBusyImageId(null);
    }
  };

  const handleReplaceImage = async (imageId: number, file: File | null) => {
    setErrorMessage("");

    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setErrorMessage(error);
      return;
    }

    const previousImages = images;

    try {
      setBusyImageId(imageId);
      setImages((prev) => prev.filter((item) => item.imageId !== imageId));

      await replaceMutation.mutateAsync({
        imageId,
        file,
      });
    } catch {
      setImages(previousImages);
      setErrorMessage("Không thể thay thế ảnh. Vui lòng thử lại.");
    } finally {
      setBusyImageId(null);
    }
  };

  return {
    images,
    errorMessage,
    busyImageId,
    isAdding,
    addInputRef,
    maxImages: MAX_IMAGES,
    handleAddImages,
    handleDeleteImage,
    handleReplaceImage,
  };
}
