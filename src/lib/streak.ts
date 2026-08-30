import { dateKey } from "@/lib/date";
import type { SessionLog } from "@/lib/session-storage";

/**
 * Nombre de jours consécutifs avec au moins une séance terminée, en partant
 * d'aujourd'hui (ou d'hier si la séance du jour n'est pas encore faite —
 * la journée n'est pas terminée, le streak n'est pas encore rompu).
 * Un jour manqué le fait retomber à zéro dès le jour suivant.
 */
export function computeStreak(logs: SessionLog[]): number {
  const doneDates = new Set(logs.map((log) => log.date));

  const cursor = new Date();
  if (!doneDates.has(dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!doneDates.has(dateKey(cursor))) {
      return 0;
    }
  }

  let streak = 0;
  while (doneDates.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
