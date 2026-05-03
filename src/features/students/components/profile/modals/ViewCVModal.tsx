"use client";

import { X, Download, FileText } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";
import { StudentResume } from "../../../types/student.types";
import { handleDownloadCV } from "@/utils/downloadCV";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  cv: StudentResume | null;
};

export default function ViewCVModal({ open, onClose, cv }: Props) {
  if (!open || !cv) return null;

  const getFormattedUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const cleanBaseUrl = baseUrl.replace(/\/$/, "");
    const cleanUrl = url.replace(/^\//, "");
    return `${cleanBaseUrl}/${cleanUrl}`;
  };

  const displayUrl = getFormattedUrl(cv.cvUrl);

  const onDownload = () => {
    toast.promise(handleDownloadCV(displayUrl, cv.resumeName), {
      loading: "Đang chuẩn bị tệp tin...",
      success: "Tải xuống thành công!",
      error: "Không thể tải tệp tin",
    });
  };

  return (
    <ClientPortal>
      <div 
        className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="flex h-[90vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">
                <FileText size={18} />
              </div>
              <h3 className="text-[16px] font-bold text-slate-800 truncate max-w-[300px] md:max-w-none">
                {cv.resumeName}
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative flex-1 bg-slate-50 p-6 overflow-hidden">
            <div className="h-full w-full rounded-xl border border-slate-200 bg-white shadow-inner overflow-hidden">
              <iframe 
                src={`${displayUrl}#toolbar=0`}
                className="h-full w-full"
                title="CV Preview"
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity bg-white/50">
                 <FileText size={48} className="text-slate-300 mb-4" />
                 <p className="text-slate-500 font-medium">Đang hiển thị bản xem trước...</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
            <button 
              onClick={onClose}
              className="h-11 rounded-xl border border-slate-200 px-8 text-[14px] font-bold text-slate-600 transition hover:bg-slate-50 active:scale-95"
            >
              Đóng
            </button>
            <button 
              onClick={onDownload}
              className="flex h-11 items-center gap-2 rounded-xl bg-cyan-500 px-8 text-[14px] font-bold text-white transition hover:bg-cyan-600 active:scale-95 shadow-lg shadow-cyan-500/20"
            >
              <Download size={18} />
              Tải xuống
            </button>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
