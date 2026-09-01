"use client";

import * as React from "react";
import Link from "next/link";
import { ARTICULATION_WARNING, CATEGORY_LABELS, type Exercise } from "@/lib/exercises";
import { pickDailyExercises, resolveExercises } from "@/lib/pick-exercises";
import {
  addSessionLog,
  getPendingSelection,
  getSessionLogForDate,
  getSessionLogs,
  setPendingSelection,
} from "@/lib/session-storage";
import { addJournalEntry, type JournalCriteria } from "@/lib/journal-storage";
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

type Step = "exercises" | "journal" | "done";

const DETAILED_CRITERIA: { key: keyof JournalCriteria; label: string }[] = [
  { key: "debit", label: "Débit" },
  { key: "articulation", label: "Articulation" },
  { key: "fatigue", label: "Fatigue" },
];

function RatingButtons({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={`h-11 w-11 rounded-full text-sm font-semibold transition-colors ${
            value === option
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground border border-border"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function JournalStep({ onDone }: { onDone: () => void }) {
  const [detailedMode, setDetailedMode] = React.useState(false);
  const [note, setNote] = React.useState<number | null>(null);
  const [criteria, setCriteria] = React.useState<Partial<JournalCriteria>>({});
  const [comment, setComment] = React.useState("");

  const detailedComplete =
    typeof criteria.debit === "number" &&
    typeof criteria.articulation === "number" &&
    typeof criteria.fatigue === "number";

  const canSave = detailedMode ? detailedComplete : note !== null;

  const handleSave = () => {
    const trimmedComment = comment.trim() || undefined;
    if (detailedMode && detailedComplete) {
      addJournalEntry({
        date: todayKey(),
        mode: "detailed",
        criteria: criteria as JournalCriteria,
        comment: trimmedComment,
      });
    } else {
      addJournalEntry({
        date: todayKey(),
        mode: "simple",
        note: note ?? 3,
        comment: trimmedComment,
      });
    }
    onDone();
  };

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-16">
      <div className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Comment s&apos;est passée la séance ?
      </div>

      {!detailedMode ? (
        <RatingButtons value={note} onChange={setNote} />
      ) : (
        <div className="flex flex-col gap-4">
          {DETAILED_CRITERIA.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                {label}
              </span>
              <RatingButtons
                value={criteria[key] ?? null}
                onChange={(value) =>
                  setCriteria((current) => ({ ...current, [key]: value }))
                }
              />
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setDetailedMode((current) => !current)}
        className="text-xs font-medium text-accent underline-offset-4 hover:underline"
      >
        {detailedMode
          ? "Revenir à la note simple"
          : "Noter chaque critère séparément"}
      </button>

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Une remarque à noter ? (facultatif)"
        rows={3}
        className="rounded-2xl border border-border bg-card p-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <button
        onClick={handleSave}
        disabled={!canSave}
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
      >
        Enregistrer
      </button>
      <button
        onClick={onDone}
        className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
      >
        Passer, sans journaliser
      </button>
    </main>
  );
}

function repSpeedHint(repIndex: number, reps: number): string {
  const ratio = repIndex / reps;
  if (ratio <= 0.4) return "Pose chaque son distinctement.";
  if (ratio <= 0.8) return "Garde le même rythme.";
  return "Accélère, sans perdre un son.";
}

export default function SeancePage() {
  const [init, setInit] = React.useState<SeanceInit | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [repIndex, setRepIndex] = React.useState(1);
  const [step, setStep] = React.useState<Step>("exercises");

  React.useEffect(() => {
    // Tirage des exercices + lecture/écriture du localStorage au montage :
    // dépend d'un aléatoire et d'une API navigateur, donc pas calculable
    // pendant le rendu sans effet.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInit(initSeance());
  }, []);

  if (!init) return null;

  const { exercises, alreadyDoneToday } = init;

  if (step === "journal") {
    return <JournalStep onDone={() => setStep("done")} />;
  }

  if (step === "done") {
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
        <Link
          href="/historique"
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
        >
          Voir l&apos;historique
        </Link>
      </main>
    );
  }

  const exercise = exercises[currentIndex];
  const isLast = currentIndex === exercises.length - 1;
  const blockReps = exercise?.reps;
  const blockInProgress = typeof blockReps === "number" && repIndex < blockReps;

  const advanceToNextExercise = () => {
    setRepIndex(1);
    if (isLast) {
      addSessionLog({
        date: todayKey(),
        exerciseIds: exercises.map((item) => item.id),
      });
      setStep("journal");
      return;
    }
    setCurrentIndex((index) => index + 1);
  };

  const handlePrimaryClick = () => {
    if (blockInProgress) {
      setRepIndex((index) => index + 1);
      return;
    }
    advanceToNextExercise();
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
          <p className="mt-4 text-sm font-semibold text-primary">
            {exercise.instruction}
          </p>

          {typeof blockReps === "number" && (
            <div className="mt-4 border-t border-border pt-4">
              <div className="font-display tabular-nums text-sm font-medium text-accent">
                Répétition {repIndex} / {blockReps}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {repSpeedHint(repIndex, blockReps)}
              </p>
            </div>
          )}
        </div>
      )}

      <button
        onClick={handlePrimaryClick}
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        {blockInProgress
          ? "Répétition suivante"
          : isLast
            ? "Terminer la séance"
            : "Exercice suivant"}
      </button>

      {blockInProgress && (
        <button
          onClick={advanceToNextExercise}
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
        >
          Passer le reste des répétitions
        </button>
      )}

      <p className="text-center text-xs text-muted-foreground">
        {ARTICULATION_WARNING}
      </p>
    </main>
  );
}
