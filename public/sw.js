/*
 * Service worker de Diction Coach.
 * Objectif : l'app reste utilisable sans connexion après un premier chargement.
 * Aucune donnée personnelle ne transite ici : les séances, le journal et les
 * enregistrements vivent dans localStorage et IndexedDB, hors du cache HTTP.
 */

const CACHE = "diction-coach-v1";

const CORE_ROUTES = [
  "/",
  "/seance",
  "/historique",
  "/entretien",
  "/reference",
  "/comparaison",
  "/reglages",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // Ajout individuel : une seule URL en échec ne doit pas faire tomber
      // toute l'installation.
      await Promise.allSettled(CORE_ROUTES.map((route) => cache.add(route)));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.filter((name) => name !== CACHE).map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigation : le réseau d'abord pour rester à jour, le cache en secours.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          const cache = await caches.open(CACHE);
          cache.put(request, response.clone());
          return response;
        } catch {
          const cached = await caches.match(request);
          return cached || (await caches.match("/")) || Response.error();
        }
      })(),
    );
    return;
  }

  // Ressources statiques : le cache d'abord, puis le réseau qui alimente le cache.
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE);
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        return Response.error();
      }
    })(),
  );
});
