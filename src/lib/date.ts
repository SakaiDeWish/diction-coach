/** Clé de date locale au format AAAA-MM-JJ, stable pour le stockage et les comparaisons. */
export function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayKey(): string {
  return dateKey(new Date());
}

/** Clé de date du jour situé `daysAgo` jours avant aujourd'hui (0 = aujourd'hui). */
export function dateKeyDaysAgo(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return dateKey(date);
}
