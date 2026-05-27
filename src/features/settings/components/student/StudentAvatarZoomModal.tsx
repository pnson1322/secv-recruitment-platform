"use client";

import { X } from "lucide-react";
import ClientPortal from "@/components/ClientPortal";

type StudentAvatarZoomModalProps = {
  isOpen: boolean;
  avatarUrl: string | null | undefined;
  onClose: () => void;
  initials: string;
};

export default function StudentAvatarZoomModal({
  isOpen,
  avatarUrl,
  onClose,
  initials,
}: StudentAvatarZoomModalProps) {
  if (!isOpen) return null;

  return (
    <ClientPortal>
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 px-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-0 cursor-zoom-out"
        />
        <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Ảnh đại diện phóng to"
              className="max-h-[80vh] max-w-full object-contain"
            />
          ) : (
            <div className="flex h-64 w-64 items-center justify-center bg-cyan-600 text-6xl font-bold text-white">
              {initials}
            </div>
          )}
        </div>
      </div>
    </ClientPortal>
  );
}
