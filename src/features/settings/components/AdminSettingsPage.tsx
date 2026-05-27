"use client";

import {
  Users,
  Plus,
  Trash2,
  Mail,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  UserX,
} from "lucide-react";
import { useAdminSettings } from "../hooks/useAdminSettings";
import CommonSettingsSection from "./CommonSettingsSection";
import AddAdminModal from "./modals/AddAdminModal";
import ClientPortal from "@/components/ClientPortal";

export default function AdminSettingsPage() {
  const {
    user,
    admins,
    isLoading,
    isError,
    refetch,
    isAddOpen,
    setIsAddOpen,
    isAddingAdmin,
    handleAddAdmin,
    deleteTarget,
    setDeleteTarget,
    isDeletingAdmin,
    handleDeleteAdmin,
    currentPage,
    totalPages,
    paginatedAdmins,
    handlePageChange,
    showPagination,
    formatDate,
  } = useAdminSettings();

  return (
    <div className="mx-auto max-w-[1000px] px-4 pt-5 pb-10 md:px-8">
      <div className="flex flex-col gap-6">
        
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-500">
                <Users size={22} />
              </div>
              <div>
                <h2 className="text-[18px] font-bold text-slate-900">
                  Quản lý tài khoản Admin
                </h2>
                <p className="mt-0.5 text-[13px] text-slate-500">
                  Danh sách tài khoản quản trị viên hệ thống
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-[14px] font-bold text-white shadow-sm transition hover:bg-cyan-600 active:scale-[0.98]"
            >
              <Plus size={16} />
              <span>Thêm Admin</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="w-full space-y-4 py-4">
                <div className="h-6 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-50" />
                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-50" />
                <div className="h-12 w-full animate-pulse rounded-xl bg-slate-50" />
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <AlertTriangle size={28} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-800">
                  Đã xảy ra lỗi khi tải dữ liệu
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Vui lòng thử lại sau hoặc bấm nút tải lại bên dưới.
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-4 rounded-xl bg-slate-900 px-5 py-2 text-[14px] font-semibold text-white transition hover:bg-slate-800"
                >
                  Tải lại dữ liệu
                </button>
              </div>
            ) : admins.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                  <UserX size={32} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-800">
                  Chưa có tài khoản Admin nào
                </h3>
                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  Hiện tại hệ thống chưa ghi nhận tài khoản quản trị nào ngoài tài khoản của bạn.
                </p>
                <button
                  type="button"
                  onClick={() => setIsAddOpen(true)}
                  className="mt-4 flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2 text-[13px] font-bold text-white shadow-sm transition hover:bg-cyan-600"
                >
                  <Plus size={14} />
                  <span>Thêm Admin đầu tiên</span>
                </button>
              </div>
            ) : (
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[13px] font-bold uppercase text-slate-400">
                    <th className="pb-3 pr-4 font-semibold">ID</th>
                    <th className="pb-3 px-4 font-semibold">Email</th>
                    <th className="pb-3 px-4 font-semibold">Ngày tạo</th>
                    <th className="pb-3 px-4 font-semibold">Đăng nhập gần nhất</th>
                    <th className="pb-3 pl-4 text-right font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedAdmins.map((admin) => {
                    const isSelf = admin.email === user?.email;
                    return (
                      <tr key={admin.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 pr-4 text-[14px] font-semibold text-slate-500">
                          #{admin.id}
                        </td>
                        <td className="py-4 px-4 text-[14px] font-medium text-slate-700">
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-slate-400" />
                            <span>{admin.email}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[14px] text-slate-500">
                          {formatDate(admin.createdAt)}
                        </td>
                        <td className="py-4 px-4 text-[14px] text-slate-500">
                          {formatDate(admin.lastLogin)}
                        </td>
                        <td className="py-4 pl-4 text-right">
                          {!isSelf && (
                            <button
                              type="button"
                              onClick={() => setDeleteTarget({ id: admin.id, email: admin.email })}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-1.5 text-[13px] font-bold text-red-600 transition hover:bg-red-50 hover:border-red-300"
                            >
                              <Trash2 size={14} className="h-4 w-4" />
                              <span>Xóa</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {showPagination && (
            <div className="mt-6 flex justify-center border-t border-slate-100 pt-4">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-[14px] font-bold transition ${
                      currentPage === page
                        ? "bg-cyan-500 text-white shadow-sm shadow-cyan-500/10"
                        : "border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </section>

        <CommonSettingsSection />
      </div>

      <AddAdminModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddAdmin}
        isLoading={isAddingAdmin}
      />

      {deleteTarget && (
        <ClientPortal>
          <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/35 px-4">
            <div className="w-full max-w-110 overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <Trash2 size={28} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-800">
                  Xác nhận xóa tài khoản
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-slate-500">
                  Bạn có chắc chắn muốn xóa tài khoản admin <span className="font-semibold text-slate-700">{deleteTarget.email}</span>? Hành động này không thể hoàn tác.
                </p>
              </div>

              <div className="flex gap-3 bg-slate-50 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={isDeletingAdmin}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-[14px] font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteAdmin(deleteTarget.id)}
                  disabled={isDeletingAdmin}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600 py-2.5 text-[14px] font-bold text-white transition hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isDeletingAdmin ? (
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Đang xóa...</span>
                    </div>
                  ) : (
                    <span>Xóa tài khoản</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </ClientPortal>
      )}
    </div>
  );
}
