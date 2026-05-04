"use client";

import React from "react";
import { Layers, Pencil, Trash2 } from "lucide-react";
import type { JobCategoriesDataItem } from "../types/job-categories.types";
import Pagination from "@/components/Pagination";

type Props = {
  categories: JobCategoriesDataItem[];
  isLoading: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (category: JobCategoriesDataItem) => void;
  editingId?: number;
  meta?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  onPageChange: (page: number) => void;
};

export default function JobCategoriesTable({
  categories,
  isLoading,
  onToggle,
  onDelete,
  onEdit,
  editingId,
  meta,
  onPageChange,
}: Props) {
  if (isLoading) {
    return (
      <div className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-50" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-slate-100 bg-white shadow-sm overflow-hidden">
      <div className="p-7">
        <h3 className="text-[18px] font-bold text-slate-900">Danh sách thể loại</h3>
        <p className="mt-1 text-[13px] font-medium text-slate-500">
          Quản lý tất cả thể loại công việc trong hệ thống
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-y border-slate-50 bg-slate-50/30">
              <th className="px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Tên thể loại
              </th>
              <th className="px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
                Số tin tuyển dụng
              </th>
              <th className="px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
                Trạng thái
              </th>
              <th className="px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {categories.map((category) => {
              const isEditing = editingId === category.categoryId;
              return (
                <tr 
                  key={category.categoryId} 
                  className={`group transition-all duration-200 ${
                    isEditing ? "bg-blue-50/70" : "hover:bg-slate-50/50"
                  }`}
                >
                  <td className="px-7 py-5">
                    <div className="flex items-center gap-3.5">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isEditing ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-500 group-hover:bg-blue-100"
                      }`}>
                        <Layers size={18} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[14.5px] font-bold ${
                          isEditing ? "text-blue-700" : "text-slate-900"
                        }`}>
                          {category.categoryName}
                        </span>
                        {isEditing && (
                          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 animate-pulse">
                            Đang sửa
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-7 py-5 text-center">
                    <span className={`text-[14px] font-bold ${
                      isEditing ? "text-blue-600" : "text-slate-600"
                    }`}>
                      {category.jobCount} <span className="font-medium text-slate-400">tin</span>
                    </span>
                  </td>
                  <td className="px-7 py-5">
                    <div className="flex justify-center">
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={category.isActive}
                          onChange={() => onToggle(category.categoryId)}
                        />
                        <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-100"></div>
                        <span className={`ml-3 text-[14px] font-bold ${
                          isEditing ? "text-blue-600" : "text-slate-600"
                        }`}>
                          {category.isActive ? "Đang bật" : "Đã tắt"}
                        </span>
                      </label>
                    </div>
                  </td>
                  <td className="px-7 py-5">
                    <div className="flex items-center justify-center gap-2.5">
                      <button 
                        onClick={() => onEdit(category)}
                        className={`flex h-9 items-center gap-2 rounded-xl border px-4 text-[13px] font-bold transition-all active:scale-95 ${
                          isEditing 
                            ? "border-blue-200 bg-blue-100 text-blue-700 shadow-sm" 
                            : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md hover:shadow-blue-50"
                        }`}
                      >
                        <Pencil size={14} />
                        Sửa
                      </button>
                      <button 
                        onClick={() => onDelete(category.categoryId)}
                        className="flex h-9 items-center gap-2 rounded-xl border border-red-100 bg-white px-4 text-[13px] font-bold text-red-500 transition-all hover:border-red-200 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-100 active:scale-95"
                      >
                        <Trash2 size={14} />
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {categories.length === 0 && !isLoading && (
              <tr>
                <td colSpan={4} className="px-7 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                      <Layers size={32} />
                    </div>
                    <h4 className="text-[16px] font-bold text-slate-900">Chưa có thể loại nào</h4>
                    <p className="mt-1 text-[13px] font-medium text-slate-500">
                      Hãy thêm thể loại mới để bắt đầu quản lý
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="border-t border-slate-50 p-6">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-slate-500">
              Hiển thị <span className="font-bold text-slate-900">{categories.length}</span> / <span className="font-bold text-slate-900">{meta.totalItems}</span> thể loại
            </span>
            <Pagination
              currentPage={meta.currentPage}
              totalPages={meta.totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
