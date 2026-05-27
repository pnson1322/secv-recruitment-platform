"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getMyProfile, updateStudentInfo, updateAvatar } from "@/features/students/api/student.api";

export function useStudentSettings() {
  const queryClient = useQueryClient();
  const { user, setUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: getMyProfile,
  });

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  const updateInfoMutation = useMutation({
    mutationFn: updateStudentInfo,
    onSuccess: (res: any) => {
      toast.success(res?.message || "Cập nhật thông tin thành công");
      queryClient.invalidateQueries({ queryKey: ["studentProfile"] });
      
      if (user) {
        setUser({
          ...user,
          full_name: fullName.trim(),
          email: email.trim(),
        });
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Không thể cập nhật thông tin");
    },
  });

  const updateAvatarMutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: (res: any) => {
      toast.success(res?.message || "Cập nhật ảnh đại diện thành công");
      queryClient.invalidateQueries({ queryKey: ["studentProfile"] });

      if (user && res?.data?.avatarUrl) {
        setUser({
          ...user,
          avatar_url: res.data.avatarUrl,
        });
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Không thể cập nhật ảnh đại diện");
    },
  });

  const handleUpdateInfo = async () => {
    if (!fullName.trim()) {
      toast.error("Họ và tên không được để trống");
      return;
    }
    if (!email.trim()) {
      toast.error("Email không được để trống");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Email không đúng định dạng");
      return;
    }

    await updateInfoMutation.mutateAsync({
      fullName: fullName.trim(),
      email: email.trim(),
      phoneNumber: phone.trim(),
    });
  };

  const handleAvatarChange = async (file: File) => {
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Chỉ chấp nhận định dạng ảnh JPEG, PNG, GIF hoặc WEBP");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Dung lượng ảnh tối đa là 5MB");
      return;
    }

    await updateAvatarMutation.mutateAsync(file);
  };

  const getAcademicYearDisplay = () => {
    if (!profile) return "";
    if (profile.studentStatus === "GRADUATED") {
      return "Đã tốt nghiệp";
    }
    if (profile.currentYear) {
      return `Năm ${profile.currentYear}`;
    }
    return "Chưa cập nhật";
  };

  return {
    profile,
    isLoading,
    isError,
    refetch,
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    isUpdatingInfo: updateInfoMutation.isPending,
    isUpdatingAvatar: updateAvatarMutation.isPending,
    handleUpdateInfo,
    handleAvatarChange,
    academicYearDisplay: getAcademicYearDisplay(),
  };
}
