export interface JournalCriteria {
  debit: number; // 1 à 5
  articulation: number; // 1 à 5
  fatigue: number; // 1 à 5
}

export type JournalEntry = {
  date: string; // AAAA-MM-JJ
  comment?: string;
} & (
  | { mode: "simple"; note: number }
  | { mode: "detailed"; criteria: JournalCriteria }
);

const JOURNAL_KEY = "diction-coach:journal";

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

/** Accepte aussi les entrées de la Phase 3 (sans champ `mode`) comme du simple. */
function normalizeEntry(raw: unknown): JournalEntry | null {
  const entry = raw as {
    date?: unknown;
    comment?: unknown;
    mode?: unknown;
    note?: unknown;
    criteria?: unknown;
  } | null;

  if (typeof entry?.date !== "string") return null;
  const comment = typeof entry.comment === "string" ? entry.comment : undefined;

  if (entry.mode === "detailed" && isJournalCriteria(entry.criteria)) {
    return { date: entry.date, comment, mode: "detailed", criteria: entry.criteria };
  }
  if (typeof entry.note === "number") {
    return { date: entry.date, comment, mode: "simple", note: entry.note };
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
