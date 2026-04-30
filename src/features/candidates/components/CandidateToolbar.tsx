import { Search } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import type { CategoryItem } from "../../job-postings/types/job-postings.types";

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  categories: CategoryItem[];
  positionFilter: string;
  onPositionFilterChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
};

const DATE_OPTIONS = [
  { label: "Tất cả thời gian", value: "all" },
  { label: "7 ngày qua", value: "7_days" },
  { label: "30 ngày qua", value: "30_days" },
];

export default function CandidateToolbar({
  searchValue,
  onSearchChange,
  categories,
  positionFilter,
  onPositionFilterChange,
  dateFilter,
  onDateFilterChange,
}: Props) {
  const categoryOptions = [
    { label: "Tất cả vị trí", value: "all" },
    ...categories.map((c) => ({
      label: c.categoryName,
      value: c.categoryId.toString(),
    })),
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên, email..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-[14px] text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <CustomSelect
          label=""
          value={positionFilter}
          placeholder="Tất cả vị trí"
          options={categoryOptions}
          onChange={onPositionFilterChange}
        />

        <CustomSelect
          label=""
          value={dateFilter}
          placeholder="Ngày nộp"
          options={DATE_OPTIONS}
          onChange={onDateFilterChange}
        />
      </div>
    </div>
  );
}
