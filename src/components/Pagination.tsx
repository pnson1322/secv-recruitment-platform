import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
  }

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
      {/* Empty space for left alignment balance on desktop */}
      <div className="hidden sm:block w-32" />

      {/* Center: Pagination Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-cyan-500 hover:text-cyan-500 hover:bg-cyan-50 disabled:pointer-events-none disabled:opacity-40 shadow-sm"
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="flex h-10 w-10 items-center justify-center text-slate-400"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page as number)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-[14px] font-bold transition shadow-sm ${
                isActive
                  ? "bg-cyan-500 text-white border border-cyan-500"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-cyan-200 hover:bg-slate-50 hover:text-cyan-600"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-cyan-500 hover:text-cyan-500 hover:bg-cyan-50 disabled:pointer-events-none disabled:opacity-40 shadow-sm"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Right: Page info */}
      <div className="text-[14px] text-slate-500 font-medium sm:w-32 sm:text-right">
        Trang <span className="text-slate-900 font-bold">{currentPage}</span> trên{" "}
        <span className="text-slate-900 font-bold">{totalPages}</span>
      </div>
    </div>
  );
}
