"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import { getSessionLogForDate, getSessionLogs } from "@/lib/session-storage";
import { computeStreakInfo, countSessionsInLastDays } from "@/lib/streak";
import { getContextTrigger, setContextTrigger } from "@/lib/trigger-storage";
import { isInterviewSessionDue } from "@/lib/interview-storage";
import { todayKey } from "@/lib/date";

interface HomeStatus {
  hasAnyHistory: boolean;
  doneToday: boolean;
  streak: number;
  graceInUse: boolean;
  sessions30: number;
  trigger: string | null;
  interviewDue: boolean;
}

function StreakCard({
  streak,
  graceInUse,
  sessions30,
}: {
  streak: number;
  graceInUse: boolean;
  sessions30: number;
}) {
  return (
    <div className="w-full max-w-xs rounded-3xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-md">
      <div className="font-display text-5xl font-light tabular-nums">
        {streak}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {streak <= 1 ? "jour consécutif" : "jours consécutifs"}
      </div>
      {graceInUse && (
        <div className="mt-3 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          Jour de grâce en cours, ta série tient bon
        </div>
      )}
      <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
        {sessions30} séance{sessions30 !== 1 ? "s" : ""} sur les 30 derniers jours
      </div>
    </div>
  );
}

function TriggerPrompt({
  trigger,
  firstAsk,
  onSave,
}: {
  trigger: string;
  firstAsk: boolean;
  onSave: (value: string) => void;
}) {
  const [editing, setEditing] = React.useState(firstAsk);
  const [value, setValue] = React.useState(trigger);

  if (!editing) {
    return trigger ? (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="text-xs text-muted-foreground underline-offset-4 hover:underline"
      >
        Rappel : {trigger}
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="text-xs text-muted-foreground underline-offset-4 hover:underline"
      >
        Ajouter un déclencheur pour t&apos;entraîner
      </button>
    );
  }

  const handleSave = () => {
    onSave(value.trim());
    setEditing(false);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2 rounded-2xl border border-border bg-card p-4 text-left">
      <span className="text-xs font-medium text-muted-foreground">
        À quel moment veux-tu t&apos;entraîner ? (ex : après le petit-déjeuner)
      </span>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Après le petit-déjeuner"
        className="rounded-full border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
        >
          Enregistrer
        </button>
        <button
          type="button"
          onClick={() => {
            onSave(value.trim());
            setEditing(false);
          }}
          className="text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
        >
          Passer
        </button>
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
      const { streak, graceInUse } = computeStreakInfo(logs);
      return {
        hasAnyHistory: logs.length > 0,
        doneToday: Boolean(getSessionLogForDate(todayKey())),
        streak,
        graceInUse,
        sessions30: countSessionsInLastDays(logs),
        trigger: getContextTrigger(),
        interviewDue: isInterviewSessionDue(),
      };
    });
  }, []);

  const handleSaveTrigger = (value: string) => {
    setContextTrigger(value);
    setStatus((current) => (current ? { ...current, trigger: value } : current));
  };

  return (
    <>
      <AnimatedNavFramer />
      <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="font-display text-4xl font-semibold">Diction Coach</h1>

        {status && status.hasAnyHistory && (
          <StreakCard
            streak={status.streak}
            graceInUse={status.graceInUse}
            sessions30={status.sessions30}
          />
        )}

        {!status ? null : !status.hasAnyHistory ? (
          <p className="max-w-sm text-muted-foreground">
            Bienvenue. Fais ta première séance : échauffement, virelangue,
            lecture à voix haute, projection vocale. Dix minutes suffisent.
          </p>
        ) : status.doneToday ? (
          <p className="max-w-sm text-muted-foreground">
            Séance faite aujourd&apos;hui. Reviens demain, ou refais-en une si
            tu veux.
          </p>
        ) : (
          <p className="max-w-sm text-muted-foreground">
            Aujourd&apos;hui : échauffement, virelangue, lecture à voix haute,
            projection vocale.
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

        {status?.interviewDue && (
          <Link
            href="/entretien"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground"
          >
            Séance en conditions d&apos;entretien
          </Link>
        )}

        {status && (
          <TriggerPrompt
            trigger={status.trigger ?? ""}
            firstAsk={status.trigger === null}
            onSave={handleSaveTrigger}
          />
        )}
      </main>
    </>
  );
}
