import { Transaction } from "./sample-transactions";

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

export function formatDateFull(dateString: string): string {
  const date = new Date(dateString);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ] as const;

  const weekday = weekdays[date.getUTCDay()];
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${weekday}, ${day} ${month} ${year}`;
}

export const sortByDateDesc = (txs: Transaction[]): Transaction[] =>
  [...txs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
