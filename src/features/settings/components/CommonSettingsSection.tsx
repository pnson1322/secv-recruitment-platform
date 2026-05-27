"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useChangePasswordFlow } from "@/features/auth/hooks/useChangePasswordFlow";
import ChangePasswordModal from "@/features/auth/components/change-password/ChangePasswordModal";
import ForgotPasswordFlow from "@/features/auth/components/forgot-password/ForgotPasswordFlow";

export default function CommonSettingsSection() {
  const router = useRouter();
  const { logout } = useAuth();
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const {
    isOpen: isChangeOpen,
    openChangePassword,
    closeChangePassword,
    submitChangePassword,
    isChangingPassword,
  } = useChangePasswordFlow();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-500">
            <Lock size={22} />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-slate-900">
              Đổi mật khẩu
            </h2>
            <p className="mt-1 text-[14px] text-slate-500">
              Để bảo mật tài khoản, bạn nên thay đổi mật khẩu định kỳ
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={openChangePassword}
            className="rounded-xl bg-cyan-500 px-5 py-2.5 text-[14px] font-bold text-white shadow-sm transition hover:bg-cyan-600 active:scale-[0.98]"
          >
            Đổi mật khẩu
          </button>

          <button
            type="button"
            onClick={() => setIsForgotOpen(true)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[14px] font-bold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
          >
            Quên mật khẩu?
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white py-3.5 text-[15px] font-bold text-red-600 transition hover:bg-red-50 hover:border-red-300 active:scale-[0.98]"
        >
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </section>

      <ChangePasswordModal
        isOpen={isChangeOpen}
        isLoading={isChangingPassword}
        onClose={closeChangePassword}
        onCancel={closeChangePassword}
        onSubmit={submitChangePassword}
        onForgotPassword={() => {
          closeChangePassword();
          setIsForgotOpen(true);
        }}
      />

      <ForgotPasswordFlow open={isForgotOpen} onOpenChange={setIsForgotOpen} />
    </>
  );
}
