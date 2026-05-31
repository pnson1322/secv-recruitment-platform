"use client";

import { Target, PenLine, MapPin, Wallet, X, Check, Loader2 } from "lucide-react";
import { useJobPreference } from "../../hooks/useJobPreference";
import CustomSelect from "@/components/CustomSelect";

const LOCATIONS = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Bình Dương",
  "Đà Nẵng",
  "Đồng Nai",
  "Long An",
  "Bà Rịa - Vũng Tàu",
  "Hải Phòng",
  "Bắc Ninh",
  "Cần Thơ",
  "Hà Nam",
  "Quảng Nam",
  "Hưng Yên",
  "Vĩnh Phúc",
  "Thừa Thiên Huế",
  "Khánh Hòa",
  "Hải Dương",
  "Tiền Giang",
  "Thanh Hóa",
  "Nam Định",
  "Bắc Giang",
  "Thái Bình",
  "Phú Thọ",
  "Nghệ An",
  "Quảng Ngãi",
  "Bình Định",
  "Quảng Ninh",
  "Lâm Đồng",
  "Kiên Giang",
  "Tây Ninh",
  "An Giang",
  "Hậu Giang",
  "Trà Vinh",
  "Bình Phước",
  "Đồng Tháp",
  "Bến Tre",
  "Vĩnh Long",
  "Lào Cai",
  "Sơn La",
  "Thái Nguyên",
  "Hòa Bình",
  "Sóc Trăng",
  "Yên Bái",
  "Phú Yên",
  "Cà Mau",
  "Lạng Sơn",
  "Tuyên Quang",
  "Bình Thuận",
  "Đắk Lắk",
  "Quảng Trị",
  "Đắk Nông",
  "Gia Lai",
  "Hà Giang",
  "Kon Tum",
  "Bắc Kạn",
  "Cao Bằng",
  "Điện Biên",
  "Lai Châu",
  "Ninh Thuận",
  "Quảng Bình",
];

const LOCATION_OPTIONS = LOCATIONS.sort().map((loc) => ({ label: loc, value: loc }));

export default function JobPreferenceSection() {
  const {
    preference,
    isLoading,
    isError,
    isEditing,
    setIsEditing,
    desiredLocation,
    setDesiredLocation,
    salaryMinStr,
    setSalaryMinStr,
    salaryMaxStr,
    setSalaryMaxStr,
    isUpdating,
    handleSave,
    formatSalaryDisplay,
    handleCancel,
  } = useJobPreference();

  if (isLoading) {
    return (
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm animate-pulse">
        <div className="h-6 w-48 bg-slate-100 rounded-md mb-6" />
        <div className="space-y-4">
          <div className="h-10 w-full bg-slate-50 rounded-xl" />
          <div className="h-10 w-full bg-slate-50 rounded-xl" />
        </div>
      </section>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
            <Target size={22} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 uppercase">Nguyện vọng công việc</h2>
            <p className="text-[14px] text-slate-500">Đặt thông tin mức lương và địa điểm mong muốn của bạn:</p>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 text-[13px] font-bold text-slate-600 transition hover:bg-slate-50 hover:text-cyan-600"
          >
            <PenLine size={15} />
            Chỉnh sửa
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-[14px] font-semibold text-slate-700">
              Địa điểm mong muốn
            </label>
            <div className="relative [&_button]:pl-11 [&_button]:rounded-2xl [&_button]:h-12 [&_button_span]:text-[15px]">
              <div className="absolute inset-y-0 left-4 z-10 flex items-center pointer-events-none text-slate-400">
                <MapPin size={18} />
              </div>
              <CustomSelect
                label=""
                placeholder="Chọn địa điểm mong muốn"
                value={desiredLocation}
                options={LOCATION_OPTIONS}
                onChange={setDesiredLocation}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[14px] font-semibold text-slate-700">
              Mức lương mong muốn (VND)
            </label>
            <div className="grid items-center gap-4 md:grid-cols-[1fr_24px_1fr]">
              <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
                <Wallet size={18} className="text-slate-400" />
                <input
                  type="number"
                  placeholder="Lương tối thiểu, ví dụ: 5000000"
                  value={salaryMinStr}
                  onChange={(e) => setSalaryMinStr(e.target.value)}
                  className="w-full bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <span className="text-center text-slate-400 font-semibold">-</span>

              <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
                <Wallet size={18} className="text-slate-400" />
                <input
                  type="number"
                  placeholder="Lương tối đa, ví dụ: 10000000"
                  value={salaryMaxStr}
                  onChange={(e) => setSalaryMaxStr(e.target.value)}
                  className="w-full bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={handleCancel}
              disabled={isUpdating}
              className="flex items-center gap-1.5 rounded-2xl border border-slate-200 px-5 py-2.5 text-[14px] font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
            >
              <X size={16} />
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="flex items-center gap-1.5 rounded-2xl bg-cyan-500 px-5 py-2.5 text-[14px] font-bold text-white shadow-md shadow-cyan-500/10 transition hover:bg-cyan-600 disabled:opacity-60"
            >
              {isUpdating ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Check size={16} />
              )}
              Lưu thay đổi
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 rounded-2xl bg-slate-50/50 p-6 border border-slate-100">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Địa điểm mong muốn</p>
              <p className="mt-1 text-[15px] font-bold text-slate-800">
                {preference?.desiredLocation || "Chưa cập nhật"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-wider text-slate-400">Mức lương mong muốn</p>
              <p className="mt-1 text-[15px] font-bold text-slate-800">
                {formatSalaryDisplay(preference?.desiredSalaryMin, preference?.desiredSalaryMax)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
