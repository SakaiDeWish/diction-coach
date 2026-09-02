"use client";

import * as React from "react";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import {
  applyBackup,
  backupFileName,
  serializeBackup,
  type ImportResult,
} from "@/lib/backup";

export default function ReglagesPage() {
  const [result, setResult] = React.useState<ImportResult | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleExport = () => {
    const blob = new Blob([serializeBackup()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = backupFileName();
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    const content = await file.text();
    const outcome = applyBackup(content);
    setResult(outcome);
  };

  return (
    <>
      <AnimatedNavFramer />
      <main className="mx-auto flex min-h-svh max-w-md flex-col gap-6 px-6 py-24">
        <h1 className="font-display text-2xl font-semibold">Réglages</h1>

        <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold">
            Sauvegarder mes données
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Le fichier contient tes séances, ton journal, tes écarts de
            calibration, tes séances en conditions, ton déclencheur et tes
            verdicts de comparaison.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              Les enregistrements audio ne sont pas inclus.
            </span>{" "}
            Ils restent sur cet appareil uniquement : sur un nouvel appareil, tu
            retrouveras l&apos;historique mais pas les extraits sonores, et il
            faudra réenregistrer un paragraphe de référence pour comparer à
            nouveau.
          </p>
          <button
            onClick={handleExport}
            className="mt-4 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Exporter dans un fichier
          </button>
        </section>

        <section className="rounded-3xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold">
            Restaurer une sauvegarde
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Importer remplace les données de cet appareil par celles du fichier.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleImport(file);
              event.target.value = "";
            }}
            className="mt-4 block w-full text-sm text-muted-foreground file:mr-3 file:rounded-full file:border file:border-border file:bg-background file:px-4 file:py-2 file:text-sm file:font-semibold file:text-foreground"
          />

          {result?.ok && (
            <p className="mt-3 text-sm font-medium text-success">
              Données restaurées ({result.restoredKeys?.length} ensembles).
              Recharge l&apos;accueil pour les voir.
            </p>
          )}
          {result && !result.ok && (
            <p className="mt-3 text-sm font-medium text-destructive">
              {result.error}
            </p>
          )}
        </section>
      </main>
    </>
  );
}
