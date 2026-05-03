"use client";

import { AlertTriangle, X } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";
import { StudentResume } from "../../../types/student.types";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cv: StudentResume | null;
  isDeleting: boolean;
};

export default function DeleteCVModal({ open, onClose, onConfirm, cv, isDeleting }: Props) {
  if (!open || !cv) return null;

  return (
    <ClientPortal>
      <div 
        className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="w-full max-w-[450px] overflow-hidden rounded-[24px] bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                <AlertTriangle size={32} />
              </div>
              <h3 className="mb-2 text-[20px] font-bold text-slate-900">Xác nhận xóa CV</h3>
              <p className="text-[15px] leading-relaxed text-slate-500">
                Bạn có chắc chắn muốn xóa CV <span className="font-bold text-slate-800">"{cv.resumeName}"</span>? 
                Hành động này không thể hoàn tác.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                disabled={isDeleting}
                onClick={onConfirm}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-red-500 text-[15px] font-bold text-white transition hover:bg-red-600 active:scale-95 disabled:opacity-50"
              >
                {isDeleting ? "Đang xóa..." : "Xác nhận xóa"}
              </button>
              <button 
                disabled={isDeleting}
                onClick={onClose}
                className="h-12 w-full rounded-xl border border-slate-200 text-[15px] font-bold text-slate-600 transition hover:bg-slate-50 active:scale-95 disabled:opacity-50"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
