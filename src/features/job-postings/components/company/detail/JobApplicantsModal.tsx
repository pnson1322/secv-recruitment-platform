"use client";

import { X, Search, LayoutGrid, FileWarning } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Pagination from "@/components/Pagination";
import StudentProfileModal from "@/features/students/components/StudentProfileModal";
import { useJobApplicants, type JobApplicantTab } from "../../../hooks/useJobApplicants";
import { useCandidatesActions } from "@/features/candidates/hooks/useCandidatesActions";
import { useStartChat } from "@/features/chat/hooks/useStartChat";
import JobApplicantCard from "./JobApplicantCard";

type Props = {
  open: boolean;
  onClose: () => void;
  jobId: number;
  jobTitle: string;
};

const TABS: { key: JobApplicantTab; label: string; activeClass: string; badgeClass: string }[] = [
  {
    key: "all",
    label: "Tất cả",
    activeClass: "bg-cyan-50 border-b-2 border-cyan-500 text-cyan-600",
    badgeClass: "bg-cyan-500 text-white",
  },
  {
    key: "submitted",
    label: "Chưa duyệt",
    activeClass: "bg-orange-50 border-b-2 border-orange-500 text-orange-600",
    badgeClass: "bg-orange-500 text-white",
  },
  {
    key: "interviewing",
    label: "Phỏng vấn",
    activeClass: "bg-purple-50 border-b-2 border-purple-500 text-purple-600",
    badgeClass: "bg-purple-500 text-white",
  },
  {
    key: "passed",
    label: "Đã duyệt",
    activeClass: "bg-emerald-50 border-b-2 border-emerald-500 text-emerald-600",
    badgeClass: "bg-emerald-500 text-white",
  },
  {
    key: "rejected",
    label: "Đã loại",
    activeClass: "bg-slate-100 border-b-2 border-slate-600 text-slate-700",
    badgeClass: "bg-slate-600 text-white",
  },
];

export default function JobApplicantsModal({ open, onClose, jobId, jobTitle }: Props) {
  const { user } = useAuth();
  const viewerRole = user?.role;

  const {
    tab,
    setTab,
    search,
    setSearch,
    applications,
    tabCounts,
    isLoading,
    isError,
    page,
    setPage,
    totalPages,
    totalItems,
    refetch,
  } = useJobApplicants(jobId, open && viewerRole === "COMPANY");

  const { startChatWithStudent } = useStartChat();
  const {
    selectedProfile,
    setSelectedProfile,
    handleUpdateStatus,
    onDownloadCV,
  } = useCandidatesActions(refetch);

  if (!open) return null;

  return (
    <ClientPortal>
      <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm transition-all duration-300">
        <div 
          className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[32px] border border-white/20 bg-slate-50 shadow-2xl animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Danh sách ứng tuyển</h2>
              <p className="text-[14px] font-medium text-slate-500">
                Vị trí: <span className="text-cyan-600">{jobTitle}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
            >
              <X size={20} className="transition-transform group-hover:rotate-90" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="flex items-center">
                    {TABS.map((t) => {
                      const isActive = tab === t.key;
                      const count = tabCounts[t.key] ?? 0;
                      return (
                        <button
                          key={t.key}
                          onClick={() => setTab(t.key)}
                          className={`flex items-center gap-2 border-b-2 px-6 py-4 text-[14px] font-semibold transition-all duration-200 ${
                            isActive
                              ? t.activeClass
                              : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                          }`}
                        >
                          {t.label}
                          <span className={`inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                            isActive ? t.badgeClass : "bg-slate-100 text-slate-500"
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="relative w-full lg:w-80">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm ứng viên..."
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-[14px] shadow-sm outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-40 w-full animate-pulse rounded-[24px] bg-slate-200" />
                    ))}
                  </div>
                ) : isError ? (
                  <div className="flex flex-1 flex-col items-center justify-center rounded-[32px] border border-red-100 bg-red-50 py-20 text-center">
                    <FileWarning size={48} className="text-red-500 mb-4" />
                    <p className="text-red-600 font-bold text-lg">Có lỗi xảy ra khi tải dữ liệu</p>
                    <button onClick={() => refetch()} className="mt-4 rounded-xl bg-red-500 px-6 py-2 text-white font-bold hover:bg-red-600">Thử lại</button>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="flex min-h-[450px] flex-1 flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-200 bg-white py-12 text-center">
                    <LayoutGrid size={64} className="text-slate-100 mb-6" />
                    <p className="text-slate-400 font-bold text-lg">Không có ứng viên nào trong mục này</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <JobApplicantCard
                        key={app.applicationId}
                        application={app}
                        onViewProfile={setSelectedProfile}
                        onDownloadCV={onDownloadCV}
                        onUpdateStatus={(a, s) => {
                          const message = 
                            s === "interviewing" ? "Đã duyệt ứng viên vào phỏng vấn" :
                            s === "passed" ? "Đã xác nhận trúng tuyển" :
                            "Đã từ chối ứng viên";
                          handleUpdateStatus(a.applicationId, s, message);
                        }}
                      />
                    ))}

                    {totalPages > 1 && (
                      <div className="flex justify-center pt-8">
                        <Pagination
                          currentPage={page}
                          totalPages={totalPages}
                          onPageChange={setPage}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProfile && (
        <StudentProfileModal
          open={!!selectedProfile}
          onClose={() => setSelectedProfile(null)}
          studentId={selectedProfile.student.studentId}
          role="company"
          applicationStatus={selectedProfile.status}
          cvUrl={"cvUrl" in selectedProfile ? (selectedProfile as { cvUrl?: string }).cvUrl : undefined}
          onChat={() =>
            startChatWithStudent(
              selectedProfile.student.studentId,
              selectedProfile.student.fullName,
              selectedProfile.student.avatarUrl
            )
          }
          onUpdateStatus={(newStatus) => {
            if (selectedProfile && "applicationId" in selectedProfile) {
              handleUpdateStatus(
                (selectedProfile as { applicationId: number }).applicationId,
                newStatus as "passed" | "rejected" | "interviewing",
                newStatus === "interviewing" 
                  ? "Đã duyệt ứng viên" 
                  : newStatus === "passed" 
                    ? "Đã đánh dấu trúng tuyển" 
                    : "Đã từ chối ứng viên"
              );
            }
            setSelectedProfile(null);
          }}
        />
      )}
    </ClientPortal>
  );
}
