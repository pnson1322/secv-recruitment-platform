"use client";

import React, { useState, useEffect } from "react";
import { useCompanyMonitoring } from "../../hooks/useCompanyMonitoring";
import CompanyMonitoringCard from "./CompanyMonitoringCard";
import Pagination from "@/components/Pagination";
import CustomSelect from "@/components/CustomSelect";
import { useDebounce } from "@/hooks/useDebounce";
import { CompanyStatus } from "../../types/company.types";
import { 
  Building2, 
  Search,
  RotateCcw,
  Filter,
  AlertCircle
} from "lucide-react";
import CompanyMonitorStats from "./CompanyMonitorStats";

const STATUS_OPTIONS = [
  { label: "Tất cả trạng thái", value: "" },
  { label: "Hoạt động", value: "APPROVED" },
  { label: "Chờ duyệt", value: "PENDING" },
  { label: "Hạn chế", value: "RESTRICTED" },
  { label: "Từ chối", value: "REJECTED" },
];

function CompanyCardSkeleton() {
  return (
    <div className="flex flex-col rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm animate-pulse">
      <div className="flex items-start gap-4 mb-6">
        <div className="h-24 w-24 shrink-0 rounded-2xl bg-slate-100" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-16 rounded-full bg-slate-100" />
          <div className="h-6 w-3/4 rounded-lg bg-slate-100" />
          <div className="h-4 w-1/2 rounded-lg bg-slate-100" />
          <div className="flex items-center gap-1.5 mt-2">
            <div className="h-4 w-4 rounded bg-slate-100" />
            <div className="h-4 w-8 rounded bg-slate-100" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-5 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="h-6 w-8 rounded bg-slate-100" />
            <div className="h-3 w-12 rounded bg-slate-100" />
          </div>
        ))}
      </div>
      <div className="space-y-3 mt-auto">
        <div className="h-11 w-full rounded-xl bg-slate-100" />
        <div className="grid grid-cols-2 gap-2.5">
          <div className="h-10 rounded-xl bg-slate-100" />
          <div className="h-10 rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export default function MonitoringPage() {
  const {
    companies,
    meta,
    isLoading,
    isError,
    refetch,
    page,
    setPage,
    status,
    setStatus,
    search,
    setSearch,
    stats,
    isLoadingStats,
    changeStatusMutation,
  } = useCompanyMonitoring();

  const [searchValue, setSearchValue] = useState(search);
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    setSearch(debouncedSearch);
    setPage(1);
  }, [debouncedSearch, setSearch, setPage]);

  const handleReset = () => {
    setSearchValue("");
    setSearch("");
    setStatus(undefined);
    setPage(1);
  };

  const hasFilters = status !== undefined || searchValue !== "";

  return (
    <div className="mx-auto max-w-[1400px] space-y-8 px-4 pb-12 pt-6">
      <CompanyMonitorStats stats={stats} isLoading={isLoadingStats} />
      
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="relative flex-[2]">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên doanh nghiệp..."
              className="w-full h-[42px] rounded-xl border border-slate-200 bg-white py-2 pl-11 pr-4 text-[14px] outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5"
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
                value={status || ""}
                onChange={(val) => {
                  setStatus(val === "" ? undefined : (val as CompanyStatus));
                  setPage(1);
                }}
                placeholder="Tất cả trạng thái"
              />
            </div>
          </div>

          <button
            onClick={handleReset}
            disabled={!hasFilters}
            className={`group flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
              hasFilters
                ? "border-cyan-200 bg-cyan-50/50 text-cyan-500 shadow-sm hover:bg-cyan-500 hover:text-white hover:border-cyan-500"
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

      {isError ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border border-slate-100">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500 mb-4">
            <AlertCircle size={40} />
          </div>
          <h3 className="text-[20px] font-bold text-slate-900">Đã có lỗi xảy ra</h3>
          <p className="mt-1 text-[15px] font-medium text-slate-500 mb-6">Không thể tải danh sách doanh nghiệp lúc này</p>
          <button 
            onClick={() => refetch()}
            className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
          >
            Thử lại
          </button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <CompanyCardSkeleton key={i} />
          ))}
        </div>
      ) : companies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <CompanyMonitoringCard
                key={company.companyId}
                company={company}
                isChanging={changeStatusMutation.isPending && changeStatusMutation.variables?.id === company.companyId}
                onStatusChange={async (newStatus, reason) => {
                  await changeStatusMutation.mutateAsync({
                    id: company.companyId,
                    payload: { status: newStatus, admin_note: reason }
                  });
                }}
              />
            ))}
          </div>

          {meta && meta.totalPages > 1 && (
            <div className="mt-12 flex justify-center border-t border-slate-100 pt-8">
              <Pagination
                currentPage={meta.currentPage}
                totalPages={meta.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[32px] border border-dashed border-slate-200">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-slate-200 mb-6">
            <Building2 size={48} />
          </div>
          <h3 className="text-[20px] font-bold text-slate-900">Không tìm thấy doanh nghiệp nào</h3>
          <p className="mt-1 text-[16px] font-medium text-slate-500 max-w-sm text-center">
            Hệ thống không tìm thấy doanh nghiệp nào khớp với các tiêu chí tìm kiếm của bạn.
          </p>
          {hasFilters && (
            <button 
              onClick={handleReset}
              className="mt-6 text-cyan-600 font-bold hover:underline"
            >
              Xóa tất cả bộ lọc
            </button>
          )}
        </div>
      )}
    </div>
  );
}
