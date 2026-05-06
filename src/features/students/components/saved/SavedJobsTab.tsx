"use client";

import React, { useState } from "react";
import { Search, MapPin, AlertCircle, RotateCcw } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import Pagination from "@/components/Pagination";
import { useStudentSavedJobs } from "@/features/students/hooks/useStudentSavedJobs";
import StudentJobCard from "@/features/job-postings/components/student/StudentJobCard";

const LOCATIONS = [
  "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Bình Dương", "Đồng Nai"
];

const LOCATION_OPTIONS = [
  { label: "Tất cả địa điểm", value: "" },
  ...LOCATIONS.sort().map((loc) => ({ label: loc, value: loc })),
];

export default function SavedJobsTab() {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    city: "",
  });

  const { data, isLoading, isError, refetch } = useStudentSavedJobs(params);

  const isFiltering = params.search || params.city;

  const handleClearFilters = () => {
    setParams({ page: 1, limit: 10, search: "", city: "" });
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/30 px-6 py-16 text-center mt-6">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Đã có lỗi xảy ra</h3>
        <p className="mt-2 max-w-md text-slate-500">
          Không thể tải danh sách việc làm đã lưu. Vui lòng thử lại.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-8 rounded-2xl bg-slate-900 px-8 py-3 text-[15px] font-bold text-white transition hover:bg-slate-800"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm công việc..."
              className="w-full h-[42px] rounded-xl border border-slate-200 bg-white py-2 pl-11 pr-4 text-[14px] outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5"
              value={params.search}
              onChange={(e) => setParams({ ...params, search: e.target.value, page: 1 })}
            />
          </div>

          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 z-10 flex items-center pointer-events-none text-slate-400">
              <MapPin size={18} />
            </div>
            <div className="[&_button]:pl-11 [&_button]:rounded-xl [&_button]:h-[42px] [&_button_span]:text-[14px]">
              <CustomSelect
                options={LOCATION_OPTIONS}
                value={params.city}
                onChange={(value) => setParams({ ...params, city: value, page: 1 })}
                placeholder="Tất cả địa điểm"
              />
            </div>
          </div>

          <button
            onClick={handleClearFilters}
            disabled={!isFiltering}
            className={`group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
              isFiltering
                ? "border-red-200 bg-red-50/50 text-red-500 shadow-sm hover:bg-red-500 hover:text-white hover:border-red-500"
                : "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
            }`}
            title="Thiết lập lại bộ lọc"
          >
            <RotateCcw
              size={18}
              className={`transition-transform duration-500 ${
                isFiltering ? "group-hover:rotate-[-360deg]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : data?.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-slate-50/50 px-6 py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Không tìm thấy công việc nào
            </h3>
            <p className="mt-2 max-w-md text-slate-500">
              {isFiltering ? "Hãy thử thay đổi tiêu chí tìm kiếm." : "Bạn chưa lưu công việc nào."}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data?.data.map((job) => (
                <StudentJobCard key={job.jobId} job={job} />
              ))}
            </div>

            {data?.meta && data.meta.totalPages > 1 && (
              <div className="flex justify-center pt-4">
                <Pagination
                  currentPage={params.page}
                  totalPages={data.meta.totalPages}
                  onPageChange={(page) => {
                    setParams({ ...params, page });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
