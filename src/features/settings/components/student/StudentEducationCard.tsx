"use client";

import { GraduationCap } from "lucide-react";

type StudentEducationCardProps = {
  academicYearDisplay: string;
  gpa: string;
};

export default function StudentEducationCard({
  academicYearDisplay,
  gpa,
}: StudentEducationCardProps) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-500">
          <GraduationCap size={22} />
        </div>
        <div>
          <h2 className="text-[18px] font-bold text-slate-900">
            Thông tin học vấn
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-[14px] font-bold text-slate-700">
            Năm học <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 cursor-default">
            <GraduationCap className="text-slate-400" size={20} />
            <input
              type="text"
              value={academicYearDisplay}
              readOnly
              className="w-full text-base text-slate-700 outline-none bg-transparent cursor-default"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[14px] font-bold text-slate-700">
            GPA <span className="text-red-500">*</span>
          </label>
          <div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 cursor-default">
              <span className="text-base text-slate-700 font-medium">
                {gpa || "0.0"}
              </span>
              <span className="text-[13px] font-semibold text-slate-400">
                / 4.0
              </span>
            </div>
            <p className="mt-1.5 text-[12px] text-slate-500 pl-1">
              Điểm trung bình tích lũy của bạn
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
