"use client";

import { FileText, Download, Eye, Trash2, Upload, Lightbulb } from "lucide-react";
import { StudentResume } from "../../types/student.types";
import { handleDownloadCV } from "@/utils/downloadCV";
import { toast } from "sonner";

type Props = {
  resumes: StudentResume[];
  onSetDefault: (resumeId: number) => Promise<void>;
  onView: (cv: StudentResume) => void;
  onDeleteClick: (cv: StudentResume) => void;
  onUploadClick: () => void;
  isDeleting: number | null;
};

export default function CVManagementSection({ resumes, onSetDefault, onView, onDeleteClick, onUploadClick, isDeleting }: Props) {
  const getFormattedUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const cleanBaseUrl = baseUrl.replace(/\/$/, "");
    const cleanUrl = url.replace(/^\//, "");
    return `${cleanBaseUrl}/${cleanUrl}`;
  };

  const onDownload = (cvUrl: string, name: string) => {
    const fullUrl = getFormattedUrl(cvUrl);
    toast.promise(handleDownloadCV(fullUrl, `CV_${name.replace(/\s+/g, "_")}.pdf`), {
      loading: "Đang chuẩn bị tệp tin...",
      success: "Tải xuống thành công!",
      error: "Không thể tải tệp tin",
    });
  };

  const sortedResumes = [...resumes].sort((a, b) => {
    if (a.isDefault && !b.isDefault) return -1;
    if (!a.isDefault && b.isDefault) return 1;
    return a.resumeId - b.resumeId;
  });

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
          <FileText size={22} />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-slate-900 uppercase">Quản lý CV</h2>
          <p className="text-[14px] text-slate-500">Bạn có thể tải lên và quản lý nhiều CV khác nhau để sử dụng cho các vị trí ứng tuyển.</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {sortedResumes.length > 0 ? (
          sortedResumes.map((cv) => (
            <div 
              key={cv.resumeId}
              className={`group relative flex flex-col gap-4 rounded-[24px] border p-6 transition-all duration-300 ${
                cv.isDefault 
                  ? "border-emerald-500 bg-emerald-50/10 shadow-[0_0_20px_-10px_rgba(16,185,129,0.3)]" 
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    cv.isDefault ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                  }`}>
                    <FileText size={28} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900">{cv.resumeName}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[13px] text-slate-400 font-medium">PDF/DOCX</span>
                      <span className="text-[13px] text-slate-400 font-medium italic underline">Cập nhật mới đây</span>
                    </div>
                  </div>
                </div>

                {cv.isDefault && (
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                    CV mặc định
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {!cv.isDefault && (
                  <button
                    onClick={() => onSetDefault(cv.resumeId)}
                    className="h-9 rounded-lg bg-cyan-500 px-4 text-[13px] font-bold text-white transition hover:bg-cyan-600 active:scale-95"
                  >
                    Đặt mặc định
                  </button>
                )}
                <button 
                  onClick={() => onView(cv)}
                  className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-95"
                >
                  <Eye size={16} />
                  Xem
                </button>
                <button 
                  onClick={() => onDownload(cv.cvUrl, cv.resumeName)}
                  className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-95"
                >
                  <Download size={16} />
                  Tải xuống
                </button>
                <button 
                  disabled={isDeleting === cv.resumeId}
                  onClick={() => onDeleteClick(cv)}
                  className="flex h-9 items-center gap-2 rounded-lg border border-red-100 bg-red-50/30 px-4 text-[13px] font-semibold text-red-600 transition hover:bg-red-50 active:scale-95 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  {isDeleting === cv.resumeId ? "Đang xóa..." : "Xóa"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-100 rounded-[24px]">
             <FileText size={48} className="text-slate-200 mb-4" />
             <p className="text-[16px] font-bold text-slate-400">Bạn chưa có CV nào</p>
             <p className="text-[14px] text-slate-400 mt-1">Hãy tải lên CV đầu tiên để bắt đầu ứng tuyển</p>
          </div>
        )}

        <button 
          onClick={onUploadClick}
          className="flex w-full items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-cyan-300 py-6 text-[15px] font-bold text-cyan-600 transition hover:bg-cyan-50 hover:border-cyan-400 active:scale-[0.99]"
        >
          <Upload size={20} />
          Tải lên CV mới
        </button>
      </div>

      <div className="rounded-2xl bg-blue-50/50 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={18} className="text-amber-500" />
          <h4 className="text-[14px] font-bold text-slate-700">Gợi ý:</h4>
        </div>
        <ul className="space-y-1.5 text-[13px] font-medium text-slate-500">
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-slate-400"></span>
            Định dạng: PDF
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-slate-400"></span>
            Kích thước tối đa: 5MB/file
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-slate-400"></span>
            CV mặc định sẽ được dùng khi ứng tuyển nhanh
          </li>
        </ul>
      </div>
    </section>
  );
}
