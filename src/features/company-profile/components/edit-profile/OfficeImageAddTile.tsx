"use client";

import { ImageUp, Loader2 } from "lucide-react";

type Props = {
  disabled?: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onAdd: (files: FileList | null) => void;
};

export default function OfficeImageAddTile({
  disabled = false,
  inputRef,
  onAdd,
}: Props) {
  return (
    <label className="group flex aspect-1.75/1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white text-slate-500 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-cyan-50/40 hover:text-cyan-600 hover:shadow-sm">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        disabled={disabled}
        onChange={(e) => onAdd(e.target.files)}
      />

      {disabled ? (
        <Loader2 size={34} className="animate-spin" />
      ) : (
        <>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 transition duration-200 group-hover:bg-cyan-100">
            <ImageUp size={28} />
          </div>
          <div className="mt-3 flex flex-col items-center">
            <span className="text-[16px] font-semibold">Thêm ảnh</span>
            <span className="text-[12px] text-slate-400">Chọn tối đa 6 ảnh</span>
          </div>
        </>
      )}
    </label>
  );
}
