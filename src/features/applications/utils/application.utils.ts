export function formatRelativeDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const diffMs = Date.now() - date.getTime();

  if (diffMs < 0) {
    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
    }).format(date);
  }

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < hour) {
    const minutes = Math.max(1, Math.floor(diffMs / minute));
    return `${minutes} phút trước`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} giờ trước`;
  }

  if (diffMs < 30 * day) {
    const days = Math.floor(diffMs / day);
    return `${days} ngày trước`;
  }

  const months = Math.floor(diffMs / (30 * day));
  return `${months} tháng trước`;
}
