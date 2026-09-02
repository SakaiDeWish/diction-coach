"use client";

import * as React from "react";
import Link from "next/link";
import { RecordAndCalibrate } from "@/components/record-calibrate";
import {
  INTERVIEW_ANSWER_SECONDS,
  INTERVIEW_PREP_SECONDS,
  pickInterviewQuestion,
} from "@/lib/interview-questions";
import {
  saveInterviewSession,
  type InterviewSession,
} from "@/lib/interview-storage";
import { todayKey } from "@/lib/date";

export default function EntretienPage() {
  const [question] = React.useState(() => pickInterviewQuestion());
  const [finished, setFinished] = React.useState(false);

  const persist = (
    predicted: number,
    after?: number,
    gap?: number,
    recordingId?: string,
  ) => {
    const session: InterviewSession = {
      id: `entretien-${todayKey()}`,
      date: todayKey(),
      question,
      predicted,
      after,
      gap,
      recordingId,
    };
    saveInterviewSession(session);
  };

  if (finished) {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-2xl font-semibold">
          Séance en conditions terminée
        </h1>
        <p className="max-w-sm text-muted-foreground">
          Tu viens de t&apos;entraîner dans les conditions où tu en as besoin.
          Elle ne remplace pas ta séance quotidienne.
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

  return (
    <RecordAndCalibrate
      prompt={question}
      label="Séance en conditions"
      hint={`${INTERVIEW_PREP_SECONDS} secondes de préparation, puis ${INTERVIEW_ANSWER_SECONDS} secondes de réponse, debout.`}
      startLabel="Lancer la préparation"
      prepSeconds={INTERVIEW_PREP_SECONDS}
      maxSeconds={INTERVIEW_ANSWER_SECONDS}
      recordingPrefix="entretien"
      onPredicted={(result) =>
        persist(result.predicted, undefined, undefined, result.recordingId)
      }
      onFinished={(result) => {
        if (result) {
          persist(
            result.predicted,
            result.after,
            result.gap,
            result.recordingId,
          );
        }
        setFinished(true);
      }}
    />
  );
}
