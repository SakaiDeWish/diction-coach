import type { NextConfig } from "next";

// Défini uniquement par le workflow GitHub Pages, qui sert le site sous
// /diction-coach/ plutôt qu'à la racine du domaine. Vide (donc racine) pour
// tout autre hébergeur (Netlify, Vercel, local).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Export statique : toutes les pages sont client-side et les données vivent
  // dans le navigateur, donc le site se déploie comme un simple dossier de
  // fichiers (Netlify, Vercel, GitHub Pages, n'importe quel hébergeur static).
  output: "export",
  images: { unoptimized: true },
  basePath,
};

export default nextConfig;
