"use client";

import { ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  label?: string;
  placeholder?: string;
  value: string;
  options: Option[];
  error?: string;
  onChange: (value: string) => void;
};

export default function CustomSelect({
  label = "",
  placeholder = "Chọn một tùy chọn",
  value,
  options,
  error,
  onChange,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((option) => option.value === value);
  const shouldShowLabel = label.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {shouldShowLabel && (
        <label className="mb-2 block text-sm font-medium text-(--color-text)">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-11 w-full items-center justify-between rounded-xl border bg-white px-4 text-left outline-none transition focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
            : "border-(--color-border) focus:border-(--color-accent) focus:ring-(--color-accent)/20"
        }`}
      >
        <span
          className={`min-w-0 flex-1 truncate pr-3 ${
            selectedOption ? "text-(--color-text)" : "text-slate-400"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-500 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-(--color-border) bg-white shadow-lg">
          {options.map((option) => {
            const isSelected = value === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-(--color-text) transition hover:bg-slate-50"
              >
                <span className="min-w-0 flex-1 truncate">{option.label}</span>

                {isSelected && (
                  <Check
                    size={16}
                    className="ml-3 shrink-0 text-(--color-accent)"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
