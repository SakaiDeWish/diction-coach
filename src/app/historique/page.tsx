"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import {
  getJournalEntriesSortedDesc,
  type JournalEntry,
} from "@/lib/journal-storage";
import {
  getInterviewSessionsSortedDesc,
  type InterviewSession,
} from "@/lib/interview-storage";

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

      {entry.calibration && typeof entry.calibration.gap === "number" && (
        <div className="mt-2 text-sm text-muted-foreground">
          Écart de calibration{" "}
          <span className="font-display tabular-nums font-medium text-accent">
            {entry.calibration.gap}
          </span>{" "}
          (prédit {entry.calibration.predicted}/5, après écoute{" "}
          {entry.calibration.after}/5)
        </div>
      )}

      {entry.comment && (
        <p className="mt-2 text-sm leading-relaxed">{entry.comment}</p>
      )}
    </div>
  );
}

function InterviewCard({ session }: { session: InterviewSession }) {
  return (
    <div className="rounded-3xl border border-accent/40 bg-card p-5 text-left shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          En conditions d&apos;entretien
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {formatDateLabel(session.date)}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed">{session.question}</p>
      <div className="mt-2 text-sm text-muted-foreground">
        Prédit{" "}
        <span className="font-display tabular-nums font-medium text-accent">
          {session.predicted}/5
        </span>
        {typeof session.gap === "number" && (
          <>
            , après écoute{" "}
            <span className="font-display tabular-nums font-medium text-accent">
              {session.after}/5
            </span>{" "}
            (écart {session.gap})
          </>
        )}
      </div>
    </div>
  );
}

/** Moyenne des écarts de calibration, du plus ancien au plus récent. */
function CalibrationTrend({ entries }: { entries: JournalEntry[] }) {
  const gaps = [...entries]
    .reverse()
    .map((entry) => entry.calibration?.gap)
    .filter((gap): gap is number => typeof gap === "number");

  if (gaps.length < 2) return null;

  const half = Math.floor(gaps.length / 2);
  const average = (values: number[]) =>
    values.reduce((total, value) => total + value, 0) / values.length;
  const older = average(gaps.slice(0, half));
  const recent = average(gaps.slice(half));

  return (
    <div className="rounded-3xl border border-border bg-card/70 p-5 text-left shadow-sm backdrop-blur-md">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Calibration
      </div>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="font-display tabular-nums text-3xl font-light">
          {recent.toFixed(1)}
        </span>
        <span className="text-sm text-muted-foreground">
          écart moyen récent, contre {older.toFixed(1)} avant
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Plus cet écart diminue, mieux tu perçois ta propre clarté. Mesuré sur{" "}
        {gaps.length} réécoutes.
      </p>
    </div>
  );
}

interface HistoryData {
  entries: JournalEntry[];
  interviews: InterviewSession[];
}

export default function HistoriquePage() {
  const [data, setData] = React.useState<HistoryData | null>(null);
  const entries = data?.entries ?? null;

  React.useEffect(() => {
    // Lecture ponctuelle du localStorage au montage : API navigateur, pas
    // calculable pendant le rendu.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({
      entries: getJournalEntriesSortedDesc(),
      interviews: getInterviewSessionsSortedDesc(),
    });
  }, []);

  return (
    <>
      <AnimatedNavFramer />
      <main className="mx-auto flex min-h-svh max-w-md flex-col gap-6 px-6 py-24">
        <h1 className="font-display text-2xl font-semibold">Historique</h1>

        {data && data.entries.length === 0 && data.interviews.length === 0 && (
          <>
            <p className="text-muted-foreground">
              Aucune entrée de journal pour l&apos;instant. Elles apparaîtront
              ici après une séance, si tu choisis de noter ton ressenti.
            </p>
            <Link
              href="/seance"
              className="w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Démarrer une séance
            </Link>
          </>
        )}

        {entries && entries.length > 0 && (
          <CalibrationTrend entries={entries} />
        )}

        {data && data.interviews.length > 0 && (
          <div className="flex flex-col gap-3">
            {data.interviews.map((session) => (
              <InterviewCard key={session.id} session={session} />
            ))}
          </div>
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
