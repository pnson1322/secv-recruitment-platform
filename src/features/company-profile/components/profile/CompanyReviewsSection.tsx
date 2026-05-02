"use client";

import { Star } from "lucide-react";
import type { Role } from "@/features/auth/constants/roles";
import CompanySectionCard from "./CompanySectionCard";
import CompanyReviewCard from "./CompanyReviewCard";
import type { CompanyComment, PaginationMeta, CompanyStatsData } from "../../types/comment.types";
import Pagination from "@/components/Pagination";
import { Loader2 } from "lucide-react";
import CompanyReviewsSkeleton from "./CompanyReviewsSkeleton";

type Props = {
  reviews: CompanyComment[];
  viewerRole: Role;
  averageRating: number;
  pagination?: PaginationMeta;
  stats?: CompanyStatsData | null;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
};

export default function CompanyReviewsSection({
  reviews,
  viewerRole,
  averageRating,
  pagination,
  stats,
  isLoading = false,
  onPageChange,
}: Props) {
  const isCompany = viewerRole === "COMPANY";

  const reviewSummary = stats || {
    averageRating: averageRating,
    totalComments: 0,
    distribution: [
      { rating: 5, percentage: 0 },
      { rating: 4, percentage: 0 },
      { rating: 3, percentage: 0 },
      { rating: 2, percentage: 0 },
      { rating: 1, percentage: 0 },
    ],
  };

  const sortedDistribution = [...(reviewSummary.distribution || [])].sort((a, b) => b.rating - a.rating);

  if (isLoading) {
    return <CompanyReviewsSkeleton />;
  }

  return (
    <div className="space-y-5">
      <CompanySectionCard>
        <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
          <div className="text-center lg:text-left">
            <p className="text-[2.35rem] font-bold text-slate-900">
              {reviewSummary.averageRating}
            </p>

            <div className="mt-2 flex justify-center gap-1 lg:justify-start">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={19}
                  className={
                    index < Math.round(reviewSummary.averageRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300"
                  }
                />
              ))}
            </div>

            <p className="mt-2 text-[14px] font-medium text-slate-500">
              {reviewSummary.totalComments} đánh giá
            </p>
          </div>

          <div className="space-y-3">
            {sortedDistribution.map((item) => (
              <div
                key={item.rating}
                className="grid grid-cols-[48px_1fr_52px] items-center gap-4"
              >
                <span className="text-[14px] text-slate-500">
                  {item.rating} sao
                </span>

                <div className="h-2.5 rounded-full bg-slate-200">
                  <div
                    className="h-2.5 rounded-full bg-amber-400"
                    style={{ width: `${item.percentage * 100}%` }}
                  />
                </div>

                <span className="text-right text-[14px] text-slate-500">
                  {Math.round(item.percentage * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CompanySectionCard>

      <CompanySectionCard>
        <h3 className="text-[18px] font-semibold text-slate-900">
          Đánh giá từ sinh viên
        </h3>

        <p className="mt-2 text-[14px] text-slate-500">
          Tổng cộng {reviewSummary.totalComments} đánh giá
        </p>

        {isCompany && (
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-[13px] text-amber-800">
            <span className="font-semibold">💡 Lưu ý:</span> Tất cả đánh giá đều
            ẩn danh để bảo vệ quyền riêng tư của sinh viên.
          </div>
        )}

        <div className="mt-5 space-y-4">
          {reviews.length > 0 ? (
            <>
              {reviews.map((review) => (
                <CompanyReviewCard
                  key={review.id}
                  review={review}
                />
              ))}

              {pagination && pagination.totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={onPageChange || (() => {})}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="py-10 text-center">
              <p className="text-slate-500">Chưa có đánh giá nào.</p>
            </div>
          )}
        </div>
      </CompanySectionCard>
    </div>
  );
}
