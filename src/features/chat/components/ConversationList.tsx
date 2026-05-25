"use client";

import React from "react";
import { Search, X, MessageSquare } from "lucide-react";
import type { Conversation } from "../types/chat.types";

type ConversationListProps = {
  conversations: Conversation[] | undefined;
  isLoading: boolean;
  activeId: number | null;
  userId: number | string | undefined;
  onSelect: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  mobileView: "list" | "chat";
};

export default function ConversationList({
  conversations,
  isLoading,
  activeId,
  userId,
  onSelect,
  searchQuery,
  setSearchQuery,
  mobileView,
}: ConversationListProps) {
  const parseDateSafely = (isoString: string) => {
    if (!isoString) return new Date();
    let dateStr = isoString;
    if (!dateStr.includes("Z") && !dateStr.includes("+") && !/-\d{2}:\d{2}$/.test(dateStr)) {
      if (dateStr.includes(":") || dateStr.includes(" ")) {
        dateStr = dateStr.replace(" ", "T");
        if (!dateStr.endsWith("Z")) {
          dateStr += "Z";
        }
      }
    }
    return new Date(dateStr);
  };

  const formatTime = (isoString: string) => {
    try {
      const date = parseDateSafely(isoString);
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch {
      return "";
    }
  };

  return (
    <div
      className={`h-full w-full flex-col border-r border-slate-100 lg:w-[360px] lg:shrink-0 lg:flex ${
        mobileView === "chat" ? "hidden" : "flex"
      }`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold text-slate-800 mb-3">Tin nhắn</h2>
        <div className="relative">
          <Search className="absolute inset-y-0 left-3.5 my-auto h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm người nhắn..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/5"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3 my-auto h-5 w-5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-50 px-2 pb-4">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
              <div className="h-12 w-12 rounded-full bg-slate-100" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-slate-100 rounded" />
                <div className="h-3.5 w-2/3 bg-slate-100 rounded" />
              </div>
            </div>
          ))
        ) : !conversations || conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <MessageSquare className="h-10 w-10 text-slate-300 mb-2 stroke-[1.5]" />
            <p className="text-sm">Không tìm thấy cuộc trò chuyện nào</p>
          </div>
        ) : (
          conversations.map((conv) => {
            const isActive = conv.conversationId === activeId;
            const hasUnread = conv.unreadCount > 0;
            const getInitials = (name: string) => {
              if (!name) return "U";
              const parts = name.trim().split(/\s+/);
              if (parts.length === 0) return "U";
              if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
              const firstInitial = parts[0].charAt(0).toUpperCase();
              const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
              return `${firstInitial}${lastInitial}`;
            };
            const partnerInitials = getInitials(conv.partner.name);

            return (
              <button
                key={conv.conversationId}
                onClick={() => onSelect(conv.conversationId)}
                className={`relative flex w-full items-center gap-3.5 rounded-xl p-3 text-left transition outline-none ${
                  isActive
                    ? "bg-slate-50 text-slate-900"
                    : "hover:bg-slate-50/70 text-slate-600"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-3.5 bottom-3.5 w-1 rounded-r bg-cyan-500" />
                )}
                <div className="relative shrink-0">
                  {conv.partner.avatarUrl ? (
                    <img
                      src={conv.partner.avatarUrl}
                      alt={conv.partner.name}
                      className="h-12 w-12 rounded-full object-cover border border-slate-100"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-[15px] font-bold text-white shadow-sm">
                      {partnerInitials}
                    </div>
                  )}
                  {hasUnread && (
                    <div className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-extrabold text-white ring-2 ring-white animate-pulse">
                      {conv.unreadCount}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-[14px] truncate ${
                        hasUnread ? "font-bold text-slate-900" : "font-semibold text-slate-800"
                      }`}
                    >
                      {conv.partner.name}
                    </h4>
                    {conv.lastMessage && (
                      <span className="text-[11px] text-slate-400 shrink-0 ml-2">
                        {formatTime(conv.lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  {conv.lastMessage ? (
                    <p
                      className={`text-[13px] truncate mt-0.5 ${
                        hasUnread ? "text-slate-900 font-medium" : "text-slate-500"
                      }`}
                    >
                      {conv.lastMessage.senderId === userId ? "Bạn: " : ""}
                      {conv.lastMessage.content || "[Hình ảnh]"}
                    </p>
                  ) : (
                    <p className="text-[13px] text-slate-400 italic mt-0.5">
                      Chưa có tin nhắn
                    </p>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
