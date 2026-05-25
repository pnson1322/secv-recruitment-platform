"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Building2, MoreVertical, EyeOff, Ban } from "lucide-react";
import type { Conversation } from "../types/chat.types";

type ChatHeaderProps = {
  activeConversation: Conversation;
  role: string | undefined;
  onBack: () => void;
  onHide: () => void;
  onBlock: () => void;
};

export default function ChatHeader({
  activeConversation,
  role,
  onBack,
  onHide,
  onBlock,
}: ChatHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isBlockedByMe = activeConversation.isBlocked ?? false;
  const isBlockedByThem = activeConversation.isBlockedByPartner ?? false;
  const isBlocked = isBlockedByMe || isBlockedByThem;

  return (
    <div
      className={`flex h-16 shrink-0 items-center justify-between border-b px-4 relative z-20 transition-colors duration-200 ${
        isBlocked ? "bg-[#FEF2F2] border-[#FEE2E2]" : "bg-white border-slate-100"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onBack}
          className={`mr-1 rounded-lg p-1.5 lg:hidden transition shrink-0 ${
            isBlocked ? "hover:bg-[#FEE2E2] text-[#B91C1C]" : "hover:bg-slate-100 text-slate-500"
          }`}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="relative shrink-0">
          {activeConversation.partner.avatarUrl ? (
            <img
              src={activeConversation.partner.avatarUrl}
              alt={activeConversation.partner.name}
              className={`h-10 w-10 rounded-full object-cover border ${
                isBlocked ? "border-[#FCA5A5]" : "border-slate-100"
              }`}
            />
          ) : (
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm bg-gradient-to-br ${
                isBlocked ? "from-[#FCA5A5] to-[#EF4444]" : "from-cyan-400 to-blue-500"
              }`}
            >
              {(() => {
                const name = activeConversation.partner.name;
                if (!name) return "U";
                const parts = name.trim().split(/\s+/);
                if (parts.length === 0) return "U";
                if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
                const firstInitial = parts[0].charAt(0).toUpperCase();
                const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
                return `${firstInitial}${lastInitial}`;
              })()}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h3
            className={`text-sm font-bold truncate ${
              isBlocked ? "text-[#7F1D1D]" : "text-slate-800"
            }`}
          >
            {activeConversation.partner.name}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0" ref={menuRef}>
        {role === "STUDENT" && (
          <a
            href={`/company/${activeConversation.partner.id}`}
            className={`flex items-center gap-1.5 rounded-lg border p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold transition shrink-0 ${
              isBlocked
                ? "border-[#FCA5A5] bg-white text-[#B91C1C] hover:bg-[#FEF2F2]"
                : "border-slate-100 bg-white text-slate-600 hover:bg-slate-50"
            }`}
            title="Xem trang công ty"
          >
            <Building2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Xem trang công ty</span>
          </a>
        )}

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`rounded-lg p-2 transition ${
              isBlocked ? "text-[#B91C1C] hover:bg-[#FEE2E2]" : "text-slate-500 hover:bg-slate-100"
            }`}
            title="Tùy chọn cuộc trò chuyện"
          >
            <MoreVertical className="h-4.5 w-4.5" />
          </button>

          {menuOpen && (
            <div
              className={`absolute right-0 mt-1.5 w-48 rounded-xl border p-1 shadow-lg bg-white animate-[fadeSlideDown_0.2s_ease-out] ${
                isBlocked ? "border-[#FEE2E2]" : "border-slate-100"
              }`}
            >
              <button
                onClick={() => {
                  onHide();
                  setMenuOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium transition ${
                  isBlocked ? "text-[#B91C1C] hover:bg-[#FEF2F2]" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <EyeOff className="h-4 w-4" />
                Ẩn cuộc trò chuyện
              </button>
              <button
                onClick={() => {
                  onBlock();
                  setMenuOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium transition ${
                  isBlockedByMe ? "text-blue-600 hover:bg-blue-50" : "text-[#EF4444] hover:bg-[#FEF2F2]"
                }`}
              >
                <Ban className="h-4 w-4" />
                {isBlockedByMe ? "Gỡ chặn cuộc trò chuyện" : "Chặn cuộc trò chuyện"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
