"use client";

import { useState } from "react";
import { useApplicationStats } from "../hooks/useApplicationStats";
import { useInvitationStats } from "../hooks/useInvitationStats";
import ApplicationTabs from "./shared/ApplicationTabs";
import ApplicationStatsGrid from "./stats/ApplicationStatsGrid";
import InvitationStatsGrid from "./stats/InvitationStatsGrid";
import ApplicationListItem from "./list/ApplicationListItem";
import InvitationListItem from "./list/InvitationListItem";
import { useApplications } from "../hooks/useApplications";
import { useInvitations } from "../hooks/useInvitations";
import { useRespondInvitation } from "../hooks/useRespondInvitation";
import type { ApplicationStatus, InvitationStatus } from "../types/application.types";
import Pagination from "@/components/Pagination";
import { Search, AlertCircle, Inbox } from "lucide-react";

type TabType = "applications" | "invitations";

export default function StudentApplicationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("applications");
  
  const [appStatusFilter, setAppStatusFilter] = useState<ApplicationStatus | "">("");
  const [appPage, setAppPage] = useState(1);

  const [invStatusFilter, setInvStatusFilter] = useState<InvitationStatus | "">("");
  const [invPage, setInvPage] = useState(1);

  const appStatsQuery = useApplicationStats();
  const inviteStatsQuery = useInvitationStats();
  
  const applicationsQuery = useApplications({
    status: appStatusFilter || undefined,
    page: appPage,
    limit: 10,
  });

  const invitationsQuery = useInvitations({
    status: invStatusFilter || undefined,
    page: invPage,
    limit: 10,
  });

  const respondMutation = useRespondInvitation();

  const handleAcceptInvitation = (id: number) => {
    respondMutation.mutate({
      invitationId: id,
      body: { action: "accept" },
    });
  };

  const handleRejectInvitation = (id: number) => {
    respondMutation.mutate({
      invitationId: id,
      body: { action: "reject" },
    });
  };

  const appSubTabs: { label: string; value: ApplicationStatus | "" }[] = [
    { label: "Tất cả", value: "" },
    { label: "Chờ duyệt", value: "submitted" },
    { label: "Phỏng vấn", value: "interviewing" },
    { label: "Đậu", value: "passed" },
    { label: "Loại", value: "rejected" },
  ];

  const invSubTabs: { label: string; value: InvitationStatus | "" }[] = [
    { label: "Tất cả", value: "" },
    { label: "Chờ phản hồi", value: "pending" },
    { label: "Đã chấp nhận", value: "accepted" },
    { label: "Đã từ chối", value: "rejected" },
    { label: "Hết hạn", value: "expired" },
  ];

  const handleAppStatusChange = (status: ApplicationStatus | "") => {
    setAppStatusFilter(status);
    setAppPage(1);
  };

  const handleInvStatusChange = (status: InvitationStatus | "") => {
    setInvStatusFilter(status);
    setInvPage(1);
  };

  const appTotalPages = applicationsQuery.data?.data.meta.totalPages ?? 1;
  const invTotalPages = invitationsQuery.data?.data.meta.totalPages ?? 1;

  return (
    <div className="mx-auto max-w-7xl pb-8 space-y-6">
      <ApplicationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "applications" ? (
        <div className="space-y-6">
          <ApplicationStatsGrid 
            stats={appStatsQuery.data?.data} 
            isLoading={appStatsQuery.isLoading} 
          />

          <div className="space-y-6">
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-1 rounded-full border border-slate-100 bg-white p-1.5 shadow-sm">
                {appSubTabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => handleAppStatusChange(tab.value)}
                    className={`whitespace-nowrap rounded-full px-6 py-2 text-[14px] font-bold transition-all duration-200 ${
                      appStatusFilter === tab.value
                        ? "bg-cyan-500 text-white shadow-md shadow-cyan-100"
                        : "text-slate-500 hover:bg-slate-50 hover:text-cyan-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {applicationsQuery.isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-4 rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-1/3 animate-pulse rounded-md bg-slate-100" />
                        <div className="h-4 w-1/4 animate-pulse rounded-md bg-slate-100" />
                      </div>
                      <div className="h-8 w-24 animate-pulse rounded-full bg-slate-100" />
                    </div>
                  </div>
                ))
              ) : applicationsQuery.isError ? (
                <div className="rounded-[32px] border border-rose-100 bg-rose-50/30 py-16 text-center">
                  <AlertCircle className="mx-auto mb-3 text-rose-400" size={40} />
                  <p className="text-[15px] font-medium text-rose-600">Đã có lỗi xảy ra khi tải dữ liệu.</p>
                  <button 
                    onClick={() => applicationsQuery.refetch()}
                    className="mt-4 text-[14px] font-bold text-cyan-600 hover:underline"
                  >
                    Thử lại ngay
                  </button>
                </div>
              ) : (applicationsQuery.data?.data.data.length ?? 0) === 0 ? (
                <div className="rounded-[32px] border border-dashed border-slate-200 bg-white/50 py-24 text-center">
                  <Inbox className="mx-auto mb-4 text-slate-300" size={48} />
                  <p className="text-[15px] font-medium text-slate-400">Không có đơn ứng tuyển nào ở trạng thái này.</p>
                </div>
              ) : (
                <>
                  {applicationsQuery.data?.data.data.map((app) => (
                    <ApplicationListItem key={app.applicationId} application={app} />
                  ))}
                  
                  {appTotalPages > 1 && (
                    <div className="pt-4">
                      <Pagination 
                        currentPage={appPage} 
                        totalPages={appTotalPages} 
                        onPageChange={setAppPage} 
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <InvitationStatsGrid 
            stats={inviteStatsQuery.data?.data} 
            isLoading={inviteStatsQuery.isLoading} 
          />

          <div className="space-y-6">
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-1 rounded-full border border-slate-100 bg-white p-1.5 shadow-sm">
                {invSubTabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => handleInvStatusChange(tab.value)}
                    className={`whitespace-nowrap rounded-full px-6 py-2 text-[14px] font-bold transition-all duration-200 ${
                      invStatusFilter === tab.value
                        ? "bg-cyan-500 text-white shadow-md shadow-cyan-100"
                        : "text-slate-500 hover:bg-slate-50 hover:text-cyan-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {invitationsQuery.isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-6 rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 animate-pulse rounded-2xl bg-slate-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-1/3 animate-pulse rounded-md bg-slate-100" />
                        <div className="h-4 w-1/4 animate-pulse rounded-md bg-slate-100" />
                      </div>
                    </div>
                    <div className="h-16 w-full animate-pulse rounded-2xl bg-slate-50" />
                  </div>
                ))
              ) : invitationsQuery.isError ? (
                <div className="rounded-[32px] border border-rose-100 bg-rose-50/30 py-16 text-center">
                  <AlertCircle className="mx-auto mb-3 text-rose-400" size={40} />
                  <p className="text-[15px] font-medium text-rose-600">Đã có lỗi xảy ra khi tải dữ liệu.</p>
                  <button 
                    onClick={() => invitationsQuery.refetch()}
                    className="mt-4 text-[14px] font-bold text-cyan-600 hover:underline"
                  >
                    Thử lại ngay
                  </button>
                </div>
              ) : (invitationsQuery.data?.data.data.length ?? 0) === 0 ? (
                <div className="rounded-[32px] border border-dashed border-slate-200 bg-white/50 py-24 text-center">
                  <Inbox className="mx-auto mb-4 text-slate-300" size={48} />
                  <p className="text-[15px] font-medium text-slate-400">Không có lời mời nào ở trạng thái này.</p>
                </div>
              ) : (
                <>
                  {invitationsQuery.data?.data.data.map((inv) => (
                    <InvitationListItem 
                      key={inv.invitationId} 
                      invitation={inv} 
                      onAccept={handleAcceptInvitation}
                      onReject={handleRejectInvitation}
                    />
                  ))}
                  
                  {invTotalPages > 1 && (
                    <div className="pt-4">
                      <Pagination 
                        currentPage={invPage} 
                        totalPages={invTotalPages} 
                        onPageChange={setInvPage} 
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
