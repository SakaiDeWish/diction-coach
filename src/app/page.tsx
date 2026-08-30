"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import { getSessionLogForDate, getSessionLogs } from "@/lib/session-storage";
import { computeStreak } from "@/lib/streak";
import { todayKey } from "@/lib/date";

interface HomeStatus {
  hasAnyHistory: boolean;
  doneToday: boolean;
  streak: number;
}

function StreakCard({ streak }: { streak: number }) {
  return (
    <div className="w-full max-w-xs rounded-3xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-md">
      <div className="font-display text-5xl font-light tabular-nums">
        {streak}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {streak <= 1 ? "jour consécutif" : "jours consécutifs"}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [status, setStatus] = React.useState<HomeStatus | null>(null);

  React.useEffect(() => {
    // Lecture ponctuelle du localStorage au montage : ce n'est pas un état
    // dérivable pendant le rendu (accès à une API navigateur), donc pas
    // d'alternative sans effet ici.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus(() => {
      const logs = getSessionLogs();
      return {
        hasAnyHistory: logs.length > 0,
        doneToday: Boolean(getSessionLogForDate(todayKey())),
        streak: computeStreak(logs),
      };
    });
  }, []);

  return (
    <>
      <AnimatedNavFramer />
      <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="font-display text-4xl font-semibold">Diction Coach</h1>

        {status && status.hasAnyHistory && <StreakCard streak={status.streak} />}

        {!status ? null : !status.hasAnyHistory ? (
          <p className="max-w-sm text-muted-foreground">
            Bienvenue. Fais ta première séance : un virelangue, une lecture à
            voix haute, un exercice de respiration. Cinq minutes suffisent.
          </p>
        ) : status.doneToday ? (
          <p className="max-w-sm text-muted-foreground">
            Séance faite aujourd&apos;hui. Reviens demain, ou refais-en une si
            tu veux.
          </p>
        ) : (
          <p className="max-w-sm text-muted-foreground">
            Aujourd&apos;hui : un virelangue, une lecture à voix haute, un
            exercice de respiration.
          </p>
        )}

        {status && (
          <Link
            href="/seance"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            {status.doneToday
              ? "Refaire une séance"
              : "Démarrer la séance du jour"}
          </Link>
        )}
      </main>
    </>
  );
}
