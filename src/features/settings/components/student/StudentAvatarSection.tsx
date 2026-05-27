"use client";

import { useRef } from "react";
import { Camera, Loader2 } from "lucide-react";

type StudentAvatarSectionProps = {
  avatarUrl: string | null | undefined;
  fullName: string;
  isUpdatingAvatar: boolean;
  onAvatarClick: () => void;
  onAvatarChange: (file: File) => void;
  getInitials: (name: string) => string;
};

export default function StudentAvatarSection({
  avatarUrl,
  fullName,
  isUpdatingAvatar,
  onAvatarClick,
  onAvatarChange,
  getInitials,
}: StudentAvatarSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onAvatarChange(file);
    }
  };

  return (
    <div className="mb-6 flex items-center gap-5">
      <button
        type="button"
        onClick={onAvatarClick}
        disabled={isUpdatingAvatar}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-slate-100 cursor-zoom-in group"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-cyan-600 text-2xl font-bold text-white group-hover:scale-105 transition-transform">
            {getInitials(fullName)}
          </div>
        )}
        {isUpdatingAvatar && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
      </button>
      <div>
        <p className="text-[13px] text-slate-400 mb-1.5">Ảnh đại diện</p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUpdatingAvatar}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-[13px] font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        >
          <Camera size={14} />
          <span>Thay đổi ảnh</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
