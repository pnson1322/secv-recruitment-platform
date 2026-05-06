import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, MapPin, DollarSign, Clock, Users, ChevronRight, Bookmark } from "lucide-react";
import { JobPostingCardStudentItem } from "@/features/job-postings/types/job-postings.types";
import { useSaveJobPosting } from "../../hooks/useSaveJobPosting";

interface StudentJobCardProps {
  job: JobPostingCardStudentItem;
}

export default function StudentJobCard({ job }: StudentJobCardProps) {
  const toggleSaveMutation = useSaveJobPosting(job.jobId);

  const formatSalary = () => {
    if (job.isSalaryNegotiable) return "Thỏa thuận";
    if (job.salaryMin && job.salaryMax) {
      return `${(job.salaryMin / 1000000).toString().replace(".", ",")} - ${(job.salaryMax / 1000000).toString().replace(".", ",")} triệu`;
    }
    if (job.salaryMin) return `Từ ${(job.salaryMin / 1000000).toString().replace(".", ",")} triệu`;
    if (job.salaryMax) return `Đến ${(job.salaryMax / 1000000).toString().replace(".", ",")} triệu`;
    return "Thỏa thuận";
  };

  const isSaved = job.saved ?? false;

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-500/10">
      <div className="flex gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-50 bg-slate-50">
          {job.logoUrl ? (
            <Image
              src={job.logoUrl}
              alt={job.companyName}
              fill
              className="object-contain p-2"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
              <Building2 size={24} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-1 overflow-hidden">
          <Link 
            href={`/jobs-detail/${job.jobId}`}
            className="text-lg font-bold text-slate-900 line-clamp-1 hover:text-cyan-600 transition"
          >
            {job.jobTitle}
          </Link>
          <Link 
            href={`/company/${job.companyId}`}
            className="text-[14px] text-slate-500 line-clamp-1 hover:text-cyan-600 transition"
          >
            {job.companyName}
          </Link>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[13px] font-medium text-slate-600">
        <div className="flex items-center gap-1.5">
          <DollarSign size={15} className="text-emerald-500" />
          <span className="truncate">{formatSalary()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin size={15} className="text-rose-500" />
          <span className="truncate">{job.city || "Không xác định"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={15} className="text-amber-500" />
          <span className="truncate">{job.postedAt}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={15} className="text-blue-500" />
          <span className="truncate">{job.applicantCount} ứng tuyển</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills && job.skills.slice(0, 3).map((skill) => (
          <span 
            key={skill.skillId} 
            className="rounded-lg bg-slate-50 px-2.5 py-1 text-[12px] font-medium text-slate-600"
          >
            {skill.skillName}
          </span>
        ))}
        {job.skills && job.skills.length > 3 && (
          <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[12px] font-medium text-slate-500">
            +{job.skills.length - 3}
          </span>
        )}
      </div>

      <div className="mt-5 flex gap-2.5">
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleSaveMutation.mutate(isSaved);
          }}
          disabled={toggleSaveMutation.isPending}
          className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl border transition disabled:opacity-50 ${
            isSaved 
              ? "border-amber-100 bg-amber-50 text-amber-500 hover:bg-amber-100" 
              : "border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
          }`}
          title={isSaved ? "Bỏ lưu" : "Lưu tin"}
        >
          <Bookmark size={20} className={isSaved ? "fill-amber-500" : ""} />
        </button>
        <Link
          href={`/jobs-detail/${job.jobId}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-cyan-500 py-2.5 text-[14px] font-bold text-white transition hover:bg-cyan-600"
        >
          Xem chi tiết
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
