"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle, 
  XCircle, 
  ShieldAlert, 
  RefreshCcw, 
  Unlock, 
  Star, 
  Users, 
  Briefcase, 
  UserCheck,
  ChevronRight
} from "lucide-react";
import type { AdminCompanyDataPart, CompanyStatus } from "../../types/company.types";
import CompanyStatusModal from "./CompanyStatusModal";

type Props = {
  company: AdminCompanyDataPart;
  onStatusChange: (status: CompanyStatus, reason?: string) => Promise<void>;
  isChanging: boolean;
};

export default function CompanyMonitoringCard({ company, onStatusChange, isChanging }: Props) {
  const [modalMode, setModalMode] = useState<"REJECTED" | "RESTRICTED" | null>(null);

  const getStatusBadge = (status: CompanyStatus) => {
    switch (status) {
      case "PENDING":
        return { label: "Chờ duyệt", className: "bg-amber-50 text-amber-600 border-amber-100" };
      case "APPROVED":
        return { label: "Hoạt động", className: "bg-emerald-50 text-emerald-600 border-emerald-100" };
      case "REJECTED":
        return { label: "Từ chối", className: "bg-red-50 text-red-600 border-red-100" };
      case "RESTRICTED":
        return { label: "Hạn chế", className: "bg-slate-100 text-slate-600 border-slate-200" };
      default:
        return { label: status, className: "bg-slate-50 text-slate-500 border-slate-100" };
    }
  };

  const statusBadge = getStatusBadge(company.status);

  const handleAction = (status: CompanyStatus) => {
    if (status === "REJECTED" || status === "RESTRICTED") {
      setModalMode(status);
    } else {
      onStatusChange(status);
    }
  };

  return (
    <div className="group relative flex flex-col rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-200/50">
      <div className="flex items-start gap-4 mb-6">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-transform group-hover:scale-105">
          {company.logoUrl ? (
            <Image src={company.logoUrl} alt={company.companyName} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
              <Users size={40} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusBadge.className}`}>
              {statusBadge.label}
            </span>
          </div>
          <h3 className="truncate text-[17px] font-bold text-slate-900 leading-tight group-hover:text-cyan-600 transition-colors">
            {company.companyName}
          </h3>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5">{company.industry || "Chưa cập nhật ngành nghề"}</p>
          <div className="flex items-center gap-1.5 mt-2 text-[13px] font-bold text-slate-700">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>{company.rating || "0"}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-slate-200 pt-5 mb-6">
        <div className="text-center">
          <div className="text-[18px] font-bold text-slate-900">{company.followers || 0}</div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">Theo dõi</div>
        </div>
        <div className="text-center border-x border-slate-200">
          <div className="text-[18px] font-bold text-slate-900">{company.totalJobs || 0}</div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">Tin tuyển</div>
        </div>
        <div className="text-center">
          <div className="text-[15px] font-bold text-slate-900 leading-tight h-[27px] flex items-center justify-center">{company.companySize || "N/A"}</div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-tight">Quy mô</div>
        </div>
      </div>

      <div className="space-y-3 mt-auto">
        <Link
          href={`/company/${company.companyId}`}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 text-[14px] font-bold text-white shadow-lg shadow-cyan-100 transition hover:bg-cyan-700 hover:shadow-cyan-200 active:scale-95"
        >
          Xem chi tiết
          <ChevronRight size={16} />
        </Link>

        <div className="grid grid-cols-2 gap-2.5">
          {company.status === "PENDING" && (
            <>
              <button
                onClick={() => handleAction("APPROVED")}
                disabled={isChanging}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-[13px] font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-600 hover:shadow-emerald-200 active:scale-95 disabled:opacity-50"
              >
                <CheckCircle size={16} />
                Duyệt
              </button>
              <button
                onClick={() => handleAction("REJECTED")}
                disabled={isChanging}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-red-500 text-[13px] font-bold text-white shadow-lg shadow-red-100 transition hover:bg-red-600 hover:shadow-red-200 active:scale-95 disabled:opacity-50"
              >
                <XCircle size={16} />
                Từ chối
              </button>
            </>
          )}

          {company.status === "APPROVED" && (
            <button
              onClick={() => handleAction("RESTRICTED")}
              disabled={isChanging}
              className="col-span-2 flex h-10 items-center justify-center gap-2 rounded-xl bg-orange-500 text-[13px] font-bold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600 hover:shadow-orange-200 active:scale-95 disabled:opacity-50"
            >
              <ShieldAlert size={16} />
              Hạn chế hoạt động
            </button>
          )}

          {company.status === "REJECTED" && (
            <button
              onClick={() => handleAction("APPROVED")}
              disabled={isChanging}
              className="col-span-2 flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-[13px] font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700 hover:shadow-emerald-200 active:scale-95 disabled:opacity-50"
            >
              <RefreshCcw size={16} />
              Duyệt lại đơn
            </button>
          )}

          {company.status === "RESTRICTED" && (
            <button
              onClick={() => handleAction("APPROVED")}
              disabled={isChanging}
              className="col-span-2 flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-[13px] font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-600 hover:shadow-emerald-200 active:scale-95 disabled:opacity-50"
            >
              <Unlock size={16} />
              Mở lại hoạt động
            </button>
          )}
        </div>
      </div>

      <CompanyStatusModal
        open={!!modalMode}
        mode={modalMode || "REJECTED"}
        isLoading={isChanging}
        onClose={() => setModalMode(null)}
        onConfirm={async (reason) => {
          if (modalMode) {
            await onStatusChange(modalMode, reason);
            setModalMode(null);
          }
        }}
      />
    </div>
  );
}
