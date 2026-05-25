"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

export default function EmptyChatState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/30">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-50 text-cyan-500 shadow-sm border border-cyan-100/50 animate-[floatY_4s_infinite_ease-in-out]">
        <MessageSquare className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">
        Không có cuộc trò chuyện nào được chọn
      </h3>
      <p className="mt-2 max-w-sm text-[13px] text-slate-500 leading-relaxed">
        Chọn một cuộc trò chuyện từ danh sách bên trái hoặc truy cập trang danh sách công ty/ứng viên để bắt đầu cuộc trò chuyện mới.
      </p>
    </div>
  );
}
