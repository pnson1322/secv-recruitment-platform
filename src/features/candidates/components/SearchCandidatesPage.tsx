"use client";

import { Filter, RefreshCcw, TriangleAlert, UsersRound } from "lucide-react";
import Pagination from "@/components/Pagination";
import StudentProfileModal from "@/features/students/components/StudentProfileModal";
import { useSearchCandidatesPage } from "../hooks/useSearchCandidatesPage";
import { useStartChat } from "@/features/chat/hooks/useStartChat";
import SearchCandidateCard from "./search/SearchCandidateCard";
import SearchCandidateInviteModal from "./search/SearchCandidateInviteModal";
import SearchCandidatesFilters, {
  type MajorOption,
} from "./search/SearchCandidatesFilters";
import SearchCandidatesSkeleton from "./search/SearchCandidatesSkeleton";

type Props = {
  majorOptions?: MajorOption[];
};

export default function SearchCandidatesPage() {
  const {
    page,
    setPage,
    pageSize,
    totalPages,
    totalItems,
    candidates,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    draftFilters,
    updateSearch,
    updateMajorId,
    toggleYear,
    updateMinGpa,
    toggleSkill,
    updateOpenToWork,
    applyFilters,
    clearFilters,
    activeAppliedFiltersCount,
    skills,
    skillsError,
    isSkillsLoading,
    majorOptions,
    isMajorsLoading,
    isLoading,
    isError,
    isFetching,
    refetch,
    selectedProfileStudentId,
    setSelectedProfileStudentId,
    candidateToInvite,
    selectedJobId,
    setSelectedJobId,
    inviteMessage,
    setInviteMessage,
    inviteError,
    approvedJobs,
    inviteDisabledReason,
    openInviteModal,
    closeInviteModal,
    submitInvite,
    isSubmittingInvite,
  } = useSearchCandidatesPage();

  const { startChatWithStudent } = useStartChat();

  return (
    <>
      <div className="mx-auto w-full max-w-[1600px] px-3 pb-8 pt-1 sm:px-4 lg:px-6">
        <div className="mb-4 flex items-center justify-between gap-3 xl:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700"
          >
            <Filter size={18} />
            Bộ lọc
            {activeAppliedFiltersCount > 0 ? (
              <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[12px] text-cyan-700">
                {activeAppliedFiltersCount}
              </span>
            ) : null}
          </button>

          <div className="text-right">
            <p className="text-[15px] font-semibold text-slate-800">
              Tìm thấy {totalItems} ứng viên
            </p>
            {isFetching && !isLoading ? (
              <p className="text-[13px] text-slate-400">Đang cập nhật...</p>
            ) : null}
          </div>
        </div>

        {mobileFiltersOpen ? (
          <div className="mb-5 xl:hidden">
            <SearchCandidatesFilters
              filters={draftFilters}
              skills={skills}
              majorOptions={majorOptions}
              isSkillsLoading={isSkillsLoading}
              isMajorsLoading={isMajorsLoading}
              skillsError={skillsError}
              onSearchChange={updateSearch}
              onSearchSubmit={applyFilters}
              onMajorChange={updateMajorId}
              onToggleYear={toggleYear}
              onMinGpaChange={updateMinGpa}
              onToggleSkill={toggleSkill}
              onOpenToWorkChange={updateOpenToWork}
              onApply={applyFilters}
              onClear={clearFilters}
            />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_minmax(0,1fr)] items-stretch">
          <aside className="hidden xl:block">
            <SearchCandidatesFilters
              filters={draftFilters}
              skills={skills}
              majorOptions={majorOptions}
              isSkillsLoading={isSkillsLoading}
              isMajorsLoading={isMajorsLoading}
              skillsError={skillsError}
              onSearchChange={updateSearch}
              onSearchSubmit={applyFilters}
              onMajorChange={updateMajorId}
              onToggleYear={toggleYear}
              onMinGpaChange={updateMinGpa}
              onToggleSkill={toggleSkill}
              onOpenToWorkChange={updateOpenToWork}
              onApply={applyFilters}
              onClear={clearFilters}
              className="h-full"
            />
          </aside>

          <section className="min-w-0">
            <div className="mb-5 hidden items-center justify-between gap-4 xl:flex">
              <div>
                <p className="text-[18px] font-semibold text-slate-800">
                  Tìm thấy {totalItems} ứng viên
                </p>
                {inviteDisabledReason ? (
                  <p className="mt-1 text-[13px] text-slate-500">
                    {inviteDisabledReason}
                  </p>
                ) : null}
              </div>

              {isFetching && !isLoading ? (
                <p className="text-[13px] text-slate-400">
                  Đang cập nhật dữ liệu...
                </p>
              ) : null}
            </div>

            {isError ? (
              <div className="rounded-[28px] border border-rose-100 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                  <TriangleAlert size={28} />
                </div>
                <h3 className="mt-4 text-[22px] font-bold text-slate-900">
                  Không thể tải danh sách ứng viên
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-slate-500">
                  Vui lòng kiểm tra kết nối mạng hoặc thử tải lại dữ liệu.
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-6 inline-flex h-11 items-center gap-2 rounded-2xl bg-slate-900 px-5 text-[14px] font-semibold text-white transition hover:bg-slate-800"
                >
                  <RefreshCcw size={16} />
                  Thử lại
                </button>
              </div>
            ) : isLoading ? (
              <SearchCandidatesSkeleton count={pageSize} />
            ) : candidates.length === 0 ? (
              <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <UsersRound size={28} />
                </div>
                <h3 className="mt-4 text-[22px] font-bold text-slate-900">
                  Chưa tìm thấy ứng viên phù hợp
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-slate-500">
                  Bạn hãy thử nới lỏng bộ lọc, giảm GPA tối thiểu hoặc bỏ bớt kỹ
                  năng bắt buộc.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex h-11 items-center rounded-2xl border border-slate-200 px-5 text-[14px] font-semibold text-slate-700 transition hover:border-cyan-300 hover:bg-slate-50"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
                  {candidates.map((student) => (
                    <SearchCandidateCard
                      key={student.studentId}
                      student={student}
                      onViewProfile={setSelectedProfileStudentId}
                      onInvite={openInviteModal}
                      inviteDisabled={Boolean(inviteDisabledReason)}
                      inviteDisabledReason={inviteDisabledReason}
                    />
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              </>
            )}
          </section>
        </div>
      </div>

      <StudentProfileModal
        open={Boolean(selectedProfileStudentId)}
        onClose={() => setSelectedProfileStudentId(null)}
        studentId={selectedProfileStudentId}
        role="company"
        showInviteCTA={true}
        onInvite={() => {
          const student = candidates.find(
            (c) => c.studentId === selectedProfileStudentId,
          );
          if (student) {
            setSelectedProfileStudentId(null);
            openInviteModal(student);
          }
        }}
        onChat={() => {
          if (selectedProfileStudentId) {
            const student = candidates.find(
              (c) => c.studentId === selectedProfileStudentId,
            );
            startChatWithStudent(
              selectedProfileStudentId,
              student?.fullName,
              student?.avatarUrl,
            );
          }
        }}
      />

      <SearchCandidateInviteModal
        open={Boolean(candidateToInvite)}
        candidate={candidateToInvite}
        jobs={approvedJobs}
        selectedJobId={selectedJobId}
        message={inviteMessage}
        error={inviteError}
        isSubmitting={isSubmittingInvite}
        onJobChange={setSelectedJobId}
        onMessageChange={setInviteMessage}
        onClose={closeInviteModal}
        onSubmit={submitInvite}
      />
    </>
  );
}
