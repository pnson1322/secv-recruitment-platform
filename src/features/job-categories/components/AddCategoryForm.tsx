"use client";

import React, { useState } from "react";
import { Plus, Info } from "lucide-react";

type Props = {
  onSubmit: (name: string) => void;
  isLoading: boolean;
};

export default function AddCategoryForm({ onSubmit, isLoading }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName("");
    }
  };

  return (
    <div className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Plus size={20} strokeWidth={3} />
        </div>
        <h3 className="text-[17px] font-bold text-slate-900">Thêm thể loại mới</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-[13px] font-bold text-slate-700">
            Tên thể loại <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Cloud Computing, Blockchain..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-[14px] font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3.5 text-[15px] font-bold text-white transition-all hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={18} strokeWidth={3} />
          {isLoading ? "Đang xử lý..." : "Thêm thể loại"}
        </button>

        <div className="flex gap-2.5 rounded-xl bg-amber-50/50 p-3.5 border border-amber-100/50">
          <Info size={16} className="shrink-0 text-amber-500 mt-0.5" />
          <p className="text-[12px] font-medium leading-relaxed text-amber-700/80">
            <span className="font-bold">Lưu ý:</span> Thể loại mới sẽ tự động được kích hoạt ngay sau khi thêm vào hệ thống.
          </p>
        </div>
      </form>
    </div>
  );
}
