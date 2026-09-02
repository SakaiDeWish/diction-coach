export interface JournalCriteria {
  debit: number; // 1 à 5
  articulation: number; // 1 à 5
  fatigue: number; // 1 à 5
}

/**
 * Boucle d'auto-évaluation calibrée (docs/PROTOCOLE.md, section 6) : la note
 * est prédite avant toute réécoute, puis éventuellement reposée après écoute.
 * C'est l'écart entre les deux, pas la note elle-même, qui mesure le progrès.
 */
export interface CalibrationData {
  /** Note donnée avant d'avoir réécouté l'enregistrement. */
  predicted: number;
  /** Note donnée après réécoute. Absente si la réécoute n'a pas été proposée. */
  after?: number;
  /** Écart absolu entre les deux notes, seulement si la réécoute a eu lieu. */
  gap?: number;
  /** Clé de l'enregistrement en IndexedDB. */
  recordingId?: string;
}

export type JournalEntry = {
  date: string; // AAAA-MM-JJ
  comment?: string;
  calibration?: CalibrationData;
} & (
  | { mode: "simple"; note: number }
  | { mode: "detailed"; criteria: JournalCriteria }
);

export const JOURNAL_KEY = "diction-coach:journal";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isJournalCriteria(value: unknown): value is JournalCriteria {
  const criteria = value as Partial<JournalCriteria> | null;
  return (
    typeof criteria?.debit === "number" &&
    typeof criteria?.articulation === "number" &&
    typeof criteria?.fatigue === "number"
  );
}

function normalizeCalibration(value: unknown): CalibrationData | undefined {
  const data = value as Partial<CalibrationData> | null;
  if (typeof data?.predicted !== "number") return undefined;
  return {
    predicted: data.predicted,
    after: typeof data.after === "number" ? data.after : undefined,
    gap: typeof data.gap === "number" ? data.gap : undefined,
    recordingId:
      typeof data.recordingId === "string" ? data.recordingId : undefined,
  };
}

/**
 * Accepte aussi les entrées de la Phase 3 (sans champ `mode`) comme du simple,
 * et les entrées antérieures à la Phase 8 (sans calibration).
 */
function normalizeEntry(raw: unknown): JournalEntry | null {
  const entry = raw as {
    date?: unknown;
    comment?: unknown;
    mode?: unknown;
    note?: unknown;
    criteria?: unknown;
    calibration?: unknown;
  } | null;

  if (typeof entry?.date !== "string") return null;
  const comment = typeof entry.comment === "string" ? entry.comment : undefined;
  const calibration = normalizeCalibration(entry.calibration);

  if (entry.mode === "detailed" && isJournalCriteria(entry.criteria)) {
    return {
      date: entry.date,
      comment,
      calibration,
      mode: "detailed",
      criteria: entry.criteria,
    };
  }
  if (typeof entry.note === "number") {
    return {
      date: entry.date,
      comment,
      calibration,
      mode: "simple",
      note: entry.note,
    };
  }
  return null;
}

export function getJournalEntries(): JournalEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(JOURNAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeEntry)
      .filter((entry): entry is JournalEntry => entry !== null);
  } catch {
    return [];
  }
}

export function getJournalEntriesSortedDesc(): JournalEntry[] {
  return [...getJournalEntries()].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Enregistre la calibration du jour sans attendre que l'utilisateur journalise :
 * il peut très bien sauter le journal, l'écart doit être conservé quand même.
 * Si aucune entrée n'existe encore pour ce jour, la note prédite sert de note
 * du jour, l'utilisateur l'ayant bien donnée lui-même.
 */
export function upsertCalibration(
  date: string,
  calibration: CalibrationData,
): void {
  const existing = getJournalEntries().find((entry) => entry.date === date);
  if (existing) {
    addJournalEntry({ ...existing, calibration });
    return;
  }
  addJournalEntry({
    date,
    mode: "simple",
    note: calibration.predicted,
    calibration,
  });
}

export function addJournalEntry(entry: JournalEntry): void {
  if (!isBrowser()) return;
  const entries = getJournalEntries().filter((item) => item.date !== entry.date);
  entries.push(entry);
  try {
    window.localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
  } catch {
    // Stockage indisponible : l'entrée reste vécue par l'utilisateur même
    // si elle n'est pas persistée.
  }
}
