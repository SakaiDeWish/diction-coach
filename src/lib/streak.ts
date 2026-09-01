import { dateKey, dateKeyDaysAgo } from "@/lib/date";
import type { SessionLog } from "@/lib/session-storage";

export interface StreakInfo {
  /** Nombre de jours consécutifs pratiqués, en tolérant un jour manqué isolé. */
  streak: number;
  /**
   * Vrai si hier a été manqué mais que la série n'est pas cassée pour autant
   * (docs/PROTOCOLE.md, section 10 : un jour manqué isolé ne casse pas la série).
   */
  graceInUse: boolean;
}

/**
 * Jours consécutifs pratiqués, un jour manqué isolé ne casse pas la série,
 * deux jours manqués d'affilée la remettent à zéro (Lally et al. 2010 :
 * manquer une occasion n'affecte pas matériellement la formation d'une
 * habitude). Le jour courant n'est évalué que s'il est déjà fait : la
 * journée n'étant pas terminée, ne pas l'avoir encore fait n'est pas un
 * manquement.
 */
export function computeStreakInfo(logs: SessionLog[]): StreakInfo {
  const doneDates = new Set(logs.map((log) => log.date));
  const doneToday = doneDates.has(dateKeyDaysAgo(0));

  let streak = 0;
  let previousWasMiss = false;

  // Simulation chronologique, du plus ancien jour considéré (365 jours en
  // arrière) jusqu'à hier (ou aujourd'hui s'il est déjà fait) : le jour
  // courant n'est jamais compté comme manqué tant qu'il n'est pas terminé.
  // Les jours fantômes avant le début réel de l'usage sont tous « manqués »,
  // ce qui maintient le streak à 0 sans jamais l'abîmer une fois qu'il a
  // commencé à s'accumuler sur de vraies séances.
  const startOffset = doneToday ? 0 : 1;
  for (let offset = 365; offset >= startOffset; offset -= 1) {
    const key = dateKeyDaysAgo(offset);
    if (doneDates.has(key)) {
      streak += 1;
      previousWasMiss = false;
    } else if (previousWasMiss) {
      streak = 0;
      // previousWasMiss reste vrai : la série ne peut repartir qu'à partir
      // du prochain jour effectivement fait.
    } else {
      previousWasMiss = true;
    }
  }

  const yesterdayKey = dateKeyDaysAgo(1);
  const graceInUse = !doneToday && !doneDates.has(yesterdayKey) && streak > 0;

  return { streak, graceInUse };
}

/** Nombre de séances distinctes sur les `days` derniers jours (aujourd'hui inclus). */
export function countSessionsInLastDays(logs: SessionLog[], days = 30): number {
  const earliest = dateKeyDaysAgo(days - 1);
  const today = dateKey(new Date());
  return logs.filter((log) => log.date >= earliest && log.date <= today).length;
}
