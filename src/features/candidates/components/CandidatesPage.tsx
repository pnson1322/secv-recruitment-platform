"use client";

import { X } from "lucide-react";

import Pagination from "@/components/Pagination";
import StudentProfileModal from "@/features/students/components/StudentProfileModal";

import { useCandidatesActions } from "../hooks/useCandidatesActions";
import { useCandidatesPage } from "../hooks/useCandidatesPage";

import CandidateTabBar from "./CandidateTabBar";
import CandidateToolbar from "./CandidateToolbar";
import ResendInvitationModal from "./ResendInvitationModal";
import CandidateTableAll from "./tables/CandidateTableAll";
import CandidateTableApproved from "./tables/CandidateTableApproved";
import CandidateTableInvited from "./tables/CandidateTableInvited";
import CandidateTablePending from "./tables/CandidateTablePending";
import CandidateTableResult from "./tables/CandidateTableResult";
import CandidateTableSkeleton from "./tables/CandidateTableSkeleton";

export default function CandidatesPage() {
  const {
    tab,
    setTab,
    resultFilter,
    setResultFilter,
    search,
    setSearch,
    positionFilter,
    setPositionFilter,
    dateFilter,
    setDateFilter,
    categories,
    applications,
    invitations,
    invStats,
    tabCounts,
    resultStats,
    isLoading,
    isError,
    page,
    setPage,
    totalPages,
    refetch,
  } = useCandidatesPage();

  const {
    selectedProfile,
    setSelectedProfile,
    handleUpdateStatus,
    invitationToResend,
    resendMessage,
    setResendMessage,
    isResendingInvitation,
    openResendInvitationModal,
    closeResendInvitationModal,
    submitResendInvitation,
  } = useCandidatesActions(refetch);

  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <CandidateToolbar
        searchValue={search}
        onSearchChange={setSearch}
        categories={categories}
        positionFilter={positionFilter}
        onPositionFilterChange={setPositionFilter}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />

      <CandidateTabBar activeTab={tab} tabCounts={tabCounts} onTabChange={setTab} />

      {isError ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/30 px-6 py-16 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
            <X size={24} />
          </div>

          <h3 className="text-[16px] font-bold text-slate-800">Không thể tải dữ liệu</h3>
          <p className="mt-1 text-[14px] text-slate-500">
            Vui lòng kiểm tra kết nối mạng và thử lại.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-6 rounded-xl bg-slate-900 px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-slate-800"
          >
            Thử lại
          </button>
        </div>
      ) : isLoading ? (
        <CandidateTableSkeleton />
      ) : (
        <>
          {tab === "result" ? (
            <CandidateTableResult
              applications={applications}
              resultStats={resultStats}
              resultFilter={resultFilter}
              onFilterChange={setResultFilter}
              onViewProfile={setSelectedProfile}
            />
          ) : tab === "pending" ? (
            <CandidateTablePending
              applications={applications}
              onApprove={(app) =>
                handleUpdateStatus(
                  app.applicationId,
                  "interviewing",
                  "Đã duyệt ứng viên thành công"
                )
              }
              onReject={(app) =>
                handleUpdateStatus(app.applicationId, "rejected", "Đã loại ứng viên")
              }
              onViewCV={setSelectedProfile}
            />
          ) : tab === "approved" ? (
            <CandidateTableApproved
              applications={applications}
              onViewCV={setSelectedProfile}
              onPass={(app) =>
                handleUpdateStatus(
                  app.applicationId,
                  "passed",
                  "Đã chuyển ứng viên sang trạng thái Đậu"
                )
              }
              onReject={(app) =>
                handleUpdateStatus(app.applicationId, "rejected", "Đã loại ứng viên")
              }
            />
          ) : tab === "invited" ? (
            <CandidateTableInvited
              invitations={invitations}
              invStats={invStats}
              onResend={openResendInvitationModal}
              onViewProfile={setSelectedProfile}
            />
          ) : (
            <CandidateTableAll applications={applications} onViewCV={setSelectedProfile} />
          )}

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      {selectedProfile && (
        <StudentProfileModal
          open={!!selectedProfile}
          onClose={() => setSelectedProfile(null)}
          studentId={selectedProfile.student.studentId}
          role="company"
          adminNote={(selectedProfile as any).adminNote}
          applicationStatus={selectedProfile.status}
          onUpdateStatus={(newStatus) => {
            if ("applicationId" in selectedProfile) {
              const message =
                newStatus === "rejected"
                  ? "Đã loại ứng viên"
                  : newStatus === "interviewing"
                    ? "Đã duyệt ứng viên"
                    : "Đã chuyển sang trạng thái Đậu";

              handleUpdateStatus(selectedProfile.applicationId, newStatus as any, message);
              setSelectedProfile(null);
            }
          }}
        />
      )}

      <ResendInvitationModal
        open={!!invitationToResend}
        invitation={invitationToResend}
        message={resendMessage}
        isSubmitting={isResendingInvitation}
        onMessageChange={setResendMessage}
        onClose={closeResendInvitationModal}
        onSubmit={submitResendInvitation}
      />
    </div>
  );
}