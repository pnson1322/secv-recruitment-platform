"use client";

import JobModerationStats from "./JobModerationStats";
import JobModerationFilters from "./JobModerationFilters";
import JobModerationCard from "./JobModerationCard";
import JobModerationSkeleton from "./JobModerationSkeleton";
import Pagination from "@/components/Pagination";
import { useJobModerationPage } from "../../hooks/useJobModerationPage";

export default function JobModerationPage() {
  const {
    params,
    stats,
    jobs,
    meta,
    isStatsLoading,
    isListLoading,
    isListError,
    isAnyError,
    handleSearch,
    handleFilterStatus,
    handleFilterCity,
    handleReset,
    handlePageChange,
    handleRetry,
  } = useJobModerationPage();

  return (
    <div className="space-y-8 px-12 py-5 max-w-[1600px] mx-auto">
      <div className="space-y-7">
        <JobModerationStats stats={stats} isLoading={isStatsLoading} />
        <JobModerationFilters 
          onSearch={handleSearch}
          onFilterStatus={handleFilterStatus}
          onFilterCity={handleFilterCity}
          onReset={handleReset}
          currentStatus={params.status || ""}
          currentCity={params.city || ""}
          currentKeyword={params.search || ""}
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-slate-900">Danh sách tin đăng cần kiểm duyệt</h2>
          {!isListLoading && !isListError && (
            <span className="text-[14px] font-medium text-slate-500 italic">
              Tìm thấy {meta?.totalItems || 0} tin đăng phù hợp
            </span>
          )}
        </div>
        
        {isAnyError ? (
          <div className="rounded-[32px] border border-red-100 bg-red-50/30 py-20 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4">
              <span className="text-[24px]">⚠️</span>
            </div>
            <p className="text-[16px] font-bold text-slate-900">Đã xảy ra lỗi khi tải dữ liệu</p>
            <p className="text-[14px] text-slate-500 mt-1 mb-6">Vui lòng kiểm tra kết nối mạng và thử lại.</p>
            <button 
              onClick={handleRetry}
              className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
            >
              Thử lại ngay
            </button>
          </div>
        ) : isListLoading ? (
          <JobModerationSkeleton />
        ) : jobs.length === 0 ? (
          <div className="rounded-[32px] border border-slate-100 bg-white py-24 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
              <span className="text-[40px]">🔍</span>
            </div>
            <p className="text-[18px] font-bold text-slate-900">Không tìm thấy tin đăng</p>
            <p className="text-[14px] text-slate-500 mt-1">Vui lòng thử lại với bộ lọc khác.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobModerationCard key={job.jobId} job={job} />
              ))}
            </div>

            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={meta.currentPage}
                  totalPages={meta.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
