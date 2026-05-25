"use client";

import Link from "next/link";
import { ChevronDown, ChevronUp, Calendar, Building2, Clock, Eye, Users, CheckCircle2, Star, XCircle } from "lucide-react";
import type { DataPagination } from "../../types/application.types";
import { useState } from "react";
import CompanyEvaluationModal from "../modals/CompanyEvaluationModal";

type Props = {
  application: DataPagination;
};

export default function ApplicationListItem({ application }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);

  const statusConfig = {
    submitted: {
      label: "Chờ duyệt",
      className: "bg-amber-50 text-amber-600 border-amber-100",
      stepIndex: 0,
    },
    interviewing: {
      label: "Hẹn phỏng vấn",
      className: "bg-purple-50 text-purple-600 border-purple-100",
      stepIndex: 2,
    },
    passed: {
      label: "Đậu",
      className: "bg-emerald-50 text-emerald-600 border-emerald-100",
      stepIndex: 3,
    },
    rejected: {
      label: "Rớt",
      className: "bg-rose-50 text-rose-600 border-rose-100",
      stepIndex: 3,
    },
  };

  const config = statusConfig[application.status as keyof typeof statusConfig] || statusConfig.submitted;
  const isRejected = application.status === "rejected";
  const isPassed = application.status === "passed";
  const isInterviewing = application.status === "interviewing";

  const steps = [
    { label: "Đã nộp", icon: <Clock size={16} /> },
    { label: "Duyệt CV", icon: <Eye size={16} /> },
    { label: "Phỏng vấn", icon: <Users size={16} /> },
    { label: "Kết quả", icon: <CheckCircle2 size={16} /> },
  ];

  return (
    <div 
      className={`group overflow-hidden rounded-[24px] border bg-white transition-all duration-300 ${
        isExpanded 
          ? "border-cyan-200 shadow-lg ring-1 ring-cyan-100" 
          : "border-slate-100 shadow-sm hover:border-cyan-200 hover:shadow-md"
      }`}
    >
      <div className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8 md:py-7">
        <Link href={`/jobs-detail/${application.job.jobId}`} className="flex items-center gap-5 flex-1 group/link">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 shadow-inner group-hover/link:bg-cyan-50 group-hover/link:text-cyan-500 transition-colors">
            {application.company.logoUrl ? (
              <img 
                src={application.company.logoUrl} 
                alt={application.company.companyName}
                className="h-full w-full rounded-2xl object-cover" 
              />
            ) : (
              <Building2 size={32} />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[17px] font-bold text-slate-900 group-hover/link:text-cyan-600 transition-colors">
              {application.job.jobTitle}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-slate-500">
              <span className="font-medium text-slate-600">{application.company.companyName}</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400" />
                <span>Nộp: {new Date(application.createdAt).toLocaleDateString("vi-VN")}</span>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between gap-4 md:justify-end">
          <span className={`rounded-full border px-4 py-1 text-[13px] font-bold ${config.className}`}>
            {config.label}
          </span>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-[14px] font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-cyan-600 ${
              isExpanded ? "bg-cyan-50 border-cyan-200 text-cyan-600" : "bg-white"
            }`}
          >
            {isExpanded ? "Thu gọn" : "Chi tiết"}
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-slate-200 bg-white p-6 md:p-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-8">
            <div>
              <p className="text-[15px] font-bold text-slate-800 mb-8">Tiến trình ứng tuyển</p>
              <div className="relative flex justify-between">
                <div className="absolute top-5 left-0 h-[2px] w-full bg-slate-100" />
                
                <div 
                  className={`absolute top-5 left-0 h-[2px] transition-all duration-500 ${isRejected ? "bg-red-500" : "bg-emerald-500"}`}
                  style={{ width: `${(config.stepIndex / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => {
                  const isActive = index <= config.stepIndex;
                  const isCurrent = index === config.stepIndex;
                  
                  let circleClass = "bg-white border-slate-200 text-slate-400";
                  let textClass = "text-slate-400";

                  if (isActive) {
                    if (isRejected) {
                      circleClass = "bg-red-500 border-red-500 text-white shadow-lg shadow-red-100 ring-4 ring-red-50";
                      textClass = "text-red-600 font-bold";
                    } else {
                      circleClass = "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100 ring-4 ring-emerald-50";
                      textClass = "text-emerald-600 font-bold";
                    }
                  }

                  if (isPassed && index === 3) {
                    circleClass = "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100 ring-4 ring-emerald-50";
                    textClass = "text-emerald-600 font-bold";
                  }

                  return (
                    <div key={index} className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${circleClass}`}>
                        {step.icon}
                      </div>
                      <span className={`text-[13px] transition-colors duration-300 ${textClass}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {isRejected && (
              <div className="rounded-2xl bg-red-50 p-5 border border-red-100">
                <p className="text-[14px] font-bold text-red-700">Rất tiếc, hồ sơ của bạn chưa phù hợp cho vị trí này</p>
                <p className="mt-1 text-[13px] text-red-600/80">Đừng nản lòng! Hãy tiếp tục ứng tuyển các vị trí khác.</p>
              </div>
            )}

            {isPassed && (
              <div className="rounded-2xl bg-emerald-50 p-5 border border-emerald-100">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-emerald-500" size={20} />
                  <div>
                    <p className="text-[14px] font-bold text-emerald-700">Chúc mừng! Bạn đã được chấp nhận</p>
                    <p className="mt-1 text-[13px] text-emerald-600/80">Công ty sẽ liên hệ với bạn trong thời gian sớm nhất để hoàn tất thủ tục.</p>
                  </div>
                </div>
              </div>
            )}

            {(isPassed || isInterviewing || isRejected) && (
              <div className="flex flex-col gap-4 rounded-2xl bg-cyan-50/60 p-5 border border-cyan-200/50 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <Star className="text-amber-400 fill-amber-400" size={20} />
                  <p className="text-[14px] font-medium text-slate-700">Bạn có thể đánh giá công ty này</p>
                </div>
                <button 
                  onClick={() => setIsEvaluationOpen(true)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-white px-5 py-2.5 text-[14px] font-bold text-cyan-600 shadow-sm transition-all hover:bg-cyan-50"
                >
                  <Star size={18} />
                  Đánh giá công ty
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <CompanyEvaluationModal 
        isOpen={isEvaluationOpen}
        onClose={() => setIsEvaluationOpen(false)}
        companyId={application.company.companyId}
        companyName={application.company.companyName}
      />
    </div>
  );
}
