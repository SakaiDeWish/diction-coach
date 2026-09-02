/**
 * Stockage local des enregistrements audio, en IndexedDB (les blobs ne tiennent
 * pas dans localStorage). Aucun audio ne quitte l'appareil : il n'y a aucune
 * requête réseau dans ce module, et aucune analyse automatique de la voix.
 */

const DB_NAME = "diction-coach";
const DB_VERSION = 1;
const STORE = "recordings";

/** Au-delà de ce nombre, les enregistrements les plus anciens sont purgés. */
export const MAX_RECORDINGS = 30;

function isBrowser(): boolean {
  return typeof window !== "undefined" && "indexedDB" in window;
}

function openDb(): Promise<IDBDatabase | null> {
  if (!isBrowser()) return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

function runRequest<T>(request: IDBRequest<T>): Promise<T | null> {
  return new Promise((resolve) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

export async function listRecordingIds(): Promise<string[]> {
  const db = await openDb();
  if (!db) return [];
  try {
    const store = db.transaction(STORE, "readonly").objectStore(STORE);
    const keys = await runRequest(store.getAllKeys());
    return (keys ?? []).map(String).sort();
  } catch {
    return [];
  }
}

export async function deleteRecording(id: string): Promise<void> {
  const db = await openDb();
  if (!db) return;
  try {
    const store = db.transaction(STORE, "readwrite").objectStore(STORE);
    await runRequest(store.delete(id));
  } catch {
    // Suppression best effort.
  }
}

/** Purge les enregistrements les plus anciens au-delà de `max`. */
export async function pruneRecordings(max = MAX_RECORDINGS): Promise<void> {
  const ids = await listRecordingIds();
  if (ids.length <= max) return;
  const excess = ids.slice(0, ids.length - max);
  for (const id of excess) {
    await deleteRecording(id);
  }
}

/**
 * Enregistre un blob audio. En cas de quota atteint, purge les plus anciens et
 * retente une fois. Renvoie false si l'enregistrement n'a pas pu être stocké,
 * ce qui ne doit jamais bloquer la séance.
 */
export async function saveRecording(id: string, blob: Blob): Promise<boolean> {
  const db = await openDb();
  if (!db) return false;

  const attempt = (): Promise<boolean> =>
    new Promise((resolve) => {
      try {
        const transaction = db.transaction(STORE, "readwrite");
        transaction.objectStore(STORE).put(blob, id);
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = () => resolve(false);
        transaction.onabort = () => resolve(false);
      } catch {
        resolve(false);
      }
    });

  if (await attempt()) {
    await pruneRecordings();
    return true;
  }

  // Probable dépassement de quota : on fait de la place et on retente une fois.
  await pruneRecordings(Math.floor(MAX_RECORDINGS / 2));
  return attempt();
}

export async function getRecording(id: string): Promise<Blob | null> {
  const db = await openDb();
  if (!db) return null;
  try {
    const store = db.transaction(STORE, "readonly").objectStore(STORE);
    const result = await runRequest<Blob>(store.get(id));
    return result instanceof Blob ? result : null;
  } catch {
    return null;
  }
}
