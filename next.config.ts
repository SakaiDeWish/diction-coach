import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique : toutes les pages sont client-side et les données vivent
  // dans le navigateur, donc le site se déploie comme un simple dossier de
  // fichiers (Netlify, Vercel, GitHub Pages, n'importe quel hébergeur static).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
