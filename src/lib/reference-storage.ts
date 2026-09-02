import { dateKeyDaysAgo } from "@/lib/date";
import { REFERENCE_INTERVAL_DAYS } from "@/lib/reference-paragraph";

/** Un enregistrement mensuel du paragraphe de référence. */
export interface ReferenceRecording {
  id: string;
  date: string; // AAAA-MM-JJ
  recordingId: string;
}

/**
 * Verdict d'une comparaison par paires à l'aveugle, rendue par un proche.
 * `winner` désigne l'enregistrement jugé le plus facile à comprendre.
 */
export interface ComparisonVerdict {
  id: string;
  date: string; // AAAA-MM-JJ de la comparaison
  olderDate: string;
  newerDate: string;
  winner: "older" | "newer" | "equal";
}

export const REFERENCES_KEY = "diction-coach:references";
export const COMPARISONS_KEY = "diction-coach:comparisons";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readList<T>(key: string, isValid: (value: unknown) => boolean): T[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValid) as T[];
  } catch {
    return [];
  }
}

function writeList<T>(key: string, items: T[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Stockage indisponible : non bloquant.
  }
}

export function getReferenceRecordings(): ReferenceRecording[] {
  return readList<ReferenceRecording>(
    REFERENCES_KEY,
    (value) =>
      typeof (value as ReferenceRecording)?.id === "string" &&
      typeof (value as ReferenceRecording)?.date === "string" &&
      typeof (value as ReferenceRecording)?.recordingId === "string",
  ).sort((a, b) => (a.id < b.id ? -1 : 1));
}

export function saveReferenceRecording(entry: ReferenceRecording): void {
  const entries = getReferenceRecordings().filter(
    (item) => item.id !== entry.id,
  );
  entries.push(entry);
  writeList(REFERENCES_KEY, entries);
}

/** L'enregistrement de référence est proposé une fois par mois. */
export function isReferenceRecordingDue(): boolean {
  const entries = getReferenceRecordings();
  if (entries.length === 0) return true;
  const latest = entries[entries.length - 1];
  return latest.date <= dateKeyDaysAgo(REFERENCE_INTERVAL_DAYS);
}

export function getComparisons(): ComparisonVerdict[] {
  return readList<ComparisonVerdict>(
    COMPARISONS_KEY,
    (value) =>
      typeof (value as ComparisonVerdict)?.id === "string" &&
      typeof (value as ComparisonVerdict)?.date === "string" &&
      typeof (value as ComparisonVerdict)?.winner === "string",
  );
}

export function getComparisonsSortedDesc(): ComparisonVerdict[] {
  return [...getComparisons()].sort((a, b) => (a.id < b.id ? 1 : -1));
}

export function saveComparison(verdict: ComparisonVerdict): void {
  const verdicts = getComparisons().filter((item) => item.id !== verdict.id);
  verdicts.push(verdict);
  writeList(COMPARISONS_KEY, verdicts);
}
