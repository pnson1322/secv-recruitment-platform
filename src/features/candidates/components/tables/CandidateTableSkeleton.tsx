"use client";

export default function CandidateTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60">
            {[1, 2, 3, 4, 5].map((i) => (
              <th key={i} className="px-6 py-4">
                <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {[1, 2, 3, 4, 5].map((row) => (
            <tr key={row}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              </td>
              <td className="px-6 py-4">
                <div className="h-8 w-16 animate-pulse rounded-lg bg-slate-100" />
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-200" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
