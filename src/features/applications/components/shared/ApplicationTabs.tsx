import { FileText, Mail } from "lucide-react";

type TabType = "applications" | "invitations";

type Props = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

export default function ApplicationTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex justify-start">
      <div className="inline-flex rounded-2xl bg-white p-1.5 shadow-sm border border-slate-200">
        <button
          onClick={() => onTabChange("applications")}
          className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[14px] font-bold transition-all ${
            activeTab === "applications"
              ? "bg-cyan-500 text-white shadow-md"
              : "text-slate-500 hover:bg-slate-50 hover:text-cyan-600"
          }`}
        >
          <FileText size={18} />
          Đơn ứng tuyển
        </button>
        <button
          onClick={() => onTabChange("invitations")}
          className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[14px] font-bold transition-all ${
            activeTab === "invitations"
              ? "bg-cyan-500 text-white shadow-md"
              : "text-slate-500 hover:bg-slate-50 hover:text-cyan-600"
          }`}
        >
          <Mail size={18} />
          Lời mời
        </button>
      </div>
    </div>
  );
}
