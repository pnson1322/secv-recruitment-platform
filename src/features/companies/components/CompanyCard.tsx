import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, ChevronRight } from "lucide-react";
import { StudentCompanyDataPart } from "@/features/company-profile/types/company.types";

interface CompanyCardProps {
  company: StudentCompanyDataPart;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-50 bg-slate-50">
          {company.logoUrl ? (
            <Image
              src={company.logoUrl}
              alt={company.companyName}
              fill
              className="object-contain p-2"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
              <Briefcase size={24} />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-1">
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
            {company.companyName}
          </h3>
          <p className="text-[14px] text-slate-500 line-clamp-1">
            {company.industry}
          </p>
          <div className="flex items-center gap-1.5 text-cyan-600">
            <Briefcase size={16} />
            <span className="text-[14px] font-semibold">
              {company.activeJobs} việc đang tuyển
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2.5">
        <button className="flex-1 rounded-xl border border-slate-200 py-2.5 text-[14px] font-bold text-slate-700 transition hover:bg-slate-50">
          Theo dõi
        </button>
        <Link
          href={`/company/${company.companyId}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-cyan-500 py-2.5 text-[14px] font-bold text-white transition hover:bg-cyan-600"
        >
          Xem công ty
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
