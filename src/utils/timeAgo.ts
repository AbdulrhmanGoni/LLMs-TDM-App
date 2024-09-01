export default function timeAgo(theDate: string | Date): string {
  if (
    theDate instanceof Date ||
    new Date(theDate).toString() != "Invalid Date"
  ) {
    const now = new Date().getTime(),
      dateBeginning = new Date(`${theDate}`).getTime(),
      period = now - dateBeginning;

    const formatTime = (num: number, type: string) => {
      const period = Math.floor(num);
      let s = period === 1 ? "" : "s";
      return `${period} ${type}${s} ago`;
    };

    const seconds = period / 1000,
      minutes = seconds / 60,
      hours = minutes / 60,
      days = hours / 24,
      week = days / 7,
      months = days / 28,
      years = months / 12;

    return seconds <= 60
      ? "Just Yet"
      : minutes <= 60
      ? formatTime(minutes, "minute")
      : hours <= 24
      ? formatTime(hours, "hour")
      : days <= 7
      ? formatTime(days, "day")
      : week <= 4
      ? formatTime(week, "week")
      : months <= 12
      ? formatTime(months, "month")
      : formatTime(years, "year");
  } else return theDate;
}
