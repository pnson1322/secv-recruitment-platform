import type { CandidateTab } from "../types/candidate.types";

type Props = {
  activeTab: CandidateTab;
  tabCounts: {
    total: number;
    pending: number;
    approved: number;
    result: number;
    invited: number;
  };
  onTabChange: (tab: CandidateTab) => void;
  hiddenTabs?: CandidateTab[];
};

const TABS: {
  key: CandidateTab;
  label: string;
  countKey: keyof Props["tabCounts"];
  activeClass: string;
  badgeClass: string;
}[] = [
  {
    key: "all",
    label: "Tất cả",
    countKey: "total",
    activeClass: "bg-cyan-50 border-b-2 border-cyan-500 text-cyan-600",
    badgeClass: "bg-cyan-500 text-white",
  },
  {
    key: "pending",
    label: "Chưa duyệt",
    countKey: "pending",
    activeClass: "bg-orange-50 border-b-2 border-orange-500 text-orange-600",
    badgeClass: "bg-orange-500 text-white",
  },
  {
    key: "approved",
    label: "Đã duyệt / PV",
    countKey: "approved",
    activeClass: "bg-purple-50 border-b-2 border-purple-500 text-purple-600",
    badgeClass: "bg-purple-500 text-white",
  },
  {
    key: "result",
    label: "Kết quả",
    countKey: "result",
    activeClass: "bg-slate-100 border-b-2 border-slate-600 text-slate-700",
    badgeClass: "bg-slate-600 text-white",
  },
  {
    key: "invited",
    label: "Lời mời đã gửi",
    countKey: "invited",
    activeClass: "bg-cyan-50 border-b-2 border-cyan-500 text-cyan-600",
    badgeClass: "bg-cyan-500 text-white",
  },
];

export default function CandidateTabBar({ 
  activeTab, 
  tabCounts, 
  onTabChange,
  hiddenTabs = [] 
}: Props) {
  const visibleTabs = TABS.filter(tab => !hiddenTabs.includes(tab.key));

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center">
        {visibleTabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = tabCounts[tab.countKey] ?? 0;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-5 py-4 text-[14px] font-semibold transition-all duration-200 ${
                isActive
                  ? tab.activeClass
                  : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              {tab.label}
              <span
                className={`inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold transition-colors ${
                  isActive ? tab.badgeClass : "bg-slate-200 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
