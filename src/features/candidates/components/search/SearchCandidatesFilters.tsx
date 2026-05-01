"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import type { SkillItem } from "@/features/job-postings/types/job-postings.types";
import type {
  SearchCandidatesFiltersValue,
  StudentCardYearValue,
} from "../../types/student-card.types";

export type MajorOption = {
  label: string;
  value: string;
};

type Props = {
  filters: SearchCandidatesFiltersValue;
  skills: SkillItem[];
  majorOptions?: MajorOption[];
  isSkillsLoading?: boolean;
  isMajorsLoading?: boolean;
  skillsError?: string | null;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onMajorChange: (value: string) => void;
  onToggleYear: (year: StudentCardYearValue) => void;
  onMinGpaChange: (value: number) => void;
  onToggleSkill: (skillId: number) => void;
  onOpenToWorkChange: (checked: boolean) => void;
  onApply: () => void;
  onClear: () => void;
  className?: string;
};

const YEAR_OPTIONS: Array<{ label: string; value: StudentCardYearValue }> = [
  { label: "Năm 1", value: 1 },
  { label: "Năm 2", value: 2 },
  { label: "Năm 3", value: 3 },
  { label: "Năm 4", value: 4 },
  { label: "Đã tốt nghiệp", value: "GRADUATED" },
];

export default function SearchCandidatesFilters({
  filters,
  skills,
  majorOptions = [],
  isSkillsLoading = false,
  isMajorsLoading = false,
  skillsError,
  onSearchChange,
  onSearchSubmit,
  onMajorChange,
  onToggleYear,
  onMinGpaChange,
  onToggleSkill,
  onOpenToWorkChange,
  onApply,
  onClear,
  className = "",
}: Props) {
  const [showAllSkills, setShowAllSkills] = useState(false);

  const visibleSkills = useMemo(() => {
    if (showAllSkills) return skills;
    return skills.slice(0, 12);
  }, [showAllSkills, skills]);

  return (
    <div className={`rounded-[28px] border border-cyan-100 bg-white p-4 shadow-sm sm:p-5 flex flex-col ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
            <Filter size={18} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 leading-tight">Bộ lọc</h2>
            <p className="text-[12px] text-slate-400">
              Tìm ứng viên phù hợp
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="rounded-lg px-3 py-1.5 text-[14px] font-semibold text-cyan-600 transition-all hover:bg-cyan-50 hover:text-cyan-700 active:scale-95"
        >
          Xóa
        </button>
      </div>

      <div className="space-y-5 flex-1">
        <div>
          <label className="mb-1.5 block text-[14px] font-semibold text-slate-800">
            Tìm kiếm
          </label>

          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onSearchSubmit();
                }
              }}
              placeholder="Tìm theo tên sinh viên"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-[14px] text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-[14px] font-semibold text-slate-800">
            Ngành học
          </p>
          {isMajorsLoading ? (
            <div className="flex h-11 items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 text-[14px] text-slate-400">
              Đang tải ngành học...
            </div>
          ) : majorOptions.length > 0 ? (
            <CustomSelect
              label=""
              placeholder="Tất cả ngành học"
              value={filters.majorId}
              options={majorOptions}
              onChange={onMajorChange}
            />
          ) : (
            <div className="flex h-11 items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 text-[14px] text-slate-400">
              Không có dữ liệu ngành học
            </div>
          )}
        </div>

        <div>
          <p className="mb-2 text-[14px] font-semibold text-slate-800">
            Năm học
          </p>
          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            {YEAR_OPTIONS.map((option) => {
              const checked = filters.years.includes(option.value);

              return (
                <label
                  key={String(option.value)}
                  className="flex cursor-pointer items-center gap-2.5 text-[14px] text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleYear(option.value)}
                    className="h-4.5 w-4.5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-200"
                  />
                  <span className="truncate">{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[14px] font-semibold text-slate-800">
              GPA tối thiểu
            </p>
            <span className="text-[14px] font-semibold text-cyan-600">
              {filters.minGpa.toFixed(1)} / 4.0
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={4}
            step={0.1}
            value={filters.minGpa}
            onChange={(e) => onMinGpaChange(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-cyan-100 accent-cyan-500"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[14px] font-semibold text-slate-800">Kỹ năng</p>
            {skills.length > 12 ? (
              <button
                type="button"
                onClick={() => setShowAllSkills((prev) => !prev)}
                className="text-[13px] font-semibold text-cyan-600 transition hover:text-cyan-700"
              >
                {showAllSkills ? "Thu gọn" : "Xem thêm"}
              </button>
            ) : null}
          </div>

          {isSkillsLoading ? (
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 text-[13px] text-slate-500">
              Đang tải...
            </div>
          ) : skillsError ? (
            <div className="rounded-2xl border border-rose-100 bg-rose-50 px-3 py-2 text-[13px] text-rose-600">
              Lỗi tải kỹ năng
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {visibleSkills.map((skill) => {
                const isSelected = filters.skillIds.includes(skill.skillId);

                return (
                  <button
                    key={skill.skillId}
                    type="button"
                    onClick={() => onToggleSkill(skill.skillId)}
                    className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition ${
                      isSelected
                        ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-cyan-200 hover:bg-slate-50"
                    }`}
                  >
                    {skill.skillName}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 rounded-2xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-[14px] text-slate-700">
          <input
            type="checkbox"
            checked={filters.isOpenToWork}
            onChange={(e) => onOpenToWorkChange(e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-200"
          />
          <div>
            <p className="font-medium leading-tight">Đang tìm việc</p>
            <p className="text-[12px] text-slate-500">
              Bỏ chọn để xem toàn bộ
            </p>
          </div>
        </label>
      </div>

      <button
        type="button"
        onClick={onApply}
        className="mt-5 h-11 w-full rounded-2xl bg-cyan-500 text-[14px] font-semibold text-white transition hover:bg-cyan-600 shadow-sm"
      >
        Áp dụng bộ lọc
      </button>
    </div>
  );
}
