import React from "react";
import { Search, MapPin, Users, RotateCcw } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";

interface CompanyToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  scale: string;
  onScaleChange: (value: string) => void;
}

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

const LOCATION_OPTIONS = [
  { label: "Tất cả địa điểm", value: "" },
  ...LOCATIONS.sort().map((loc) => ({ label: loc, value: loc })),
];

const SCALES = [
  { label: "1-10 nhân viên", value: "1-10" },
  { label: "11-50 nhân viên", value: "11-50" },
  { label: "50-100 nhân viên", value: "50-100" },
  { label: "100-500 nhân viên", value: "100-500" },
  { label: "500+ nhân viên", value: "500+" },
];

const SCALE_OPTIONS = [
  { label: "Tất cả quy mô", value: "" },
  ...SCALES,
];

export default function CompanyToolbar({
  search,
  onSearchChange,
  location,
  onLocationChange,
  scale,
  onScaleChange,
}: CompanyToolbarProps) {
  const hasFilters = search || location || scale;

  const clearFilters = () => {
    onSearchChange("");
    onLocationChange("");
    onScaleChange("");
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Tìm tên công ty..."
            className="w-full h-[42px] rounded-xl border border-slate-200 bg-white py-2 pl-11 pr-4 text-[14px] outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 z-10 flex items-center pointer-events-none text-slate-400">
            <MapPin size={18} />
          </div>
          <div className="[&_button]:pl-11 [&_button]:rounded-xl [&_button]:h-[42px] [&_button_span]:text-[14px]">
            <CustomSelect
              options={LOCATION_OPTIONS}
              value={location}
              onChange={onLocationChange}
              placeholder="Tất cả địa điểm"
            />
          </div>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 z-10 flex items-center pointer-events-none text-slate-400">
            <Users size={18} />
          </div>
          <div className="[&_button]:pl-11 [&_button]:rounded-xl [&_button]:h-[42px] [&_button_span]:text-[14px]">
            <CustomSelect
              options={SCALE_OPTIONS}
              value={scale}
              onChange={onScaleChange}
              placeholder="Tất cả quy mô"
            />
          </div>
        </div>

        <button
          onClick={clearFilters}
          disabled={!hasFilters}
          className={`group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
            hasFilters
              ? "border-red-200 bg-red-50/50 text-red-500 shadow-sm hover:bg-red-500 hover:text-white hover:border-red-500"
              : "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
          }`}
          title="Thiết lập lại bộ lọc"
        >
          <RotateCcw
            size={18}
            className={`transition-transform duration-500 ${
              hasFilters ? "group-hover:rotate-[-360deg]" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
