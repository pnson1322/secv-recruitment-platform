import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getJobCategories, 
  getJobCategoriesStats, 
  createJobCategories, 
  patchJobCategories, 
  deleteJobCategories, 
  toggleJobCategories 
} from "../api/job-categories.api";
import { useState } from "react";
import { toast } from "sonner";

export function useJobCategories() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  const categoriesQuery = useQuery({
    queryKey: ["job-categories", page],
    queryFn: () => getJobCategories({ page, limit }),
  });

  const statsQuery = useQuery({
    queryKey: ["job-categories-stats"],
    queryFn: () => getJobCategoriesStats(),
  });

  const createMutation = useMutation({
    mutationFn: (name: string) => createJobCategories(name),
    onSuccess: () => {
      toast.success("Thêm thể loại thành công");
      queryClient.invalidateQueries({ queryKey: ["job-categories"] });
      queryClient.invalidateQueries({ queryKey: ["job-categories-stats"] });
    },
    onError: () => {
      toast.error("Không thể thêm thể loại");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id: number) => toggleJobCategories(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-categories"] });
      queryClient.invalidateQueries({ queryKey: ["job-categories-stats"] });
    },
    onError: () => {
      toast.error("Không thể cập nhật trạng thái");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteJobCategories(id),
    onSuccess: () => {
      toast.success("Xóa thể loại thành công");
      queryClient.invalidateQueries({ queryKey: ["job-categories"] });
      queryClient.invalidateQueries({ queryKey: ["job-categories-stats"] });
    },
    onError: () => {
      toast.error("Không thể xóa thể loại");
    },
  });

  const patchMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => patchJobCategories(id, name),
    onSuccess: () => {
      toast.success("Cập nhật thể loại thành công");
      queryClient.invalidateQueries({ queryKey: ["job-categories"] });
    },
    onError: () => {
      toast.error("Không thể cập nhật thể loại");
    },
  });

  return {
    categories: categoriesQuery.data?.data.data ?? [],
    meta: categoriesQuery.data?.data.meta,
    isLoading: categoriesQuery.isLoading,
    isError: categoriesQuery.isError,
    stats: statsQuery.data?.data,
    isStatsLoading: statsQuery.isLoading,
    page,
    setPage,
    createMutation,
    toggleMutation,
    deleteMutation,
    patchMutation,
    refetch: categoriesQuery.refetch,
  };
}
