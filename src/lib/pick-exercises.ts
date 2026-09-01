import {
  EXERCISES,
  getExercisesByCategory,
  type Exercise,
  type ExerciseCategory,
} from "@/lib/exercises";
import type { SessionLog } from "@/lib/session-storage";

const SESSION_CATEGORIES: ExerciseCategory[] = [
  "echauffement",
  "virelangue",
  "lecture",
  "projection",
];

const RECENT_SESSIONS_TO_AVOID = 2;

function pickOne<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Tire un exercice par catégorie, en excluant ceux faits lors des dernières
 * séances pour garder de la variété. Si tous les exercices d'une catégorie
 * ont été faits récemment, on retombe sur la liste complète de la catégorie.
 */
export function pickDailyExercises(recentLogs: SessionLog[]): Exercise[] {
  const recentIds = new Set(
    recentLogs
      .slice(-RECENT_SESSIONS_TO_AVOID)
      .flatMap((log) => log.exerciseIds),
  );

  return SESSION_CATEGORIES.map((category) => {
    const pool = getExercisesByCategory(category);
    const freshPool = pool.filter((exercise) => !recentIds.has(exercise.id));
    return pickOne(freshPool.length > 0 ? freshPool : pool);
  });
}

export function resolveExercises(ids: string[]): Exercise[] {
  return ids
    .map((id) => EXERCISES.find((exercise) => exercise.id === id))
    .filter((exercise): exercise is Exercise => Boolean(exercise));
}
