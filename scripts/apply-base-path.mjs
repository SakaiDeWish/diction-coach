// Adapte le manifeste PWA et le service worker au préfixe de déploiement
// (NEXT_PUBLIC_BASE_PATH), pour les hébergeurs qui servent le site sous un
// sous-chemin comme GitHub Pages (/diction-coach/). Next.js préfixe déjà
// automatiquement ses propres pages et les balises <link>/<meta> générées via
// l'API Metadata, mais pas le contenu brut des fichiers de public/, copiés
// tels quels dans out/. No-op si aucun préfixe n'est défini (Netlify, Vercel,
// local).
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

if (!basePath) {
  console.log("apply-base-path: aucun préfixe défini, rien à faire.");
  process.exit(0);
}

const outDir = path.join(process.cwd(), "out");

async function patchManifest() {
  const file = path.join(outDir, "manifest.webmanifest");
  const manifest = JSON.parse(await readFile(file, "utf8"));
  manifest.start_url = `${basePath}/`;
  manifest.scope = `${basePath}/`;
  manifest.icons = manifest.icons.map((icon) => ({
    ...icon,
    src: `${basePath}${icon.src}`,
  }));
  await writeFile(file, JSON.stringify(manifest, null, 2));
  console.log("apply-base-path: manifest.webmanifest mis à jour.");
}

async function patchServiceWorker() {
  const file = path.join(outDir, "sw.js");
  const content = await readFile(file, "utf8");

  const patched = content.replace(
    /const CORE_ROUTES = \[([\s\S]*?)\];/,
    (fullMatch, arrayBody) => {
      const prefixedBody = arrayBody.replace(
        /"(\/[^"]*)"/g,
        (routeMatch, route) => `"${basePath}${route}"`,
      );
      return `const CORE_ROUTES = [${prefixedBody}];`;
    },
  );

  if (patched === content) {
    throw new Error(
      "apply-base-path: le tableau CORE_ROUTES est introuvable dans sw.js.",
    );
  }

  await writeFile(file, patched);
  console.log("apply-base-path: sw.js mis à jour.");
}

await patchManifest();
await patchServiceWorker();
