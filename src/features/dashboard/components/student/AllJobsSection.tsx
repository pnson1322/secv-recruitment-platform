"use client";

import { useEffect, useState } from "react";
import { Briefcase, Search, MapPin, RotateCcw, AlertCircle } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import Pagination from "@/components/Pagination";
import { useJobPostingCardsForStudent } from "@/features/job-postings/hooks/useJobPostingCardsForStudent";
import StudentJobCard from "@/features/job-postings/components/student/StudentJobCard";

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

export default function AllJobsSection() {
  const [params, setParams] = useState({
    page: 1,
    limit: 9,
    search: "",
    city: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [lastFilters, setLastFilters] = useState({ search: "", city: "" });

  useEffect(() => {
    const handler = setTimeout(() => {
      setParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    setLastFilters({ search: params.search, city: params.city });
  }, [params.search, params.city]);

  const { data, isLoading, isFetching, isError, refetch } = useJobPostingCardsForStudent(params);

  const isFiltering = searchTerm || params.city;
  const isFilterChanging = params.search !== lastFilters.search || params.city !== lastFilters.city;

  const handleClearFilters = () => {
    setSearchTerm("");
    setParams({ page: 1, limit: 9, search: "", city: "" });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCityChange = (val: string) => {
    setParams((prev) => ({ ...prev, city: val, page: 1 }));
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-red-100 bg-red-50/20 px-6 py-12 text-center mt-6">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
          <AlertCircle size={32} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Đã có lỗi xảy ra</h3>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          Không thể tải danh sách tất cả việc làm. Vui lòng thử lại.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-6 rounded-2xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes running-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-running-bar {
          animation: running-bar 1.5s infinite linear;
        }
      `}</style>

      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm vị trí, công ty..."
              className="w-full h-11 rounded-xl border border-slate-200 bg-white py-2 pl-11 pr-4 text-[14px] outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 text-slate-700"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 z-10 flex items-center pointer-events-none text-slate-400">
              <MapPin size={18} />
            </div>
            <div className="[&_button]:pl-11 [&_button]:rounded-xl [&_button]:h-11 [&_button_span]:text-[14px]">
              <CustomSelect
                options={LOCATION_OPTIONS}
                value={params.city}
                onChange={handleCityChange}
                placeholder="Chọn địa điểm"
              />
            </div>
          </div>

          <button
            onClick={handleClearFilters}
            disabled={!isFiltering}
            className={`group flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
              isFiltering
                ? "border-red-200 bg-red-50/50 text-red-500 shadow-sm hover:bg-red-500 hover:text-white hover:border-red-500 cursor-pointer"
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
            <Briefcase size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Tất cả tin tuyển dụng</h3>
            <p className="text-[13px] text-slate-400">
              {data?.data?.meta?.totalItems
                ? `Tìm thấy ${data.data.meta.totalItems} việc làm đang tuyển`
                : "Khám phá các vị trí tuyển dụng mới nhất"}
            </p>
          </div>
        </div>
      </div>

      <div>
        {isLoading || (isFetching && isFilterChanging) ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-xs animate-pulse">
                <div className="flex gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-xl bg-slate-100" />
                  <div className="flex flex-1 flex-col justify-center gap-2.5">
                    <div className="h-5 w-3/4 bg-slate-200 rounded-lg" />
                    <div className="h-3.5 w-1/2 bg-slate-100 rounded-lg" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="h-4 w-full bg-slate-50 rounded" />
                  <div className="h-4 w-full bg-slate-50 rounded" />
                  <div className="h-4 w-full bg-slate-50 rounded" />
                  <div className="h-4 w-full bg-slate-50 rounded" />
                </div>
                <div className="mt-5 flex gap-2.5">
                  <div className="h-10 w-10 bg-slate-50 rounded-xl" />
                  <div className="h-10 flex-1 bg-slate-50 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : !data || data.data.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white px-6 py-16 text-center shadow-xs">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-700">
              Không tìm thấy công việc nào
            </h3>
            <p className="mt-1 max-w-sm text-xs text-slate-400">
              {isFiltering
                ? "Hãy thử thay đổi từ khóa hoặc bộ lọc địa điểm khác."
                : "Hệ thống hiện tại chưa có tin tuyển dụng nào được duyệt."}
            </p>
          </div>
        ) : (
          <div className="space-y-8 relative">
            {isFetching && !isFilterChanging && (
              <div className="absolute inset-x-0 -top-2 z-10 h-1 overflow-hidden bg-cyan-100 rounded-full">
                <div className="h-full w-1/3 bg-cyan-500 rounded-full animate-running-bar" />
              </div>
            )}

            <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${
              isFetching && !isFilterChanging ? "opacity-50 pointer-events-none" : ""
            }`}>
              {data.data.data.map((job) => (
                <StudentJobCard key={job.jobId} job={job} />
              ))}
            </div>

            {data.data.meta && data.data.meta.totalPages > 1 && (
              <div className="flex justify-center pt-4">
                <Pagination
                  currentPage={params.page}
                  totalPages={data.data.meta.totalPages}
                  onPageChange={(page) => {
                    setParams((prev) => ({ ...prev, page }));
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
