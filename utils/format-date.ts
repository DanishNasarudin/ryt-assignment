export function formatDateString(dateString: string): string {
  const date = new Date(dateString);
  const now = Date.now();
  const diff = now - date.getTime();
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

  if (diff < oneWeekMs) {
    // e.g. "Monday", "Tuesday", ...
    return date.toLocaleDateString("en-GB", { weekday: "long" });
  }

  // e.g. "05 Mar 2025", "23 Apr 2025"
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
