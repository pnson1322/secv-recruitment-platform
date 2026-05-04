import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Không có quyền truy cập",
  description: "Bạn không có quyền truy cập trang này",
};

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-(--color-surface) px-6">
      <div className="w-full max-w-lg rounded-2xl border border-(--color-border) bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
          <ShieldAlert size={28} strokeWidth={2.2} />
        </div>

        <h1 className="mb-3 text-3xl font-bold text-(--color-primary)">
          Không có quyền truy cập
        </h1>

        <p className="mb-6 text-slate-600">
          Bạn không được phép truy cập trang này.
        </p>

        <Link
          href="/"
          className="inline-block rounded-xl bg-(--color-accent) px-5 py-3 font-semibold text-white shadow-md transition hover:brightness-95"
        >
          Quay về trang chủ
        </Link>
      </div>
    </main>
  );
}
