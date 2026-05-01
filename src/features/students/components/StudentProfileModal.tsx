"use client";

import { X, Mail, Phone, Calendar, Download, FileText, AlertCircle, Star, FileWarning } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";
import { useStudentProfileModal } from "../hooks/useStudentProfileModal";
import { handleDownloadCV } from "@/utils/downloadCV";
import StudentProfileSkeleton from "./StudentProfileSkeleton";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  studentId: number | null;
  role: "admin" | "company";
  applicationStatus?: string;
  adminNote?: string | null;
  onUpdateStatus?: (status: string) => void;
  onInvite?: () => void;
  inviteLabel?: string;
  showInviteCTA?: boolean;
};

const ACADEMIC_STATUS = {
  STUDYING: { label: "Đang học", color: "bg-blue-50 text-blue-600", dot: "bg-blue-500" },
  GRADUATED: { label: "Đã tốt nghiệp", color: "bg-emerald-50 text-emerald-600", dot: "bg-emerald-500" },
  DROPPED_OUT: { label: "Thôi học", color: "bg-red-50 text-red-600", dot: "bg-red-500" },
};

export default function StudentProfileModal({
  open,
  onClose,
  studentId,
  role,
  applicationStatus,
  adminNote,
  onUpdateStatus,
  onInvite,
  inviteLabel = "Gửi lời mời",
  showInviteCTA = false,
}: Props) {
  const { profile, isLoading, isError, retry } = useStudentProfileModal(open, studentId, onClose);

  if (!open) return null;

  const defaultCv = profile?.resumes.find((r) => r.isDefault) || profile?.resumes[0];
  const academicStatus = ACADEMIC_STATUS[profile?.studentStatus as keyof typeof ACADEMIC_STATUS] || ACADEMIC_STATUS.STUDYING;

  const onDownload = () => {
    if (!defaultCv) return;
    toast.promise(handleDownloadCV(defaultCv.cvUrl, `CV_${profile?.fullName.replace(/\s+/g, "_")}.pdf`), {
      loading: "Đang chuẩn bị tệp tin...",
      success: "Tải xuống thành công!",
      error: "Không thể tải tệp tin",
    });
  };

  return (
    <ClientPortal>
      <div 
        className="fixed inset-0 z-[400] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="flex h-[92vh] w-full max-w-[1050px] flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white px-10 pt-8 pb-5">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-[24px] font-bold text-slate-900 mb-1">Thông tin sinh viên</h2>
                {profile && (
                  <p className="text-[15px] text-slate-500 font-medium">
                    Ứng viên: <span className="text-slate-900 font-semibold">{profile.fullName}</span> - {profile.studentCode}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                {defaultCv && (
                  <button
                    type="button"
                    onClick={onDownload}
                    className="flex h-11 items-center gap-2 rounded-xl border-2 border-cyan-500 px-5 text-[14px] font-semibold text-cyan-600 transition hover:bg-cyan-50 active:scale-95"
                  >
                    <Download size={18} />
                    Tải CV
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-slate-100 p-2.5 text-slate-500 transition hover:bg-slate-200"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {profile && (
              <div className="grid grid-cols-4 gap-4 rounded-[24px] border border-cyan-100 bg-cyan-50/20 p-4">
                <div className="flex items-center gap-3.5 px-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                    <Mail size={22} />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400">Email</p>
                    <p className="text-[15px] font-semibold text-slate-700 break-all">{profile.emailStudent}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 px-4 border-l border-cyan-100">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400">Điện thoại</p>
                    <p className="text-[15px] font-semibold text-slate-700">{profile.phone || "---"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 px-4 border-l border-cyan-100">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-wider text-slate-400">Ngày nộp</p>
                    <p className="text-[15px] font-semibold text-slate-700">
                      {new Date(profile.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end px-4">
                  <div className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold shadow-sm ${academicStatus.color}`}>
                    <span className={`h-2 w-2 rounded-full ${academicStatus.dot}`} />
                    {academicStatus.label}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-1 overflow-hidden bg-white">
            {isError ? (
              <div className="flex flex-1 flex-col items-center justify-center">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <button onClick={retry} className="mt-4 rounded-xl bg-cyan-600 px-6 py-2 text-white font-semibold">Thử lại</button>
              </div>
            ) : isLoading ? (
              <div className="flex-1 p-10"><StudentProfileSkeleton /></div>
            ) : !profile ? (
              <div className="flex flex-1 items-center justify-center text-slate-400 font-medium">Không tìm thấy hồ sơ</div>
            ) : (
              <>
                <div className="flex-1 p-8 bg-slate-50/30 overflow-hidden flex flex-col">
                  {defaultCv ? (
                    <div 
                      className="flex-1 rounded-[32px] border border-slate-200 bg-white shadow-sm overflow-hidden relative group cursor-pointer"
                      onClick={onDownload}
                    >
                      <iframe
                        src={`${defaultCv.cvUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full border-none pointer-events-none"
                        title="CV Preview"
                      />
                      <div className="absolute inset-0 bg-white/0 transition-all duration-300 group-hover:bg-slate-900/10 group-hover:backdrop-blur-[2px] flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white shadow-2xl">
                            <Download size={28} />
                          </div>
                          <p className="text-[16px] font-semibold text-slate-900 bg-white/90 px-6 py-2 rounded-full shadow-lg">
                            Nhấn để tải CV ngay
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 rounded-[40px] bg-gradient-to-br from-slate-50 to-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center">
                      <div className="relative mb-8">
                        <div className="relative flex h-28 w-28 items-center justify-center rounded-[32px] bg-white text-amber-500 shadow-xl border border-amber-50">
                          <FileWarning size={56} />
                        </div>
                      </div>
                      <h3 className="text-[20px] font-bold text-slate-900 mb-3 uppercase tracking-tight">Chưa đính kèm hồ sơ</h3>
                      <p className="max-w-[320px] text-[14px] leading-relaxed text-slate-500 font-medium">
                        Ứng viên này hiện chưa cập nhật bản CV lên hệ thống.
                      </p>
                    </div>
                  )}
                </div>

                <div className="w-[360px] overflow-y-auto p-8 border-l border-slate-100 bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <section className="mb-10">
                    <h3 className="mb-5 text-[17px] font-bold text-slate-900">Thông tin cơ bản</h3>
                    <div className="rounded-[24px] bg-slate-50/60 p-6 space-y-5">
                      <div className="flex justify-between items-center text-[14px]">
                        <span className="text-slate-500 font-medium">MSSV</span>
                        <span className="font-semibold text-slate-800">{profile.studentCode}</span>
                      </div>
                      <div className="flex justify-between items-center text-[14px]">
                        <span className="text-slate-500 font-medium">Năm học</span>
                        <span className="font-semibold text-slate-800">
                          {profile.studentStatus === "GRADUATED" 
                            ? "Đã tốt nghiệp" 
                            : `Năm ${profile.currentYear}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-[14px]">
                        <span className="text-slate-500 font-medium text-left">Chuyên ngành</span>
                        <span className="font-semibold text-slate-800 text-right max-w-[180px]">{profile.majorName}</span>
                      </div>
                      <div className="flex justify-between items-center text-[14px]">
                        <span className="text-slate-500 font-medium">GPA</span>
                        <span className="flex items-center gap-1 font-semibold text-slate-800">
                          <Star size={16} className="fill-amber-400 text-amber-400" />
                          {profile.gpa} / 4.0
                        </span>
                      </div>
                    </div>
                  </section>

                  <section className="mb-10">
                    <h3 className="mb-5 text-[17px] font-bold text-slate-900">Kỹ năng</h3>
                    <div className="flex flex-wrap gap-2.5">
                      {profile.skills.map((skill, i) => (
                        <span key={i} className="rounded-full bg-cyan-50 px-5 py-1.5 text-[13px] font-semibold text-cyan-600 border border-cyan-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  {role === "admin" && (
                    <div className="space-y-10">
                      <section>
                        <h3 className="mb-5 text-[17px] font-bold text-slate-900">Thống kê ứng tuyển</h3>
                        <div className="rounded-[24px] bg-slate-50/60 p-6 space-y-4">
                          <div className="flex justify-between text-[14px]">
                            <span className="text-slate-500 font-medium">Đơn đã nộp</span>
                            <span className="font-semibold text-slate-800">{profile.totalApplications ?? 0} đơn</span>
                          </div>
                          <div className="flex justify-between text-[14px]">
                            <span className="text-slate-500 font-medium">Trạng thái</span>
                            <span className="font-semibold text-slate-800">{profile.isOpenToWork ? "Đang tìm việc" : "Bận"}</span>
                          </div>
                        </div>
                      </section>
                      <section>
                        <h3 className="mb-5 text-[17px] font-bold text-slate-900">Ghi chú</h3>
                        <div className="rounded-[24px] bg-slate-50/60 p-6 text-[14px] leading-relaxed text-slate-500 italic font-medium">
                          {adminNote || "Không có ghi chú."}
                        </div>
                      </section>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {!isLoading && !isError && profile && (
            <div className="flex items-center justify-end gap-4 border-t border-slate-100 bg-white px-10 py-6">
              <button onClick={onClose} className="h-12 min-w-[120px] rounded-2xl border border-slate-200 bg-white text-[15px] font-semibold text-slate-600 transition hover:bg-slate-50">
                Đóng
              </button>
              
              {role === "company" && (
                <>
                  {applicationStatus === "submitted" && (
                    <>
                      <button onClick={() => onUpdateStatus?.("rejected")} className="h-12 min-w-[120px] rounded-2xl border-2 border-red-500 text-[15px] font-semibold text-red-500 hover:bg-red-50">Loại</button>
                      <button onClick={() => onUpdateStatus?.("interviewing")} className="h-12 min-w-[120px] rounded-2xl bg-emerald-600 text-[15px] font-semibold text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700">Duyệt</button>
                    </>
                  )}
                  {applicationStatus === "interviewing" && (
                    <>
                      <button onClick={() => onUpdateStatus?.("rejected")} className="h-12 min-w-[120px] rounded-2xl border-2 border-red-500 text-[15px] font-semibold text-red-500 hover:bg-red-50">Loại</button>
                      <button onClick={() => onUpdateStatus?.("passed")} className="h-12 min-w-[120px] rounded-2xl bg-emerald-600 text-[15px] font-semibold text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700">Đậu</button>
                    </>
                  )}
                  {showInviteCTA && onInvite && (
                    <button
                      onClick={onInvite}
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-8 text-[15px] font-semibold text-white shadow-lg shadow-cyan-100 transition hover:bg-cyan-600 active:scale-95"
                    >
                      <Mail size={18} />
                      {inviteLabel}
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </ClientPortal>
  );
}
