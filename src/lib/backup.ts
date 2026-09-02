import { SESSIONS_KEY } from "@/lib/session-storage";
import { JOURNAL_KEY } from "@/lib/journal-storage";
import { TRIGGER_KEY } from "@/lib/trigger-storage";
import { INTERVIEW_KEY } from "@/lib/interview-storage";
import { COMPARISONS_KEY, REFERENCES_KEY } from "@/lib/reference-storage";

const APP_MARKER = "diction-coach";
const FORMAT_VERSION = 1;

/**
 * Clés sauvegardées. Les enregistrements audio (IndexedDB) sont volontairement
 * exclus : ce sont des blobs lourds, et les inclure ferait exploser la taille
 * du fichier. L'utilisateur en est averti explicitement dans l'écran Réglages.
 */
const BACKED_UP_KEYS = [
  SESSIONS_KEY,
  JOURNAL_KEY,
  TRIGGER_KEY,
  INTERVIEW_KEY,
  REFERENCES_KEY,
  COMPARISONS_KEY,
] as const;

export interface BackupPayload {
  app: typeof APP_MARKER;
  version: number;
  exportedAt: string;
  /** Contenu brut de chaque clé, tel que stocké. */
  data: Record<string, unknown>;
  /** Rappel machine-lisible : l'audio n'est pas dans ce fichier. */
  audioIncluded: false;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function buildBackup(): BackupPayload {
  const data: Record<string, unknown> = {};
  if (isBrowser()) {
    for (const key of BACKED_UP_KEYS) {
      const raw = window.localStorage.getItem(key);
      if (raw === null) continue;
      try {
        data[key] = JSON.parse(raw);
      } catch {
        // Valeur illisible : on la saute plutôt que de corrompre l'export.
      }
    }
  }
  return {
    app: APP_MARKER,
    version: FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    data,
    audioIncluded: false,
  };
}

export function serializeBackup(): string {
  return JSON.stringify(buildBackup(), null, 2);
}

export interface ImportResult {
  ok: boolean;
  restoredKeys?: string[];
  error?: string;
}

/** Restaure un fichier produit par `serializeBackup`. */
export function applyBackup(fileContent: string): ImportResult {
  if (!isBrowser()) return { ok: false, error: "Import indisponible ici." };

  let parsed: Partial<BackupPayload>;
  try {
    parsed = JSON.parse(fileContent);
  } catch {
    return { ok: false, error: "Ce fichier n'est pas un JSON valide." };
  }

  if (parsed?.app !== APP_MARKER) {
    return {
      ok: false,
      error: "Ce fichier ne vient pas de Diction Coach.",
    };
  }
  if (typeof parsed.data !== "object" || parsed.data === null) {
    return { ok: false, error: "Ce fichier ne contient aucune donnée." };
  }

  const restoredKeys: string[] = [];
  for (const key of BACKED_UP_KEYS) {
    const value = (parsed.data as Record<string, unknown>)[key];
    if (value === undefined) continue;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      restoredKeys.push(key);
    } catch {
      return {
        ok: false,
        error: "Le stockage du navigateur a refusé l'écriture.",
      };
    }
  }

  if (restoredKeys.length === 0) {
    return { ok: false, error: "Aucune donnée reconnue dans ce fichier." };
  }
  return { ok: true, restoredKeys };
}

export function backupFileName(): string {
  return `diction-coach-${new Date().toISOString().slice(0, 10)}.json`;
}
