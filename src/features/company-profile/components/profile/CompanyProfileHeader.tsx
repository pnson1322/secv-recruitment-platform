"use client";

import Image from "next/image";
import { Pencil, ShieldAlert, Camera, CheckCircle, XCircle, RefreshCcw, Unlock, MessageSquare } from "lucide-react";
import type { Role } from "@/features/auth/constants/roles";
import type { CompanyProfile, CompanyStatus } from "../../types/company.types";

type Props = {
  company: CompanyProfile;
  viewerRole: Role;
  isOwner?: boolean;
  onEditBasicInfo?: () => void;
  onChangeLogo?: () => void;
  onChangeCoverImage?: () => void;
  onFollow?: () => void;
  onChangeStatus?: (status: CompanyStatus, reason?: string) => void;
  onChat?: () => void;
};

export default function CompanyProfileHeader({
  company,
  viewerRole,
  isOwner = false,
  onEditBasicInfo,
  onChangeLogo,
  onChangeCoverImage,
  onFollow,
  onChangeStatus,
  onChat,
}: Props) {
  const isStudent = viewerRole === "STUDENT";
  const isAdmin = viewerRole === "ADMIN";
  const isCompany = viewerRole === "COMPANY";

  const companyName = company.companyName || "Tên công ty";
  const slogan = company.slogan || "Chưa cập nhật slogan";
  const coverImage =
    company.coverImageUrl || "/images/company-cover-placeholder.jpg";
  const logoImage = company.logoUrl || "/images/company-logo-placeholder.png";

  const getStatusBadge = (status: CompanyStatus) => {
    switch (status) {
      case "PENDING":
        return {
          label: "Chờ duyệt",
          className: "bg-amber-50 text-amber-600 border-amber-100",
        };
      case "APPROVED":
        return {
          label: "Hoạt động",
          className: "bg-emerald-50 text-emerald-600 border-emerald-100",
        };
      case "REJECTED":
        return {
          label: "Từ chối",
          className: "bg-red-50 text-red-600 border-red-100",
        };
      case "RESTRICTED":
        return {
          label: "Hạn chế",
          className: "bg-slate-100 text-slate-600 border-slate-200",
        };
      default:
        return null;
    }
  };

  const statusBadge = company.status ? getStatusBadge(company.status) : null;

  return (
    <div className="space-y-4">
      {isOwner ? (
        <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-[14px] text-slate-700">
          <span className="font-semibold">💡 Xem trước hồ sơ:</span> Đây là cách
          sinh viên nhìn thấy hồ sơ công ty của bạn. Sử dụng các nút chỉnh sửa
          để cập nhật thông tin.
        </div>
      ) : null}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="group relative h-60 w-full overflow-hidden md:h-80">
          <Image
            src={coverImage}
            alt={companyName}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,58,147,0.65)_0%,rgba(30,64,175,0.3)_50%,rgba(6,182,212,0.25)_100%)]" />

          {isOwner ? (
            <button
              type="button"
              onClick={onChangeCoverImage}
              className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-[13px] font-medium text-slate-700 opacity-0 shadow transition-all group-hover:opacity-100 hover:bg-white"
            >
              <Camera size={14} />
              Đổi ảnh bìa
            </button>
          ) : null}
        </div>

        <div className="relative px-5 pb-6 md:px-6">
          <div className="-mt-16 flex flex-col">
            <div className="group relative mb-4 h-32 w-32 overflow-hidden rounded-full border-[5px] border-white bg-white shadow md:h-36 md:w-36">
              <Image
                src={logoImage}
                alt={`${companyName} logo`}
                fill
                className="object-cover"
              />

              {isOwner ? (
                <button
                  type="button"
                  onClick={onChangeLogo}
                  className="absolute inset-0 flex items-center justify-center bg-black/28 opacity-0 transition group-hover:opacity-100"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/92 text-slate-700 shadow">
                    <Camera size={20} />
                  </div>
                </button>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between pb-2">
              <div className="w-full">
                <div className="flex w-full flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="wrap-break-word text-[28px] font-bold text-slate-900 md:text-[32px]">
                        {companyName}
                      </h1>
                      {(isAdmin || isCompany) && statusBadge && (
                        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${statusBadge.className}`}>
                          {statusBadge.label}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-[15px] text-slate-500">{slogan}</p>
                  </div>

                  {(isStudent || isAdmin) && (
                    <div className="shrink-0 flex items-center gap-3">
                      {isStudent && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={onFollow}
                            className={`inline-flex h-11 items-center justify-center rounded-xl px-5 text-[14px] font-semibold transition ${
                              company.followed 
                                ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100" 
                                : "bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-100"
                            }`}
                          >
                            {company.followed ? "Bỏ theo dõi" : "Theo dõi"}
                          </button>
                          <button
                            type="button"
                            onClick={onChat}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-cyan-500 bg-cyan-50 text-cyan-600 px-5 text-[14px] font-semibold transition hover:bg-cyan-100"
                          >
                            <MessageSquare size={16} />
                            Nhắn tin
                          </button>
                        </div>
                      )}

                      {isAdmin && (
                        <div className="flex items-center gap-3">
                          {company.status === "PENDING" && (
                            <>
                              <button
                                type="button"
                                onClick={() => onChangeStatus?.("APPROVED")}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-[14px] font-semibold text-white transition hover:bg-emerald-600 shadow-lg shadow-emerald-100"
                              >
                                <CheckCircle size={16} />
                                Phê duyệt
                              </button>
                              <button
                                type="button"
                                onClick={() => onChangeStatus?.("REJECTED")}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-[14px] font-semibold text-white transition hover:bg-red-600 shadow-lg shadow-red-100"
                              >
                                <XCircle size={16} />
                                Từ chối
                              </button>
                            </>
                          )}

                          {company.status === "APPROVED" && (
                            <button
                              type="button"
                              onClick={() => onChangeStatus?.("RESTRICTED")}
                              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-[14px] font-semibold text-white transition hover:bg-orange-600 shadow-lg shadow-orange-100"
                            >
                              <ShieldAlert size={16} />
                              Hạn chế
                            </button>
                          )}

                          {company.status === "REJECTED" && (
                            <button
                              type="button"
                              onClick={() => onChangeStatus?.("APPROVED")}
                              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-[14px] font-semibold text-white transition hover:bg-emerald-700 shadow-lg shadow-emerald-100"
                            >
                              <RefreshCcw size={16} />
                              Duyệt lại đơn
                            </button>
                          )}

                          {company.status === "RESTRICTED" && (
                            <button
                              type="button"
                              onClick={() => onChangeStatus?.("APPROVED")}
                              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-[14px] font-semibold text-white transition hover:bg-emerald-600 shadow-lg shadow-emerald-100"
                            >
                              <Unlock size={16} />
                              Mở lại hoạt động
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {isOwner ? (
                  <button
                    type="button"
                    onClick={onEditBasicInfo}
                    className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <Pencil size={16} />
                    Chỉnh sửa tên & slogan
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
