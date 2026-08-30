"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import {
  getJournalEntriesSortedDesc,
  type JournalEntry,
} from "@/lib/journal-storage";

function formatDateLabel(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

const CRITERIA_LABELS: Record<string, string> = {
  debit: "Débit",
  articulation: "Articulation",
  fatigue: "Fatigue",
};

function EntryCard({ entry }: { entry: JournalEntry }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 text-left shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {formatDateLabel(entry.date)}
        </span>
        {entry.mode === "simple" ? (
          <span className="font-display tabular-nums text-lg font-medium text-accent">
            {entry.note}/5
          </span>
        ) : null}
      </div>

      {entry.mode === "detailed" && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {(Object.keys(entry.criteria) as (keyof typeof entry.criteria)[]).map(
            (key) => (
              <span key={key} className="text-sm text-muted-foreground">
                {CRITERIA_LABELS[key]}{" "}
                <span className="font-display tabular-nums font-medium text-accent">
                  {entry.criteria[key]}/5
                </span>
              </span>
            ),
          )}
        </div>
      )}

      {entry.comment && (
        <p className="mt-2 text-sm leading-relaxed">{entry.comment}</p>
      )}
    </div>
  );
}

export default function HistoriquePage() {
  const [entries, setEntries] = React.useState<JournalEntry[] | null>(null);

  React.useEffect(() => {
    // Lecture ponctuelle du localStorage au montage : API navigateur, pas
    // calculable pendant le rendu.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(getJournalEntriesSortedDesc());
  }, []);

  return (
    <>
      <AnimatedNavFramer />
      <main className="mx-auto flex min-h-svh max-w-md flex-col gap-6 px-6 py-24">
        <h1 className="font-display text-2xl font-semibold">Historique</h1>

        {entries && entries.length === 0 && (
          <p className="text-muted-foreground">
            Aucune entrée de journal pour l&apos;instant. Elles apparaîtront
            ici après une séance, si tu choisis de noter ton ressenti.
          </p>
        )}

        {entries && entries.length === 0 && (
          <Link
            href="/seance"
            className="w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Démarrer une séance
          </Link>
        )}

        <div className="flex flex-col gap-3">
          {entries?.map((entry) => (
            <EntryCard key={entry.date} entry={entry} />
          ))}
        </div>
      </main>
    </>
  );
}
