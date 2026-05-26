"use client";

export function StatsGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs animate-pulse">
          <div className="flex items-center justify-between">
            <div className="space-y-3 flex-1">
              <div className="h-4 w-24 bg-slate-100 rounded-full" />
              <div className="h-8 w-16 bg-slate-200 rounded-full" />
            </div>
            <div className="h-12 w-12 rounded-2xl bg-slate-100" />
          </div>
          <div className="mt-4 h-3.5 w-32 bg-slate-100 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs animate-pulse">
      <div className="border-b border-slate-100 pb-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-slate-100" />
        <div className="space-y-2 flex-1">
          <div className="h-5 w-40 bg-slate-200 rounded-full" />
          <div className="h-3 w-60 bg-slate-100 rounded-full" />
        </div>
      </div>
      <div className="mt-8 h-48 bg-slate-50/50 rounded-2xl flex items-end justify-between p-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div
            key={i}
            className="w-full bg-slate-100 rounded-t-lg"
            style={{ height: `${20 + Math.sin(i) * 50}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs animate-pulse">
      <div className="border-b border-slate-100 pb-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-slate-100" />
        <div className="space-y-2 flex-1">
          <div className="h-5 w-40 bg-slate-200 rounded-full" />
          <div className="h-3 w-60 bg-slate-100 rounded-full" />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/50">
            <div className="flex items-center gap-3.5 flex-1">
              <div className="h-9 w-9 rounded-full bg-slate-100" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-slate-200 rounded-full" />
                <div className="h-3 w-20 bg-slate-100 rounded-full" />
              </div>
            </div>
            <div className="h-6 w-12 bg-slate-100 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecruiterDashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-2 sm:px-6 lg:px-8">
      <StatsGridSkeleton />
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs animate-pulse">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-2 flex-1">
            <div className="h-5 w-32 bg-slate-200 rounded-full" />
            <div className="h-3.5 w-64 bg-slate-100 rounded-full" />
          </div>
          <div className="h-9 w-20 bg-slate-100 rounded-xl" />
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-3xl border border-slate-100 p-6 space-y-4">
              <div className="h-4 w-36 bg-slate-200 rounded-full" />
              <div className="h-3 w-24 bg-slate-100 rounded-full" />
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="h-6 w-20 bg-slate-100 rounded-full" />
                <div className="h-8 w-24 bg-slate-100 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-2 sm:px-6 lg:px-8">
      <StatsGridSkeleton />
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ListSkeleton />
        <ListSkeleton />
      </div>
    </div>
  );
}
