"use client";

import * as React from "react";
import Link from "next/link";
import { CATEGORY_LABELS, type Exercise } from "@/lib/exercises";
import { pickDailyExercises, resolveExercises } from "@/lib/pick-exercises";
import {
  addSessionLog,
  getPendingSelection,
  getSessionLogForDate,
  getSessionLogs,
  setPendingSelection,
} from "@/lib/session-storage";
import { todayKey } from "@/lib/date";

interface SeanceInit {
  exercises: Exercise[];
  alreadyDoneToday: boolean;
}

function initSeance(): SeanceInit {
  const today = todayKey();
  const alreadyDoneToday = Boolean(getSessionLogForDate(today));

  const pendingIds = getPendingSelection(today);
  if (pendingIds && pendingIds.length > 0) {
    return { exercises: resolveExercises(pendingIds), alreadyDoneToday };
  }

  const picked = pickDailyExercises(getSessionLogs());
  setPendingSelection(
    today,
    picked.map((exercise) => exercise.id),
  );
  return { exercises: picked, alreadyDoneToday };
}

export default function SeancePage() {
  const [init, setInit] = React.useState<SeanceInit | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    // Tirage des exercices + lecture/écriture du localStorage au montage :
    // dépend d'un aléatoire et d'une API navigateur, donc pas calculable
    // pendant le rendu sans effet.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInit(initSeance());
  }, []);

  if (!init) return null;

  const { exercises, alreadyDoneToday } = init;

  if (finished) {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-2xl font-semibold">
          Séance terminée
        </h1>
        <p className="text-muted-foreground">
          Les {exercises.length} exercices sont faits pour aujourd&apos;hui.
        </p>
        <Link
          href="/"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Retour à l&apos;accueil
        </Link>
      </main>
    );
  }

  const exercise = exercises[currentIndex];
  const isLast = currentIndex === exercises.length - 1;

  const handleNext = () => {
    if (isLast) {
      addSessionLog({
        date: todayKey(),
        exerciseIds: exercises.map((item) => item.id),
      });
      setFinished(true);
      return;
    }
    setCurrentIndex((index) => index + 1);
  };

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-16">
      {alreadyDoneToday && (
        <p className="rounded-full bg-secondary px-4 py-2 text-center text-xs font-medium text-secondary-foreground">
          Séance déjà faite aujourd&apos;hui — tu peux la refaire si tu veux.
        </p>
      )}

      <div className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Exercice {currentIndex + 1} / {exercises.length}
      </div>

      {exercise && (
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">
            {CATEGORY_LABELS[exercise.category]}
          </div>
          <h1 className="font-display mt-2 text-xl font-semibold">
            {exercise.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed">{exercise.content}</p>
        </div>
      )}

      <button
        onClick={handleNext}
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        {isLast ? "Terminer la séance" : "Exercice suivant"}
      </button>
    </main>
  );
}
