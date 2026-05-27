"use client";

import { useState } from "react";
import { User, AlertTriangle } from "lucide-react";
import { useStudentSettings } from "../hooks/useStudentSettings";
import CommonSettingsSection from "./CommonSettingsSection";
import StudentAvatarSection from "./student/StudentAvatarSection";
import StudentAccountForm from "./student/StudentAccountForm";
import StudentEducationCard from "./student/StudentEducationCard";
import StudentAvatarZoomModal from "./student/StudentAvatarZoomModal";

export default function StudentSettingsPage() {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const {
    profile,
    isLoading,
    isError,
    refetch,
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    isUpdatingInfo,
    isUpdatingAvatar,
    handleUpdateInfo,
    handleAvatarChange,
    academicYearDisplay,
  } = useStudentSettings();

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1000px] px-4 py-10 md:px-8 space-y-6">
        <div className="h-64 w-full animate-pulse rounded-[32px] bg-slate-100" />
        <div className="h-48 w-full animate-pulse rounded-[32px] bg-slate-100" />
        <div className="h-48 w-full animate-pulse rounded-[32px] bg-slate-100" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-[1000px] px-4 py-10 md:px-8 flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle size={28} />
        </div>
        <h3 className="mt-4 text-base font-bold text-slate-800">
          Đã xảy ra lỗi khi tải dữ liệu
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Vui lòng thử lại sau hoặc bấm nút tải lại bên dưới.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-xl bg-slate-900 px-5 py-2 text-[14px] font-semibold text-white transition hover:bg-slate-800"
        >
          Tải lại dữ liệu
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px] px-4 pt-5 pb-10 md:px-8">
      <div className="flex flex-col gap-6">
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-500">
              <User size={22} />
            </div>
            <div>
              <h2 className="text-[18px] font-bold text-slate-900">
                Thông tin tài khoản
              </h2>
            </div>
          </div>

          <StudentAvatarSection
            avatarUrl={profile?.avatarUrl}
            fullName={fullName || profile?.fullName || ""}
            isUpdatingAvatar={isUpdatingAvatar}
            onAvatarClick={() => !isUpdatingAvatar && setIsZoomOpen(true)}
            onAvatarChange={handleAvatarChange}
            getInitials={getInitials}
          />

          <StudentAccountForm
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            studentCode={profile?.studentCode || ""}
            isUpdatingInfo={isUpdatingInfo}
            onUpdateInfo={handleUpdateInfo}
          />
        </section>

        <StudentEducationCard
          academicYearDisplay={academicYearDisplay}
          gpa={profile?.gpa || "0.0"}
        />

        <CommonSettingsSection />
      </div>

      <StudentAvatarZoomModal
        isOpen={isZoomOpen}
        avatarUrl={profile?.avatarUrl}
        onClose={() => setIsZoomOpen(false)}
        initials={getInitials(fullName || profile?.fullName || "")}
      />
    </div>
  );
}
