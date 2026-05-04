"use client";

import { useStudentProfilePage } from "../../hooks/useStudentProfilePage";
import CVManagementSection from "./CVManagementSection";
import JobStatusSection from "./JobStatusSection";
import SkillsInterestsSection from "./SkillsInterestsSection";
import { Loader2, AlertCircle } from "lucide-react";
import ViewCVModal from "./modals/ViewCVModal";
import DeleteCVModal from "./modals/DeleteCVModal";
import UploadCVModal from "./modals/UploadCVModal";
import AddSkillsModal from "./modals/AddSkillsModal";

export default function StudentProfilePage() {
  const { 
    profile, 
    isLoading, 
    isError, 
    refetch, 
    handleSetDefault, 
    handleDeleteResume, 
    isDeleting,
    selectedCvForView,
    setSelectedCvForView,
    selectedCvForDelete,
    setSelectedCvForDelete,
    isUploadModalOpen,
    setIsUploadModalOpen,
    isSkillsModalOpen,
    setIsSkillsModalOpen,
    handleRemoveSkill,
    handleUpdateJobStatus,
    isUpdatingStatus,
  } = useStudentProfilePage();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
        <p className="text-[15px] font-medium text-slate-500">Đang tải thông tin hồ sơ...</p>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertCircle size={32} />
        </div>
        <div className="text-center">
          <h3 className="text-[18px] font-bold text-slate-900">Đã có lỗi xảy ra</h3>
          <p className="text-[14px] text-slate-500">Không thể tải thông tin hồ sơ của bạn.</p>
        </div>
        <button 
          onClick={() => refetch()}
          className="rounded-xl bg-slate-900 px-6 py-2.5 text-[14px] font-bold text-white transition hover:bg-slate-800"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 md:px-8">
      <div className="flex flex-col gap-10">
        <CVManagementSection 
          resumes={profile.resumes} 
          onSetDefault={handleSetDefault}
          onView={setSelectedCvForView}
          onDeleteClick={setSelectedCvForDelete}
          onUploadClick={() => setIsUploadModalOpen(true)}
          isDeleting={isDeleting}
        />

        <JobStatusSection 
          isOpenToWork={profile.isOpenToWork}
          onUpdate={handleUpdateJobStatus}
          isLoading={isUpdatingStatus}
        />

        <SkillsInterestsSection 
          skills={profile.skills} 
          onAddClick={() => setIsSkillsModalOpen(true)}
          onRemoveSkill={handleRemoveSkill}
        />
      </div>

      <ViewCVModal 
        open={!!selectedCvForView}
        onClose={() => setSelectedCvForView(null)}
        cv={selectedCvForView}
      />

      <DeleteCVModal 
        open={!!selectedCvForDelete}
        onClose={() => setSelectedCvForDelete(null)}
        onConfirm={handleDeleteResume}
        cv={selectedCvForDelete}
        isDeleting={isDeleting !== null}
      />

      <UploadCVModal 
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={refetch}
      />

      <AddSkillsModal 
        open={isSkillsModalOpen}
        onClose={() => setIsSkillsModalOpen(false)}
        onSuccess={refetch}
        currentSkillIds={profile.skills.map(s => s.skillId)}
      />
    </div>
  );
}
