"use client";

import { useMemo, useState } from "react";
import { Loader2, RotateCcw } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import type { Role } from "@/features/auth/constants/roles";
import type {
  CategoryItem,
  JobPostingDataItem,
} from "@/features/job-postings/types/job-postings.types";
import CompanyJobCard from "./CompanyJobCard";

type Props = {
  jobs: JobPostingDataItem[];
  categories: CategoryItem[];
  viewerRole: Role;
  isLoading?: boolean;
  onViewJobDetail: (jobId: number) => void;
  onApplyJob?: (job: JobPostingDataItem) => void;
};

type SalaryFilterValue =
  | "all"
  | "negotiable"
  | "under-10m"
  | "10m-20m"
  | "above-20m";

const DEFAULT_CATEGORY_FILTER = "all";
const DEFAULT_SALARY_FILTER: SalaryFilterValue = "all";

const salaryFilterOptions: Array<{
  label: string;
  value: SalaryFilterValue;
}> = [
  { label: "Tất cả mức lương", value: "all" },
  { label: "Thỏa thuận", value: "negotiable" },
  { label: "Dưới 10 triệu", value: "under-10m" },
  { label: "Từ 10 - 20 triệu", value: "10m-20m" },
  { label: "Trên 20 triệu", value: "above-20m" },
];

export default function CompanyJobsSection({
  jobs,
  categories,
  viewerRole,
  isLoading = false,
  onViewJobDetail,
  onApplyJob,
}: Props) {
  const [categoryFilter, setCategoryFilter] = useState<string>(
    DEFAULT_CATEGORY_FILTER,
  );
  const [salaryFilter, setSalaryFilter] = useState<SalaryFilterValue>(
    DEFAULT_SALARY_FILTER,
  );

  const hasActiveFilters =
    categoryFilter !== DEFAULT_CATEGORY_FILTER ||
    salaryFilter !== DEFAULT_SALARY_FILTER;

  const categoryOptions = useMemo(
    () => [
      { label: "Tất cả ngành nghề", value: DEFAULT_CATEGORY_FILTER },
      ...categories.map((category) => ({
        label: category.categoryName,
        value: String(category.categoryId),
      })),
    ],
    [categories],
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (viewerRole === "STUDENT" && job.status !== "approved") {
        return false;
      }

      const matchCategory =
        categoryFilter === DEFAULT_CATEGORY_FILTER ||
        String(job.categoryId) === categoryFilter;

      let matchSalary = true;

      if (salaryFilter !== DEFAULT_SALARY_FILTER) {
        if (salaryFilter === "negotiable") {
          matchSalary =
            job.isSalaryNegotiable || job.salaryType === "NEGOTIABLE";
        } else {
          if (job.isSalaryNegotiable || job.salaryType === "NEGOTIABLE") {
            matchSalary = false;
          } else {
            if (job.salaryMin == null || job.salaryMax == null) {
              matchSalary = false;
            } else {
              const avgSalary = (job.salaryMin + job.salaryMax) / 2;

              if (salaryFilter === "under-10m") {
                matchSalary = avgSalary < 10_000_000;
              }

              if (salaryFilter === "10m-20m") {
                matchSalary =
                  avgSalary >= 10_000_000 && avgSalary <= 20_000_000;
              }

              if (salaryFilter === "above-20m") {
                matchSalary = avgSalary > 20_000_000;
              }
            }
          }
        }
      }

      return matchCategory && matchSalary;
    });
  }, [jobs, categoryFilter, salaryFilter, viewerRole]);

  const handleResetFilters = () => {
    setCategoryFilter(DEFAULT_CATEGORY_FILTER);
    setSalaryFilter(DEFAULT_SALARY_FILTER);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
        <CustomSelect
          label=""
          placeholder="Tất cả ngành nghề"
          value={categoryFilter}
          options={categoryOptions}
          onChange={setCategoryFilter}
        />

        <CustomSelect
          label=""
          placeholder="Tất cả mức lương"
          value={salaryFilter}
          options={salaryFilterOptions}
          onChange={(value) => setSalaryFilter(value as SalaryFilterValue)}
        />

        <button
          type="button"
          onClick={handleResetFilters}
          disabled={!hasActiveFilters}
          className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-[14.5px] font-semibold transition ${
            hasActiveFilters
              ? "border border-(--color-border) bg-white text-(--color-text) shadow-sm hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
              : "cursor-not-allowed border border-(--color-border) bg-slate-100 text-slate-400"
          }`}
        >
          <RotateCcw size={15} />
          Đặt lại
        </button>
      </div>

      {!isLoading ? (
        <div className="mt-3 text-[13px] text-slate-500">
          Hiển thị {filteredJobs.length} / {jobs.length} tin tuyển dụng
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-4 flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-10">
          <Loader2 size={22} className="animate-spin text-slate-400" />
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-[15px] text-slate-500">
          Không có tin tuyển dụng phù hợp với bộ lọc hiện tại.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {filteredJobs.map((job) => (
            <CompanyJobCard
              key={job.jobId}
              job={job}
              viewerRole={viewerRole}
              onViewDetail={onViewJobDetail}
              onApply={onApplyJob}
            />
          ))}
        </div>
      )}
    </section>
  );
}
