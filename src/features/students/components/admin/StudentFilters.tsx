"use client";

import { Search, RotateCcw, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import CustomSelect from "@/components/CustomSelect";

type Props = {
  onSearch: (keyword: string) => void;
  onFilterStatus: (status: string) => void;
  onReset: () => void;
  currentStatus: string;
  currentKeyword: string;
};

const STATUS_OPTIONS = [
  { label: "Tất cả trạng thái", value: "" },
  { label: "Đang học", value: "STUDYING" },
  { label: "Đã tốt nghiệp", value: "GRADUATED" },
  { label: "Thôi học", value: "DROPPED_OUT" },
];

export default function StudentFilters({ onSearch, onFilterStatus, onReset, currentStatus, currentKeyword }: Props) {
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

  const hasFilters = currentStatus !== "" || currentKeyword !== "";

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="relative flex-[2]">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, MSSV, email..."
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
