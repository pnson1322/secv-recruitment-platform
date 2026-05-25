"use client";

import React from "react";
import { Paperclip, Smile, Loader2, Send, X } from "lucide-react";
import { toast } from "sonner";

type MessageInputProps = {
  messageText: string;
  setMessageText: (text: string) => void;
  imagePreviews: string[];
  removeImage: (index: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  isSending: boolean;
  isBlocked?: boolean;
  isBlockedByPartner?: boolean;
  onUnblock?: () => void;
};

export default function MessageInput({
  messageText,
  setMessageText,
  imagePreviews,
  removeImage,
  fileInputRef,
  handleImageChange,
  handleSendMessage,
  isSending,
  isBlocked,
  isBlockedByPartner,
  onUnblock,
}: MessageInputProps) {
  return (
    <>
      {imagePreviews.length > 0 && (
        <div className="flex flex-wrap gap-2.5 bg-slate-50 border-t border-slate-100 px-4 py-3 shrink-0">
          {imagePreviews.map((url, index) => (
            <div
              key={index}
              className="relative h-16 w-16 shrink-0"
            >
              <div className="h-full w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <img src={url} alt="Xem trước" className="h-full w-full object-cover" />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full p-0.5 hover:bg-rose-600 transition shadow z-10"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {isBlocked || isBlockedByPartner ? (
        <div className="bg-[#FEF2F2] border-t border-[#FEE2E2] p-4 shrink-0 flex items-center justify-center gap-3.5 text-sm rounded-b-2xl">
          {isBlocked ? (
            <>
              <span className="text-[#991B1B] font-semibold text-center">Bạn không thể gửi tin nhắn cho người dùng này.</span>
              <button
                type="button"
                onClick={onUnblock}
                className="px-4 py-2 bg-[#B91C1C] text-white font-bold rounded-xl hover:bg-[#991B1B] transition active:scale-95 text-xs shadow-sm"
              >
                Gỡ chặn
              </button>
            </>
          ) : (
            <span className="text-[#991B1B] font-semibold text-center">Bạn đã bị chặn.</span>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSendMessage}
          className="bg-white border-t border-slate-100 p-4 shrink-0 flex items-center gap-2.5 relative z-10"
        >
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
            title="Đính kèm hình ảnh"
          >
            <Paperclip className="h-4.5 w-4.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="flex-1 relative h-10">
            <textarea
              rows={1}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Nhập tin nhắn..."
              className="w-full h-full pl-4 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 text-sm outline-none resize-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/5 leading-[22px] py-[8px]"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              title="Biểu tượng cảm xúc"
              onClick={() => toast.info("Tính năng emoji đang được phát triển")}
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>

          <button
            type="submit"
            disabled={(!messageText.trim() && imagePreviews.length === 0) || isSending}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm hover:shadow hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
            ) : (
              <Send className="h-4.5 w-4.5" />
            )}
          </button>
        </form>
      )}
    </>
  );
}
