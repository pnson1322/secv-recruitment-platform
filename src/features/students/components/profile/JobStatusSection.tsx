"use client";

import { Briefcase, Info, Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
  isOpenToWork: boolean;
  onUpdate: (isOpenToWork: boolean) => Promise<void>;
  isLoading?: boolean;
};

const STATUS_OPTIONS = [
  { id: "active", label: "Đang tìm việc", value: true, color: "text-cyan-600", bg: "bg-cyan-50/50", border: "border-cyan-200" },
  { id: "not-searching", label: "Không tìm việc", value: false, color: "text-slate-600", bg: "bg-white", border: "border-slate-200" },
];

export default function JobStatusSection({ isOpenToWork, onUpdate, isLoading = false }: Props) {
  const [selectedStatus, setSelectedStatus] = useState(isOpenToWork ? "active" : "not-searching");
  const [prevIsOpenToWork, setPrevIsOpenToWork] = useState(isOpenToWork);

  if (isOpenToWork !== prevIsOpenToWork) {
    setPrevIsOpenToWork(isOpenToWork);
    setSelectedStatus(isOpenToWork ? "active" : "not-searching");
  }

  const handleSave = async () => {
    const newValue = selectedStatus === "active";
    await onUpdate(newValue);
  };

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
          <Briefcase size={22} />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-slate-900 uppercase">Trạng thái tìm việc</h2>
          <p className="text-[14px] text-slate-500">Cập nhật để nhà tuyển dụng tìm thấy bạn:</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {STATUS_OPTIONS.map((opt) => (
          <div 
            key={opt.id}
            onClick={() => setSelectedStatus(opt.id)}
            className={`flex cursor-pointer items-center justify-between rounded-[20px] border p-4 transition-all duration-300 ${
              selectedStatus === opt.id ? `${opt.bg} ${opt.border} shadow-sm` : "border-slate-100 bg-white hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                selectedStatus === opt.id ? "border-cyan-500 bg-cyan-500" : "border-slate-300"
              }`}>
                {selectedStatus === opt.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
              </div>
              <span className={`text-[15px] font-bold ${selectedStatus === opt.id ? "text-slate-900" : "text-slate-500"}`}>
                {opt.label}
              </span>
            </div>
            {selectedStatus === opt.id && <Check size={18} className="text-cyan-500" />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-blue-50/50 p-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Info size={18} className="text-blue-500" />
          <h4 className="text-[14px] font-bold text-slate-700">Khi bật &quot;Đang tìm việc&quot;:</h4>
        </div>
        <ul className="space-y-1.5 text-[13px] font-medium text-slate-500">
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-slate-400"></span>
            Nhà tuyển dụng có thể tìm thấy hồ sơ của bạn
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-slate-400"></span>
            Nhận gợi ý việc làm phù hợp từ hệ thống
          </li>
        </ul>
      </div>

      <button 
        onClick={handleSave}
        disabled={isLoading || (selectedStatus === (isOpenToWork ? "active" : "not-searching"))}
        className="flex w-full items-center justify-center gap-2 rounded-[20px] bg-cyan-500 py-4 text-[16px] font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600 hover:shadow-cyan-500/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {isLoading && <Loader2 size={18} className="animate-spin" />}
        Lưu thay đổi
      </button>
    </section>
  );
}
