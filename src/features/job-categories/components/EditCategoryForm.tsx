"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Save, X, Info } from "lucide-react";
import type { JobCategoriesDataItem } from "../types/job-categories.types";

type Props = {
  category: JobCategoriesDataItem;
  onSubmit: (name: string) => void;
  onCancel: () => void;
  isLoading: boolean;
};

export default function EditCategoryForm({ category, onSubmit, onCancel, isLoading }: Props) {
  const [name, setName] = useState(category.categoryName);

  useEffect(() => {
    setName(category.categoryName);
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && name.trim() !== category.categoryName) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="rounded-[24px] border border-blue-100 bg-white p-6 shadow-md ring-1 ring-blue-50">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
          <Pencil size={18} />
        </div>
        <h3 className="text-[17px] font-bold text-slate-900">Chỉnh sửa thể loại</h3>
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
            className="w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-[14px] font-bold text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            required
            autoFocus
          />
        </div>

        <div className="flex gap-2.5 rounded-xl bg-blue-50/50 p-4 border border-blue-100/50">
          <p className="text-[13px] font-medium text-blue-700">
            Đang chỉnh sửa: <span className="font-bold text-blue-900">{category.categoryName}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading || !name.trim() || name.trim() === category.categoryName}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-cyan-100 transition-all hover:bg-cyan-600 hover:shadow-cyan-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            <Save size={18} />
            {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border-2 border-slate-100 bg-white text-slate-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 hover:shadow-lg hover:shadow-red-50 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
            title="Hủy bỏ"
          >
            <X size={22} strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </div>
  );
}
