"use client";

import React from "react";
import { AlertCircle, Search } from "lucide-react";
import Pagination from "@/components/Pagination";
import { useStudentCompaniesPage } from "../hooks/useStudentCompaniesPage";
import CompanyToolbar from "./CompanyToolbar";
import CompanyCard from "./CompanyCard";

export default function StudentCompaniesPage() {
  const {
    companies,
    meta,
    isLoading,
    isError,
    search,
    setSearch,
    location,
    setLocation,
    scale,
    setScale,
    page,
    setPage,
    refetch,
  } = useStudentCompaniesPage();

  const isFiltering = search || location || scale;

  return (
    <div className="mx-auto max-w-[1240px] space-y-6 px-4 pb-12 pt-2">
      <CompanyToolbar
        search={search}
        onSearchChange={setSearch}
        location={location}
        onLocationChange={setLocation}
        scale={scale}
        onScaleChange={setScale}
      />

      {isError ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/30 px-6 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Đã có lỗi xảy ra
          </h3>
          <p className="mt-2 max-w-md text-slate-500">
            Không thể tải danh sách công ty vào lúc này. Vui lòng kiểm tra lại kết nối và thử lại.
          </p>
          <button
            onClick={() => refetch()}
            className="mt-8 rounded-2xl bg-slate-900 px-8 py-3 text-[15px] font-bold text-white transition hover:bg-slate-800"
          >
            Thử lại
          </button>
        </div>
      ) : (
        <div className="space-y-8">


          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600">
                  <Search size={18} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {isFiltering ? "Kết quả tìm kiếm" : "Tất cả công ty"}
                </h2>
              </div>
              {!isLoading && meta && (
                <span className="text-[13px] font-medium text-slate-500">
                  Hiển thị <span className="font-bold text-slate-900">{companies.length}</span> / <span className="font-bold text-slate-900">{meta.totalItems}</span> công ty
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <CompanySkeleton key={i} />
                ))}
              </div>
            ) : companies.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-slate-50/50 px-6 py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Không tìm thấy công ty nào
                </h3>
                <p className="mt-2 max-w-md text-slate-500">
                  Thử thay đổi từ khóa tìm kiếm hoặc các bộ lọc để tìm thấy kết quả phù hợp.
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {companies.map((company) => (
                    <CompanyCard key={company.companyId} company={company} />
                  ))}
                </div>

                {meta && meta.totalPages > 1 && (
                  <div className="flex justify-center pt-4">
                    <Pagination
                      currentPage={page}
                      totalPages={meta.totalPages}
                      onPageChange={setPage}
                    />
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function CompanySkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-slate-100" />
        <div className="flex flex-1 flex-col justify-center gap-2.5">
          <div className="h-5 w-3/4 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-3.5 w-1/2 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-3.5 w-2/3 animate-pulse rounded-lg bg-slate-100" />
        </div>
      </div>
      <div className="mt-5 flex gap-2.5">
        <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-50" />
        <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-50" />
      </div>
    </div>
  );
}
