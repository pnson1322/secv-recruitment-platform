"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getJobPreference, updateJobPreference } from "../api/student.api";
import type { JobPreference } from "../types/student.types";
import { toast } from "sonner";

export function useJobPreference() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const [desiredLocation, setDesiredLocation] = useState("");
  const [salaryMinStr, setSalaryMinStr] = useState("");
  const [salaryMaxStr, setSalaryMaxStr] = useState("");

  const { data: prefRes, isLoading, isError } = useQuery({
    queryKey: ["job-preference"],
    queryFn: getJobPreference,
  });

  const preference = prefRes?.data;

  const [prevPreference, setPrevPreference] = useState<JobPreference | null>(null);
  const [prevIsEditing, setPrevIsEditing] = useState(isEditing);

  if (preference !== prevPreference || isEditing !== prevIsEditing) {
    setPrevPreference(preference || null);
    setPrevIsEditing(isEditing);
    if (preference) {
      setDesiredLocation(preference.desiredLocation || "");
      setSalaryMinStr(preference.desiredSalaryMin ? preference.desiredSalaryMin.toString() : "");
      setSalaryMaxStr(preference.desiredSalaryMax ? preference.desiredSalaryMax.toString() : "");
    }
  }

  const updateMutation = useMutation({
    mutationFn: updateJobPreference,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-preference"] });
      toast.success("Cập nhật nguyện vọng công việc thành công!");
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Không thể cập nhật nguyện vọng công việc. Vui lòng thử lại.");
    },
  });

  const handleSave = () => {
    const minVal = salaryMinStr ? parseInt(salaryMinStr, 10) : 0;
    const maxVal = salaryMaxStr ? parseInt(salaryMaxStr, 10) : 0;

    if (isNaN(minVal) || isNaN(maxVal)) {
      toast.error("Vui lòng nhập mức lương hợp lệ");
      return;
    }

    if (minVal < 0 || maxVal < 0) {
      toast.error("Mức lương mong muốn phải là số dương");
      return;
    }

    if (minVal && maxVal && minVal > maxVal) {
      toast.error("Mức lương tối thiểu không được lớn hơn mức lương tối đa");
      return;
    }

    updateMutation.mutate({
      desiredLocation,
      desiredSalaryMin: minVal,
      desiredSalaryMax: maxVal,
    });
  };

  const formatSalaryDisplay = (min: number | undefined, max: number | undefined) => {
    if (!min && !max) return "Thỏa thuận";
    if (min && max) {
      return `${(min / 1000000).toLocaleString("vi-VN")} - ${(max / 1000000).toLocaleString("vi-VN")} triệu VND`;
    }
    if (min) return `Từ ${(min / 1000000).toLocaleString("vi-VN")} triệu VND`;
    if (max) return `Đến ${(max / 1000000).toLocaleString("vi-VN")} triệu VND`;
    return "Thỏa thuận";
  };

  return {
    preference,
    isLoading,
    isError,
    isEditing,
    setIsEditing,
    desiredLocation,
    setDesiredLocation,
    salaryMinStr,
    setSalaryMinStr,
    salaryMaxStr,
    setSalaryMaxStr,
    isUpdating: updateMutation.isPending,
    handleSave,
    formatSalaryDisplay,
  };
}
