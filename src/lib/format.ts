export const currency = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

export const compact = (n: number) =>
  new Intl.NumberFormat("es-MX", { notation: "compact", maximumFractionDigits: 1 }).format(n);

/** Parse "dd/mm/yyyy hh:mm" -> Date */
export const parseDate = (s: string): Date => {
  const [d, t] = s.split(" ");
  const [day, month, year] = d.split("/").map(Number);
  const [h = 0, min = 0] = (t ?? "").split(":").map(Number);
  return new Date(year, month - 1, day, h, min);
};
