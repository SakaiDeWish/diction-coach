/*
 * Service worker de Diction Coach.
 * Objectif : l'app reste utilisable sans connexion après un premier chargement,
 * y compris sur une page jamais visitée en ligne, du moment que l'app elle-même
 * a été ouverte une fois. Aucune donnée personnelle ne transite ici : les
 * séances, le journal et les enregistrements vivent dans localStorage et
 * IndexedDB, hors du cache HTTP.
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

/**
 * Récupère chaque page cœur et en extrait les chunks JS/CSS qu'elle référence,
 * pour les précacher aussi. Sans ça, seule la coquille HTML serait disponible
 * hors ligne : la page s'afficherait vide faute de pouvoir s'hydrater, pour
 * toute route jamais ouverte pendant que l'utilisateur était en ligne.
 */
async function discoverPageAssets(cache, htmlRoutes) {
  const assetUrls = new Set();

  await Promise.allSettled(
    htmlRoutes.map(async (route) => {
      const response = await fetch(route);
      if (!response.ok) return;
      const html = await response.clone().text();
      await cache.put(route, response);

      const pattern = /(?:src|href)="([^"]+\/_next\/static\/[^"]+)"/g;
      for (const match of html.matchAll(pattern)) {
        assetUrls.add(new URL(match[1], self.location.origin).href);
      }
    }),
  );

  await Promise.allSettled(
    [...assetUrls].map(async (url) => {
      const response = await fetch(url);
      if (response.ok) await cache.put(url, response);
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const htmlRoutes = CORE_ROUTES.filter(
        (route) => !/\.(png|webmanifest|jpg|svg|ico)$/.test(route),
      );
      const otherRoutes = CORE_ROUTES.filter((route) =>
        /\.(png|webmanifest|jpg|svg|ico)$/.test(route),
      );
      // Chaque étape est individuellement tolérante aux échecs : une seule
      // URL en échec ne doit pas faire tomber toute l'installation.
      await Promise.allSettled([
        discoverPageAssets(cache, htmlRoutes),
        ...otherRoutes.map((route) => cache.add(route)),
      ]);
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
          if (cached) return cached;
          const fallback = await caches.match(CORE_ROUTES[0]);
          return fallback || Response.error();
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
