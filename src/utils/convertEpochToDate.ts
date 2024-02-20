export function ConvertEpochToDate(timestamp: number) {
  const date = new Date(timestamp * 1000).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  return date;
}
