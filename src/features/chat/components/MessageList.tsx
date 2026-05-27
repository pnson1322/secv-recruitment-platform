"use client";

import React, { useState } from "react";
import { Loader2, MessageSquare, CheckCheck, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Message, Conversation } from "../types/chat.types";

type MessageListProps = {
  chatMessagesContainerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  isLoadingMessages: boolean;
  sortedMessages: Message[];
  groupedMessages: { [key: string]: Message[] };
  activeConversation: Conversation;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  currentUserId?: string | number | null;
  isPartnerTyping?: boolean;
};

export default function MessageList({
  chatMessagesContainerRef,
  onScroll,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isLoadingMessages,
  sortedMessages,
  groupedMessages,
  activeConversation,
  messagesEndRef,
  currentUserId,
  isPartnerTyping,
}: MessageListProps) {
  const [lightbox, setLightbox] = useState<{ urls: string[]; index: number } | null>(null);

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
      return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false });
    } catch { return ""; }
  };

  const formatFullTime = (isoString: string) => {
    try {
      const date = parseDateSafely(isoString);
      const timeStr = date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false });
      const dateStr = date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
      return `${timeStr} ngày ${dateStr}`;
    } catch { return ""; }
  };

  const getGroupLabel = (dateStr: string) => {
    const today = new Date().toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit" });
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit" });
    if (dateStr === today) return "Hôm nay";
    if (dateStr === yesterdayStr) return "Hôm qua";
    return dateStr;
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return `${parts[0].charAt(0).toUpperCase()}${parts[parts.length - 1].charAt(0).toUpperCase()}`;
  };

  const partnerAvatar = activeConversation.partner.avatarUrl ? (
    <img
      src={activeConversation.partner.avatarUrl}
      alt={activeConversation.partner.name}
      className="h-8 w-8 rounded-full object-cover border border-slate-100"
    />
  ) : (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
      {getInitials(activeConversation.partner.name)}
    </div>
  );

  return (
    <>
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition p-2 rounded-full hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>

          {lightbox.urls.length > 1 && lightbox.index > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: lightbox.index - 1 }); }}
              className="absolute left-4 text-white/70 hover:text-white transition p-2 rounded-full hover:bg-white/10"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          <img
            src={lightbox.urls[lightbox.index]}
            alt="Ảnh xem lớn"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox.urls.length > 1 && lightbox.index < lightbox.urls.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: lightbox.index + 1 }); }}
              className="absolute right-4 text-white/70 hover:text-white transition p-2 rounded-full hover:bg-white/10"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {lightbox.urls.length > 1 && (
            <div className="absolute bottom-4 text-white/60 text-sm">
              {lightbox.index + 1} / {lightbox.urls.length}
            </div>
          )}
        </div>
      )}

      <div
        ref={chatMessagesContainerRef}
        onScroll={onScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {hasNextPage && (
          <div className="flex justify-center py-2">
            <button
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              {isFetchingNextPage ? <Loader2 className="h-3 w-3 animate-spin inline mr-1.5" /> : null}
              Xem tin nhắn cũ hơn
            </button>
          </div>
        )}

        {isLoadingMessages ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
          </div>
        ) : sortedMessages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <MessageSquare className="h-12 w-12 text-slate-300 mb-2 stroke-[1.5]" />
            <p className="text-sm">Bắt đầu cuộc trò chuyện bằng cách gửi tin nhắn</p>
          </div>
        ) : (
          Object.keys(groupedMessages).map((dateStr) => (
            <div key={dateStr} className="flex flex-col">
              <div className="flex justify-center my-4">
                <span className="rounded-full bg-slate-200/60 px-3 py-1 text-[11px] font-bold text-slate-500 tracking-wide uppercase">
                  {getGroupLabel(dateStr)}
                </span>
              </div>

              {groupedMessages[dateStr].map((msg, idx) => {
                const isMine =
                  msg.isMine === true ||
                  (currentUserId !== undefined && currentUserId !== null && String(msg.senderId) === String(currentUserId));
                const prevMsg = idx > 0 ? groupedMessages[dateStr][idx - 1] : null;
                const nextMsg = idx < groupedMessages[dateStr].length - 1 ? groupedMessages[dateStr][idx + 1] : null;

                let showTimeDivider = false;
                if (prevMsg) {
                  const diffMs = new Date(msg.createdAt).getTime() - new Date(prevMsg.createdAt).getTime();
                  const diffMins = diffMs / (1000 * 60);
                  if (diffMins > 10) {
                    showTimeDivider = true;
                  }
                }

                let nextHasDivider = false;
                if (nextMsg) {
                  const diffMs = new Date(nextMsg.createdAt).getTime() - new Date(msg.createdAt).getTime();
                  const diffMins = diffMs / (1000 * 60);
                  if (diffMins > 10) {
                    nextHasDivider = true;
                  }
                }

                const isSameAsPrev = prevMsg && !showTimeDivider && prevMsg.senderId === msg.senderId;
                const isSameAsNext = nextMsg && !nextHasDivider && nextMsg.senderId === msg.senderId;
                const isLastOfAll = sortedMessages[sortedMessages.length - 1]?.messageId === msg.messageId;
                const hasText = !!msg.content;
                const hasImages = msg.imageUrls && msg.imageUrls.length > 0;

                return (
                  <React.Fragment key={msg.messageId}>
                    {showTimeDivider && (
                      <div className="flex justify-center my-4">
                        <span className="text-[11px] font-semibold text-slate-400">
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>
                    )}
                    <div
                      className={`flex items-end gap-2.5 ${isMine ? "justify-end" : "justify-start"} ${isSameAsPrev ? "mt-1.5" : "mt-4"}`}
                    >
                      {!isMine && (
                        <div className="shrink-0 mb-1">
                          {!isSameAsNext ? partnerAvatar : <div className="w-8 h-8 shrink-0" />}
                        </div>
                      )}

                      <div className={`max-w-[70%] flex flex-col gap-1 ${isMine ? "items-end" : "items-start"}`}>
                        {hasText && (
                          <div
                            className={`w-fit rounded-2xl px-4 py-2.5 shadow-sm text-sm relative group ${
                              isMine
                                ? "bg-[#1E3A8A] text-white rounded-br-none"
                                : "bg-white text-slate-800 border border-slate-100 rounded-bl-none"
                            }`}
                          >
                            <div className={`absolute bottom-full mb-2.5 hidden group-hover:flex flex-col items-center pointer-events-none z-30 whitespace-nowrap ${isMine ? "right-2" : "left-2"}`}>
                              <div className="bg-slate-800/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-lg leading-tight backdrop-blur-sm">
                                {isMine ? "Đã gửi: " : "Nhận lúc: "}{formatFullTime(msg.createdAt)}
                              </div>
                              <div className={`w-1.5 h-1.5 bg-slate-800/90 rotate-45 -mt-1 ${isMine ? "mr-4 self-end" : "ml-4 self-start"}`} />
                            </div>
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        )}

                        {hasImages && (
                          <div className={`flex flex-col gap-1.5 ${isMine ? "items-end" : "items-start"}`}>
                            {msg.imageUrls.length === 1 ? (
                              <button
                                onClick={() => setLightbox({ urls: msg.imageUrls, index: 0 })}
                                className="relative overflow-hidden rounded-2xl border border-black/5 hover:opacity-90 active:scale-95 transition-all shadow-sm group"
                              >
                                <div className={`absolute bottom-full mb-2.5 hidden group-hover:flex flex-col items-center pointer-events-none z-30 whitespace-nowrap ${isMine ? "right-2" : "left-2"}`}>
                                  <div className="bg-slate-800/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-lg leading-tight backdrop-blur-sm">
                                    {isMine ? "Đã gửi: " : "Nhận lúc: "}{formatFullTime(msg.createdAt)}
                                  </div>
                                  <div className={`w-1.5 h-1.5 bg-slate-800/90 rotate-45 -mt-1 ${isMine ? "mr-4 self-end" : "ml-4 self-start"}`} />
                                </div>
                                <img
                                  src={msg.imageUrls[0]}
                                  alt="Ảnh đính kèm"
                                  className="max-h-72 max-w-full object-cover"
                                />
                              </button>
                            ) : (
                              <div className={`grid gap-1.5 ${msg.imageUrls.length === 2 ? "grid-cols-2" : "grid-cols-2"}`}>
                                {msg.imageUrls.map((url, imgIdx) => (
                                  <button
                                    key={imgIdx}
                                    onClick={() => setLightbox({ urls: msg.imageUrls, index: imgIdx })}
                                    className="relative overflow-hidden rounded-xl border border-black/5 hover:opacity-90 active:scale-95 transition-all shadow-sm aspect-square"
                                  >
                                    <img
                                      src={url}
                                      alt={`Ảnh ${imgIdx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {isLastOfAll && isMine && (
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1 justify-end mt-0.5">
                            <span>{formatTime(msg.createdAt)}</span>
                            <CheckCheck className="h-3 w-3 text-cyan-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          ))
        )}
        {isPartnerTyping && (
          <div className="flex items-end gap-2.5 justify-start mt-4">
            <div className="shrink-0 mb-1">
              {partnerAvatar}
            </div>
            <div className="bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm max-w-[70%]">
              <div className="flex items-center gap-1.5 px-0.5">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "-0.3s" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "-0.15s" }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
}
