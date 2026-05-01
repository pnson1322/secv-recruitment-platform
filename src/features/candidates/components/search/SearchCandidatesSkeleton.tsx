export default function SearchCandidatesSkeleton({
  count = 4,
}: {
  count?: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-start gap-4">
            <div className="h-17 w-17 rounded-full bg-slate-200" />
            <div className="flex-1 space-y-3">
              <div className="h-6 w-1/2 rounded-full bg-slate-200" />
              <div className="h-4 w-24 rounded-full bg-slate-100" />
              <div className="h-5 w-40 rounded-full bg-slate-100" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-4 w-20 rounded-full bg-slate-100" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((__, chipIndex) => (
                <div
                  key={chipIndex}
                  className="h-8 w-20 rounded-full bg-slate-100"
                />
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="h-11 rounded-2xl bg-slate-100" />
            <div className="h-11 rounded-2xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
