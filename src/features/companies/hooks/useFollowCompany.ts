import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { followCompany, unfollowCompany } from "@/features/company-profile/api/company.api";

export function useFollowCompany(companyId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isFollowing: boolean) => 
      isFollowing ? unfollowCompany(companyId) : followCompany(companyId),
    onSuccess: (_, isFollowing) => {
      queryClient.invalidateQueries({ queryKey: ["student-companies"] });
      queryClient.invalidateQueries({ queryKey: ["student-followed-companies"] });
      toast.success(isFollowing ? "Đã bỏ theo dõi công ty" : "Đã theo dõi công ty");
    },
    onError: () => {
      toast.error("Thao tác thất bại. Vui lòng thử lại.");
    }
  });
}
