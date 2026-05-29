"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  categoryName: string;
};

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  categoryName,
}: Props) {
  if (!isOpen) return null;

  return (
    <ClientPortal>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        <div 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200" 
          onClick={onClose} 
        />
        
        <div className="relative w-full max-w-md scale-100 rounded-[28px] bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200">
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <AlertTriangle size={32} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">Xác nhận xóa thể loại</h3>
            <p className="mt-3 text-[15px] font-medium leading-relaxed text-slate-500">
              Bạn có chắc chắn muốn xóa thể loại <span className="font-bold text-slate-900">&quot;{categoryName}&quot;</span>? 
              Hành động này không thể hoàn tác và sẽ ảnh hưởng đến các tin tuyển dụng liên quan.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3">
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-2xl bg-red-500 py-4 text-[15px] font-bold text-white transition-all hover:bg-red-600 active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? "Đang xóa..." : "Xác nhận xóa"}
              </button>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="w-full rounded-2xl bg-slate-50 py-4 text-[15px] font-bold text-slate-600 transition-all hover:bg-slate-100 active:scale-[0.98] disabled:opacity-50"
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
