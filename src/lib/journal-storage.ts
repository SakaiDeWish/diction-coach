export interface JournalEntry {
  date: string; // AAAA-MM-JJ
  note: number; // 1 à 5
  comment?: string;
}

const JOURNAL_KEY = "diction-coach:journal";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getJournalEntries(): JournalEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(JOURNAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is JournalEntry =>
        typeof entry?.date === "string" && typeof entry?.note === "number",
    );
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
