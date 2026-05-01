import Image from "next/image";

type Props = {
  name: string;
  avatarUrl?: string | null;
  size?: number;
  className?: string;
};

const COLORS = [
  "bg-blue-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-indigo-500",
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function CandidateAvatar({
  name,
  avatarUrl,
  size = 40,
  className = "",
}: Props) {
  if (avatarUrl) {
    return (
      <div
        className={`shrink-0 overflow-hidden rounded-full ${className}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={avatarUrl}
          alt={name}
          width={size}
          height={size}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full text-white font-bold ${getColorFromName(name)} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {getInitials(name)}
    </div>
  );
}
