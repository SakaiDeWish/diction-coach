const TRIGGER_KEY = "diction-coach:trigger";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** null = jamais demandé. Chaîne vide = demandé mais volontairement laissé vide. */
export function getContextTrigger(): string | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(TRIGGER_KEY);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    return typeof parsed?.value === "string" ? parsed.value : null;
  } catch {
    return null;
  }
}

export function setContextTrigger(value: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(TRIGGER_KEY, JSON.stringify({ value }));
  } catch {
    // Non bloquant : le rappel ne sera simplement pas mémorisé.
  }
}
