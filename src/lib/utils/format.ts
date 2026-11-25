export function formatRupiah(amount: number): string {
  const formatted = new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
  return `Rp${formatted}`;
}

export function formatElapsedMinutes(minutes: number): string {
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min elapsed`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}h ${mins}m elapsed` : `${hrs}h elapsed`;
}

export function formatWibTime(date: Date = new Date()): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes} WIB`;
}

export function formatIndonesianDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function padTwo(num: number): string {
  return String(num).padStart(2, "0");
}
