import {
  isToday,
  isYesterday,
  formatDistanceToNow,
  format,
  isThisYear,
} from "date-fns";

export default function formatDate(date: Date) {
  const distanceToNow = formatDistanceToNow(date, { addSuffix: true });

  if (isToday(date)) {
    return `${format(date, "h:mm a")} (${distanceToNow})`;
  } else if (isYesterday(date)) {
    return `Yesterday at ${format(date, "h:mm a")} (${distanceToNow})`;
  } else if (isThisYear(date)) {
    return `${format(date, "eee, do MMM 'at' h:mm a")} (${distanceToNow})`;
  } else {
    return `${format(
      date,
      "eee, do MMM, yyyy 'at' h:mm a"
    )} (${distanceToNow})`;
  }
}
