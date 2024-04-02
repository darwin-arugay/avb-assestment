export const capitalize = (string) =>
  string
    .split(" ")
    .map((n) => (n ? `${n[0]?.toUpperCase()}${n.slice(1, n.length)}` : ""))
    .join(" ");
