import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { saveJobPosting, unsaveJobPosting } from "@/features/job-postings/api/job-postings.api";

export function useSaveJobPosting(jobId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isSaved: boolean) => 
      isSaved ? unsaveJobPosting(jobId) : saveJobPosting(jobId),
    onSuccess: (_, isSaved) => {
      queryClient.invalidateQueries({ queryKey: ["job-posting-cards-student"] });
      queryClient.invalidateQueries({ queryKey: ["job-recommendations"] });
      queryClient.invalidateQueries({ queryKey: ["student-saved-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job-postings", "detail", jobId] });
      
      toast.success(isSaved ? "Đã bỏ lưu tin tuyển dụng" : "Đã lưu tin tuyển dụng");
    },
    onError: () => {
      toast.error("Thao tác thất bại. Vui lòng thử lại.");
    }
  });
}
