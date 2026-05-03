"use client";

import { Search, MapPin, Filter, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import CustomSelect from "@/components/CustomSelect";
import { JobPostingStatus } from "../../types/job-postings.types";

type Props = {
  onSearch: (keyword: string) => void;
  onFilterStatus: (status: string) => void;
  onFilterCity: (city: string) => void;
  onReset: () => void;
  currentStatus: string;
  currentCity: string;
  currentKeyword: string;
};

const STATUS_OPTIONS = [
  { label: "Tất cả trạng thái", value: "" },
  { label: "Chờ duyệt", value: "pending" },
  { label: "Đã duyệt", value: "approved" },
  { label: "Đã từ chối", value: "rejected" },
  { label: "Bị hạn chế", value: "restricted" },
];

const LOCATIONS = [
  "Hà Nội", "Hồ Chí Minh", "Bình Dương", "Đà Nẵng", "Đồng Nai",
  "Long An", "Bà Rịa - Vũng Tàu", "Hải Phòng", "Bắc Ninh", "Cần Thơ",
  "Hà Nam", "Quảng Nam", "Hưng Yên", "Vĩnh Phúc", "Thừa Thiên Huế",
  "Khánh Hòa", "Hải Dương", "Tiền Giang", "Thanh Hóa", "Nam Định",
  "Bắc Giang", "Thái Bình", "Phú Thọ", "Nghệ An", "Quảng Ngãi", "Bình Định"
];

const CITY_OPTIONS = [
  { label: "Tất cả địa điểm", value: "" },
  ...LOCATIONS.map(city => ({ label: city, value: city }))
];

export default function JobModerationFilters({ 
  onSearch, 
  onFilterStatus, 
  onFilterCity,
  onReset, 
  currentStatus, 
  currentCity,
  currentKeyword 
}: Props) {
  const [searchValue, setSearchValue] = useState(currentKeyword);
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  useEffect(() => {
    setSearchValue(currentKeyword);
  }, [currentKeyword]);

  const handleReset = () => {
    setSearchValue("");
    onReset();
  };

  const hasFilters = currentStatus !== "" || currentCity !== "" || currentKeyword !== "";

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="relative flex-[2]">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm tin đăng, công ty..."
            className="w-full h-[42px] rounded-xl border border-slate-200 bg-white py-2 pl-11 pr-4 text-[14px] outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 z-10 flex items-center pointer-events-none text-slate-400">
            <Filter size={18} />
          </div>
          <div className="[&_button]:pl-11 [&_button]:rounded-xl [&_button]:h-[42px] [&_button_span]:text-[14px]">
            <CustomSelect
              options={STATUS_OPTIONS}
              value={currentStatus}
              onChange={onFilterStatus}
              placeholder="Tất cả trạng thái"
            />
          </div>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 z-10 flex items-center pointer-events-none text-slate-400">
            <MapPin size={18} />
          </div>
          <div className="[&_button]:pl-11 [&_button]:rounded-xl [&_button]:h-[42px] [&_button_span]:text-[14px]">
            <CustomSelect
              options={CITY_OPTIONS}
              value={currentCity}
              onChange={onFilterCity}
              placeholder="Tất cả địa điểm"
            />
          </div>
        </div>

        <button
          onClick={handleReset}
          disabled={!hasFilters}
          className={`group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
            hasFilters
              ? "border-blue-200 bg-blue-50/50 text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white hover:border-blue-500"
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
