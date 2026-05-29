"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyProfile, setDefaultResume, deleteResume, putSkills, patchJobStatus } from "../api/student.api";
import { toast } from "sonner";
import { useState } from "react";
import { StudentResume } from "../types/student.types";

export function useStudentProfilePage() {
  const { data: profile, isLoading, isError, refetch } = useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  });

  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [selectedCvForView, setSelectedCvForView] = useState<StudentResume | null>(null);
  const [selectedCvForDelete, setSelectedCvForDelete] = useState<StudentResume | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleSetDefault = async (resumeId: number) => {
    try {
      await setDefaultResume(resumeId);
      toast.success("Đã đặt làm CV mặc định");
      refetch();
    } catch (error) {
      toast.error("Không thể đặt làm mặc định");
    }
  };

  const handleDeleteResume = async () => {
    if (!selectedCvForDelete) return;
    
    if (selectedCvForDelete.isDefault) {
      toast.error("Không thể xóa CV mặc định. Vui lòng đặt CV khác làm mặc định trước.");
      setSelectedCvForDelete(null);
      return;
    }

    setIsDeleting(selectedCvForDelete.resumeId);
    try {
      await deleteResume(selectedCvForDelete.resumeId);
      toast.success("Đã xóa CV thành công");
      refetch();
      setSelectedCvForDelete(null);
    } catch (error: unknown) {
      if ((error as { response?: { status?: number } })?.response?.status === 400) {
        toast.error("Không thể xóa CV mặc định");
      } else {
        toast.error("Lỗi khi xóa CV");
      }
    } finally {
      setIsDeleting(null);
    }
  };

  const handleRemoveSkill = async (skillId: number) => {
    if (!profile) return;
    try {
      const newSkillIds = profile.skills
        .filter(s => s.skillId !== skillId)
        .map(s => s.skillId);
      await putSkills({ skillIds: newSkillIds });
      toast.success("Đã xóa kỹ năng");
      refetch();
    } catch (error) {
      toast.error("Lỗi khi xóa kỹ năng");
    }
  };

  const handleUpdateJobStatus = async (isOpenToWork: boolean) => {
    setIsUpdatingStatus(true);
    try {
      await patchJobStatus({ isOpenToWork });
      toast.success("Đã cập nhật trạng thái tìm việc");
      refetch();
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return {
    profile,
    isLoading,
    isError,
    refetch,
    handleSetDefault,
    handleDeleteResume,
    isDeleting,
    selectedCvForView,
    setSelectedCvForView,
    selectedCvForDelete,
    setSelectedCvForDelete,
    isUploadModalOpen,
    setIsUploadModalOpen,
    isSkillsModalOpen,
    setIsSkillsModalOpen,
    handleRemoveSkill,
    handleUpdateJobStatus,
    isUpdatingStatus,
  };
}
