"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateStudentActiveStatus } from "../api/student.api";

export function useStudentTable() {
  const queryClient = useQueryClient();
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [openDetail, setOpenDetail] = useState(false);

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: number; isActive: boolean }) => 
      updateStudentActiveStatus(id, isActive),
    onSuccess: (_, variables) => {
      queryClient.setQueriesData<any>(
        { queryKey: ["admin-students"] },
        (old: any) => {
          if (!old || !old.data) return old;
          return {
            ...old,
            data: {
              ...old.data,
              data: old.data.data.map((item: any) => 
                item.studentId == variables.id 
                  ? { 
                      ...item, 
                      isActive: variables.isActive,
                      is_active: variables.isActive 
                    } 
                  : item
              )
            }
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ["admin-student-stats"] });
      toast.success(variables.isActive ? "Đã mở khóa tài khoản" : "Đã khóa tài khoản sinh viên");
    },
    onError: () => {
      toast.error("Thao tác thất bại. Vui lòng thử lại.");
    },
  });

  const handleViewDetail = (id: number) => {
    setSelectedStudentId(id);
    setOpenDetail(true);
  };

  const handleToggleActive = (id: number, currentActive: boolean | any) => {
    const isActive = !currentActive;
    toggleActiveMutation.mutate({ id, isActive });
  };

  return {
    selectedStudentId,
    openDetail,
    setOpenDetail,
    toggleActiveMutation,
    handleViewDetail,
    handleToggleActive,
  };
}
