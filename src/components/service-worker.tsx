"use client";

import * as React from "react";

/**
 * Enregistre le service worker qui rend l'app utilisable hors connexion après
 * un premier chargement. Silencieux en cas d'échec : l'app doit fonctionner
 * même si le navigateur refuse les service workers.
 */
export function ServiceWorkerRegistration() {
  React.useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Hors-ligne indisponible, le reste de l'app continue de fonctionner.
      });
    };
    if (document.readyState === "complete") {
      register();
      return;
    }
    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
