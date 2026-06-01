"use client";

import React from "react";
import { 
  Mail, 
  Phone, 
  FileText, 
  Check, 
  X, 
  Eye, 
  GraduationCap, 
  Star,
  Clock
} from "lucide-react";
import type { Application } from "@/features/candidates/types/candidate.types";
import CandidateAvatar from "@/features/candidates/components/shared/CandidateAvatar";
import { formatRelativeDate } from "@/features/job-postings/utils/job-postings.utils";

type Props = {
  application: Application;
  onViewProfile: (app: Application) => void;
  onUpdateStatus: (app: Application, status: "interviewing" | "passed" | "rejected") => void;
  onDownloadCV?: (app: Application) => void;
};

export default function JobApplicantCard({ 
  application, 
  onViewProfile, 
  onUpdateStatus,
  onDownloadCV 
}: Props) {
  const { student, status, createdAt, cvUrl } = application;
  
  const yearLabel = student.studentStatus === "GRADUATED" 
    ? "Đã tốt nghiệp" 
    : student.currentYear ? `Năm ${student.currentYear}` : "N/A";
  const majorLabel = student.majorName || "Chưa cập nhật chuyên ngành";

  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-cyan-100 hover:shadow-md">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-5">
          <CandidateAvatar 
            name={student.fullName} 
            avatarUrl={student.avatarUrl} 
            size={72}
            className="ring-4 ring-slate-50"
          />
          
          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <h3 className="truncate text-[18px] font-bold text-slate-900">{student.fullName}</h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-medium text-slate-500">
                <div className="flex items-center gap-1.5">
                  <GraduationCap size={14} className="text-slate-400" />
                  <span>{yearLabel}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span className="truncate">{majorLabel}</span>
                </div>
              </div>
            </div>
 
            <div className="flex flex-wrap gap-2">
              {student.skills?.slice(0, 5).map((skill: string | { skillId: number; skillName: string }) => (
                <span 
                  key={typeof skill === 'string' ? skill : skill.skillId} 
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-[12px] font-semibold text-slate-600"
                >
                  {typeof skill === 'string' ? skill : skill.skillName}
                </span>
              ))}
              {(student.skills?.length || 0) > 5 && (
                <span className="text-[12px] font-medium text-slate-400">
                  +{student.skills!.length - 5}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-[13px] text-slate-500">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-slate-400" />
                <span className="truncate">{student.email}</span>
              </div>
              {student.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <span>{student.phone}</span>
                </div>
              )}
              {cvUrl && (
                <button 
                  onClick={() => onDownloadCV?.(application)}
                  className="flex items-center gap-2 font-medium text-cyan-600 transition hover:text-cyan-700"
                >
                  <FileText size={14} />
                  <span className="truncate">CV_{student.fullName.replace(/\s+/g, '_')}.pdf</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-[12px] text-slate-400">
              <Clock size={12} />
              <span>Ứng tuyển: {formatRelativeDate(createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3 lg:justify-end">
          <button
            onClick={() => onViewProfile(application)}
            className="flex h-11 items-center gap-2 whitespace-nowrap rounded-xl border border-cyan-200 bg-white px-5 text-[14px] font-bold text-cyan-600 transition-all hover:bg-cyan-50 hover:shadow-sm"
          >
            <Eye size={18} />
            <span>Xem hồ sơ</span>
          </button>

          {status === "submitted" && (
            <>
              <button
                onClick={() => onUpdateStatus(application, "rejected")}
                className="flex h-11 items-center gap-2 whitespace-nowrap rounded-xl border border-red-200 bg-white px-5 text-[14px] font-bold text-red-500 transition-all hover:bg-red-50"
              >
                <X size={18} />
                <span>Từ chối</span>
              </button>
              <button
                onClick={() => onUpdateStatus(application, "interviewing")}
                className="flex h-11 items-center gap-2 whitespace-nowrap rounded-xl bg-emerald-500 px-5 text-[14px] font-bold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <Check size={18} />
                <span>Duyệt hồ sơ</span>
              </button>
            </>
          )}

          {status === "interviewing" && (
            <>
              <button
                onClick={() => onUpdateStatus(application, "rejected")}
                className="flex h-11 items-center gap-2 whitespace-nowrap rounded-xl border border-red-200 bg-white px-5 text-[14px] font-bold text-red-500 transition-all hover:bg-red-50"
              >
                <X size={18} />
                <span>Rớt</span>
              </button>
              <button
                onClick={() => onUpdateStatus(application, "passed")}
                className="flex h-11 items-center gap-2 whitespace-nowrap rounded-xl bg-emerald-500 px-5 text-[14px] font-bold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <Check size={18} />
                <span>Đậu</span>
              </button>
            </>
          )}

          {(status === "passed" || status === "rejected") && (
            <div className={`flex h-11 items-center whitespace-nowrap rounded-xl px-6 text-[14px] font-bold ${
              status === "passed" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
            }`}>
              {status === "passed" ? "Đã trúng tuyển" : "Đã từ chối"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
