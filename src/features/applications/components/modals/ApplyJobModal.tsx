"use client";

import { X, FileText, Check, Loader2, AlertCircle } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProfile } from "@/features/students/api/student.api";
import { createApplication } from "../../api/application.api";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getApiErrorMessage } from "@/utils/api-error";

type Props = {
  open: boolean;
  onClose: () => void;
  jobId: number;
  jobTitle: string;
};

export default function ApplyJobModal({ open, onClose, jobId, jobTitle }: Props) {
  const queryClient = useQueryClient();
  const [selectedCvUrl, setSelectedCvUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const { data: profileRes, isLoading, isError } = useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
    enabled: open,
  });

  const profile = profileRes;
  const resumes = profile?.resumes || [];

  useEffect(() => {
    if (resumes.length > 0) {
      const defaultCv = resumes.find(r => r.isDefault);
      if (defaultCv) {
        setSelectedCvUrl(defaultCv.cvUrl);
      } else if (!selectedCvUrl) {
        setSelectedCvUrl(resumes[0].cvUrl);
      }
    }
  }, [resumes]);

  const onApply = async () => {
    if (user?.role !== "STUDENT") {
      toast.error("Chỉ sinh viên mới có quyền ứng tuyển");
      return;
    }

    if (!selectedCvUrl) {
      toast.error("Vui lòng chọn CV để ứng tuyển");
      return;
    }

    setIsSubmitting(true);
    try {
      await createApplication({
        jobId,
        cvUrl: selectedCvUrl,
        coverLetter: "Tôi rất mong muốn được ứng tuyển vào vị trí này. Cảm ơn quý công ty!",
      });
      
      // Invalidate all application and stats queries to sync UI instantly
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application-stats"] });
      queryClient.invalidateQueries({ queryKey: ["job-posting-cards-student"] });
      queryClient.invalidateQueries({ queryKey: ["job-recommendations"] });

      toast.success("Ứng tuyển thành công!");
      onClose();
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStudent = user?.role === "STUDENT";

  if (!open) return null;

  return (
    <ClientPortal>
      <div 
        className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="w-full max-w-[500px] overflow-hidden rounded-[24px] bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="text-[18px] font-bold text-slate-900">Ứng tuyển công việc</h3>
            <button 
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6 rounded-2xl bg-cyan-50 p-4">
              <p className="text-[13px] font-bold text-cyan-600 uppercase tracking-wider mb-1">Đang ứng tuyển:</p>
              <h4 className="text-[16px] font-extrabold text-slate-900 leading-tight">{jobTitle}</h4>
            </div>

            <h5 className="mb-4 text-[15px] font-bold text-slate-700">Chọn CV của bạn:</h5>

            <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-3 mb-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Loader2 className="animate-spin text-cyan-500" size={32} />
                  <p className="mt-2 text-[14px] text-slate-500">Đang tải danh sách CV...</p>
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <AlertCircle size={32} className="text-red-400 mb-2" />
                  <p className="text-[14px] text-slate-500">Không thể tải danh sách CV</p>
                </div>
              ) : resumes.length > 0 ? (
                resumes.map((cv) => (
                  <div 
                    key={cv.resumeId}
                    onClick={() => setSelectedCvUrl(cv.cvUrl)}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${
                      selectedCvUrl === cv.cvUrl 
                        ? "border-cyan-500 bg-cyan-50/30 shadow-sm" 
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        selectedCvUrl === cv.cvUrl ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-400"
                      }`}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className={`text-[14px] font-bold ${selectedCvUrl === cv.cvUrl ? "text-slate-900" : "text-slate-600"}`}>
                          {cv.resumeName}
                        </p>
                        {cv.isDefault && (
                          <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-tighter">Mặc định</span>
                        )}
                      </div>
                    </div>
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                      selectedCvUrl === cv.cvUrl ? "border-cyan-500 bg-cyan-500" : "border-slate-200"
                    }`}>
                      {selectedCvUrl === cv.cvUrl && <Check size={12} className="text-white" strokeWidth={4} />}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                  <FileText size={40} className="text-slate-200 mb-2" />
                  <p className="text-[14px] text-slate-500 font-medium">Bạn chưa có CV nào trong hệ thống</p>
                  <a href="/student/profile" className="text-[13px] font-bold text-cyan-600 hover:underline mt-2">
                    Tạo CV ngay
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={onClose}
                className="h-12 flex-1 rounded-xl border border-slate-200 text-[15px] font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Hủy
              </button>
              <button 
                disabled={isSubmitting || !selectedCvUrl || resumes.length === 0 || !isStudent}
                onClick={onApply}
                className="h-12 flex-1 rounded-xl bg-cyan-500 text-[15px] font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Xác nhận ứng tuyển"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
