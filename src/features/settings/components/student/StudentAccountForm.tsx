"use client";

import { User, Mail, Phone, FileText, Save, Loader2 } from "lucide-react";

type StudentAccountFormProps = {
  fullName: string;
  setFullName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  studentCode: string;
  isUpdatingInfo: boolean;
  onUpdateInfo: () => void;
};

export default function StudentAccountForm({
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  studentCode,
  isUpdatingInfo,
  onUpdateInfo,
}: StudentAccountFormProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-[14px] font-bold text-slate-700">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-cyan-500 transition-colors">
            <User className="text-slate-400" size={20} />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isUpdatingInfo}
              placeholder="Nguyễn Văn A"
              className="w-full text-base text-slate-800 outline-none placeholder:text-slate-400 disabled:bg-transparent"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[14px] font-bold text-slate-700">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-cyan-500 transition-colors">
            <Mail className="text-slate-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isUpdatingInfo}
              placeholder="nguyenvana@student.edu.vn"
              className="w-full text-base text-slate-800 outline-none placeholder:text-slate-400 disabled:bg-transparent"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[14px] font-bold text-slate-700">
            Số điện thoại
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-cyan-500 transition-colors">
            <Phone className="text-slate-400" size={20} />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isUpdatingInfo}
              placeholder="0123456789"
              className="w-full text-base text-slate-800 outline-none placeholder:text-slate-400 disabled:bg-transparent"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[14px] font-bold text-slate-700">
            MSSV
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 cursor-default">
            <FileText className="text-slate-400" size={20} />
            <input
              type="text"
              value={studentCode}
              readOnly
              className="w-full text-base text-slate-700 outline-none bg-transparent cursor-default"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onUpdateInfo}
          disabled={isUpdatingInfo}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isUpdatingInfo ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Đang cập nhật...</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Cập nhật thông tin</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
