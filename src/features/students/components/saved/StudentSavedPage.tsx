"use client";

import React, { useState } from "react";
import { Bookmark, Building2 } from "lucide-react";
import SavedJobsTab from "./SavedJobsTab";
import FollowedCompaniesTab from "./FollowedCompaniesTab";

type TabValue = "jobs" | "companies";

export default function StudentSavedPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("jobs");

  return (
    <div className="mx-auto max-w-[1240px] space-y-6 px-4 pb-12">
      <div className="flex justify-start">
        <div className="inline-flex rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[14px] font-bold transition-all ${
              activeTab === "jobs"
                ? "bg-cyan-500 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50 hover:text-cyan-600"
            }`}
          >
            <Bookmark size={18} />
            Việc làm đã lưu
          </button>
          <button
            onClick={() => setActiveTab("companies")}
            className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[14px] font-bold transition-all ${
              activeTab === "companies"
                ? "bg-cyan-500 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50 hover:text-cyan-600"
            }`}
          >
            <Building2 size={18} />
            Công ty đã theo dõi
          </button>
        </div>
      </div>

      <div>
        {activeTab === "jobs" ? <SavedJobsTab /> : <FollowedCompaniesTab />}
      </div>
    </div>
  );
}
