"use client";

import { useState } from "react";
import { Star, X, Loader2 } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";
import { useCreateEvaluation } from "@/features/students/hooks/useCreateEvaluation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  companyId: number;
  companyName: string;
};

export default function CompanyEvaluationModal({ isOpen, onClose, companyId, companyName }: Props) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState("");
  
  const createMutation = useCreateEvaluation();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      return;
    }

    createMutation.mutate(
      {
        companyId,
        ratting: rating,
        content,
      },
      {
        onSuccess: () => {
          onClose();
          setRating(0);
          setContent("");
        },
      }
    );
  };

  return (
    <ClientPortal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
        <div 
          className="relative w-full max-w-[500px] rounded-[32px] bg-white p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-[22px] font-bold text-slate-900">Đánh giá công ty</h2>
              <p className="mt-1 text-[14px] text-slate-500">Chia sẻ trải nghiệm của bạn với {companyName}</p>
            </div>
            <button 
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">    
            <div className="flex flex-col items-center gap-3 py-4">
              <p className="text-[15px] font-bold text-slate-700">Mức độ hài lòng của bạn?</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform active:scale-90"
                  >
                    <Star
                      size={40}
                      className={`transition-all duration-200 ${
                        (hover || rating) >= star
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-[13px] font-medium text-amber-600 animate-in fade-in duration-300">
                  {rating === 1 && "Rất không hài lòng"}
                  {rating === 2 && "Không hài lòng"}
                  {rating === 3 && "Bình thường"}
                  {rating === 4 && "Hài lòng"}
                  {rating === 5 && "Rất hài lòng"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-slate-700">Nhận xét chi tiết</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết cảm nghĩ của bạn về môi trường làm việc, quy trình tuyển dụng..."
                required
                className="h-32 w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-[15px] outline-none transition-all focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-50"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-2xl border border-slate-200 bg-white py-3.5 text-[15px] font-bold text-slate-600 transition-all hover:bg-slate-50"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={rating === 0 || createMutation.isPending}
                className="flex-[2] flex items-center justify-center gap-2 rounded-2xl bg-cyan-600 py-3.5 text-[15px] font-bold text-white shadow-lg shadow-cyan-100 transition-all hover:bg-cyan-700 disabled:opacity-50 disabled:shadow-none"
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi đánh giá"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ClientPortal>
  );
}
