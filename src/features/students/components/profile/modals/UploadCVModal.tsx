"use client";

import { X, Upload, FileText, AlertCircle } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { uploadResume } from "../../../api/student.api";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function UploadCVModal({ open, onClose, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleFile = (selectedFile: File) => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File quá lớn. Vui lòng chọn file dưới 5MB");
      return;
    }
    if (!selectedFile.type.includes("pdf") && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Chỉ hỗ trợ định dạng PDF");
      return;
    }
    setFile(selectedFile);
    // Luôn cập nhật tên hiển thị nếu chưa nhập hoặc đang để tên mặc định của file cũ
    setResumeName(selectedFile.name.replace(/\.[^/.]+$/, ""));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Ngăn chặn sự kiện click của parent bị kích hoạt
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onUpload = async () => {
    if (!file) {
      toast.error("Vui lòng chọn file CV");
      return;
    }

    setIsUploading(true);
    try {
      await uploadResume(file, resumeName || file.name);
      toast.success("Tải lên CV thành công");
      onSuccess();
      handleClose();
    } catch (error) {
      toast.error("Lỗi khi tải lên CV");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setResumeName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };

  return (
    <ClientPortal>
      <div 
        className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        onClick={handleClose}
      >
        <div 
          className="w-full max-w-[500px] overflow-hidden rounded-[24px] bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="text-[18px] font-bold text-slate-900">Tải lên CV mới</h3>
            <button 
              onClick={handleClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <label className="mb-2 block text-[14px] font-bold text-slate-700">Tên hiển thị CV</label>
              <input 
                type="text"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                placeholder="Ví dụ: CV_Fullstack_2024"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[14px] outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>

            <label 
              htmlFor="cv-upload-input"
              onDragOver={onDragOver}
              onDrop={onDrop}
              className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-all ${
                file ? "border-cyan-500 bg-cyan-50/30" : "border-slate-200 hover:border-cyan-300 hover:bg-slate-50"
              }`}
            >
              <input 
                id="cv-upload-input"
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
                accept=".pdf"
              />
              
              {file ? (
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/30">
                    <FileText size={28} />
                  </div>
                  <p className="text-[15px] font-bold text-slate-800 truncate max-w-[300px]">{file.name}</p>
                  <p className="text-[13px] text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setFile(null);
                      setResumeName("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="mt-3 text-[13px] font-bold text-red-500 hover:underline relative z-10"
                  >
                    Chọn file khác
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center pointer-events-none">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition group-hover:bg-cyan-100 group-hover:text-cyan-500">
                    <Upload size={32} />
                  </div>
                  <p className="text-[15px] font-bold text-slate-800">Nhấp để chọn tệp tin hoặc kéo thả</p>
                  <p className="mt-1 text-[13px] text-slate-500">Chỉ hỗ trợ định dạng PDF (Tối đa 5MB)</p>
                </div>
              )}
            </label>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={handleClose}
                className="h-12 flex-1 rounded-xl border border-slate-200 text-[15px] font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Hủy
              </button>
              <button 
                disabled={!file || isUploading}
                onClick={onUpload}
                className="h-12 flex-1 rounded-xl bg-cyan-500 text-[15px] font-bold text-white transition hover:bg-cyan-600 active:scale-95 disabled:opacity-50 shadow-lg shadow-cyan-500/20"
              >
                {isUploading ? "Đang tải..." : "Tải lên ngay"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
