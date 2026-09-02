import { dateKeyDaysAgo } from "@/lib/date";
import { INTERVIEW_INTERVAL_DAYS } from "@/lib/interview-questions";

/**
 * Séance « en conditions d'entretien ». Stockée à part des entrées de journal :
 * elle ne remplace pas la séance quotidienne et plusieurs séances peuvent
 * coexister le même jour.
 */
export interface InterviewSession {
  id: string;
  date: string; // AAAA-MM-JJ
  question: string;
  predicted: number;
  after?: number;
  gap?: number;
  recordingId?: string;
}

const INTERVIEW_KEY = "diction-coach:interviews";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getInterviewSessions(): InterviewSession[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(INTERVIEW_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is InterviewSession =>
        typeof entry?.id === "string" &&
        typeof entry?.date === "string" &&
        typeof entry?.question === "string" &&
        typeof entry?.predicted === "number",
    );
  } catch {
    return [];
  }
}

export function getInterviewSessionsSortedDesc(): InterviewSession[] {
  return [...getInterviewSessions()].sort((a, b) => (a.id < b.id ? 1 : -1));
}

export function saveInterviewSession(session: InterviewSession): void {
  if (!isBrowser()) return;
  const sessions = getInterviewSessions().filter(
    (item) => item.id !== session.id,
  );
  sessions.push(session);
  try {
    window.localStorage.setItem(INTERVIEW_KEY, JSON.stringify(sessions));
  } catch {
    // Stockage indisponible : la séance reste vécue même si elle n'est pas
    // persistée.
  }
}

/**
 * La séance en conditions est proposée une fois par semaine : elle est due si
 * aucune n'a été faite depuis `INTERVIEW_INTERVAL_DAYS` jours.
 */
export function isInterviewSessionDue(): boolean {
  const sessions = getInterviewSessions();
  if (sessions.length === 0) return true;
  const latest = sessions.reduce((most, item) =>
    item.date > most.date ? item : most,
  );
  return latest.date <= dateKeyDaysAgo(INTERVIEW_INTERVAL_DAYS);
}
