export interface SessionLog {
  date: string; // AAAA-MM-JJ
  exerciseIds: string[];
}

export const SESSIONS_KEY = "diction-coach:sessions";
const PENDING_KEY = "diction-coach:pending-session";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getSessionLogs(): SessionLog[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(SESSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is SessionLog =>
        typeof entry?.date === "string" && Array.isArray(entry?.exerciseIds),
    );
  } catch {
    return [];
  }
}

export function getSessionLogForDate(date: string): SessionLog | undefined {
  return getSessionLogs().find((log) => log.date === date);
}

export function addSessionLog(log: SessionLog): void {
  if (!isBrowser()) return;
  const logs = getSessionLogs().filter((entry) => entry.date !== log.date);
  logs.push(log);
  try {
    window.localStorage.setItem(SESSIONS_KEY, JSON.stringify(logs));
  } catch {
    // Stockage indisponible (navigation privée, quota atteint) : la séance
    // reste vécue par l'utilisateur même si elle n'est pas persistée.
  }
  clearPendingSelection();
}

interface PendingSelection {
  date: string;
  exerciseIds: string[];
}

export function getPendingSelection(date: string): string[] | undefined {
  if (!isBrowser()) return undefined;
  try {
    const raw = window.localStorage.getItem(PENDING_KEY);
    if (!raw) return undefined;
    const parsed: PendingSelection = JSON.parse(raw);
    if (parsed.date !== date || !Array.isArray(parsed.exerciseIds)) {
      return undefined;
    }
    return parsed.exerciseIds;
  } catch {
    return undefined;
  }
}

export function setPendingSelection(date: string, exerciseIds: string[]): void {
  if (!isBrowser()) return;
  try {
    const payload: PendingSelection = { date, exerciseIds };
    window.localStorage.setItem(PENDING_KEY, JSON.stringify(payload));
  } catch {
    // Non bloquant : la sélection sera simplement retirée au hasard si elle
    // ne peut pas être mémorisée.
  }
}

function clearPendingSelection(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(PENDING_KEY);
  } catch {
    // Rien à faire si le stockage est indisponible.
  }
}
