/** Formata uma data ISO (AAAA-MM-DD) como "18 de março de 2024", sem depender do fuso horário. */
export function formatLongDate(iso: string, locale = "pt-BR"): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
  return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(date);
}
