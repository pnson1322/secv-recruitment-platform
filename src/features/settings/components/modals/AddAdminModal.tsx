"use client";

import { useState } from "react";
import { Mail, Lock, X, Plus, Loader2, Eye, EyeOff } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";
import { useAddAdminForm } from "../../hooks/useAddAdminForm";

type AddAdminModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: { email: string; password?: string }) => Promise<void>;
  isLoading: boolean;
};

export default function AddAdminModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: AddAdminModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    email,
    password,
    emailError,
    passwordError,
    handleEmailChange,
    handlePasswordChange,
    handleConfirm,
    handleClose,
  } = useAddAdminForm({ onSubmit, onClose });

  const handleModalClose = () => {
    setShowPassword(false);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <ClientPortal>
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/35 px-4">
        <div className="w-full max-w-140 overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h2 className="text-xl font-bold text-slate-800">
              Thêm Admin mới
            </h2>
            <button
              type="button"
              onClick={handleModalClose}
              disabled={isLoading}
              className="text-slate-400 transition hover:text-slate-600 disabled:opacity-50"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-5 px-6 py-6">
            <div>
              <label className="mb-2 block text-[14px] font-bold text-slate-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors ${
                emailError ? "border-red-500" : "border-slate-200 focus-within:border-cyan-500"
              }`}>
                <Mail className="text-slate-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  disabled={isLoading}
                  placeholder="admin@fit.edu.vn"
                  className="w-full text-base text-slate-800 outline-none placeholder:text-slate-400 disabled:bg-transparent"
                />
              </div>
              {emailError && (
                <p className="mt-1.5 text-[13px] font-semibold text-red-500">
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-[14px] font-bold text-slate-700">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors ${
                passwordError ? "border-red-500" : "border-slate-200 focus-within:border-cyan-500"
              }`}>
                <Lock className="text-slate-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  disabled={isLoading}
                  placeholder="Tối thiểu 8 ký tự"
                  className="w-full text-base text-slate-800 outline-none placeholder:text-slate-400 disabled:bg-transparent"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleConfirm();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1.5 text-[13px] font-semibold text-red-500">
                  {passwordError}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={handleModalClose}
              disabled={isLoading}
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
            >
              Hủy
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Đang thêm...</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>Thêm Admin</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
