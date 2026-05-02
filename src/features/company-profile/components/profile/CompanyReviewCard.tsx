"use client";

import { Star } from "lucide-react";
import type { CompanyComment } from "../../types/comment.types";

export default function CompanyReviewCard({
  review,
}: {
  review: CompanyComment;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3.5">
          {review.studentAvatar ? (
            <img
              src={review.studentAvatar}
              alt={review.studentName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#1E3A8A] to-[#06B6D4] text-[12px] font-semibold text-white">
              {review.studentName ? initials(review.studentName) : "SV"}
            </div>
          )}

          <div>
            <p className="text-[15px] font-bold text-slate-900">
              {review.studentName || "Sinh viên ẩn danh"}
            </p>
            <p className="text-[13px] text-slate-500">
              {review.studentName ? "Sinh viên" : "Người đánh giá"}
            </p>
          </div>
        </div>

        <div className="text-left md:text-right">
          <div className="flex gap-1 md:justify-end">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={15}
                className={
                  index < review.rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300"
                }
              />
            ))}
          </div>

          <p className="mt-1.5 text-[13px] text-slate-500">
            {new Intl.DateTimeFormat("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(new Date(review.createdAt))}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-7 text-slate-700">
        {review.content}
      </p>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

