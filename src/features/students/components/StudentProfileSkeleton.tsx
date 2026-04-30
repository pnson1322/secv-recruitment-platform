"use client";

export default function StudentProfileSkeleton() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto border-r border-slate-200 bg-white p-8">
        <div className="mb-8 flex items-center justify-between rounded-2xl bg-slate-50 px-6 py-4 border border-slate-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
              <div className="space-y-2">
                <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
        </div>

        <div className="flex h-[500px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
          <div className="h-16 w-16 animate-pulse rounded-2xl bg-slate-200 mb-4" />
          <div className="h-4 w-40 animate-pulse rounded bg-slate-200 mb-2" />
          <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
        </div>
      </div>

      <div className="w-[380px] overflow-y-auto bg-white p-8">
        <section className="mb-8">
          <div className="h-6 w-32 animate-pulse rounded bg-slate-200 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between border-b border-slate-100 pb-3">
                <div className="h-4 w-20 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="h-6 w-20 animate-pulse rounded bg-slate-200 mb-4" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-slate-100" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
