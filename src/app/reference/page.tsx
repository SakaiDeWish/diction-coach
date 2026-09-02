"use client";

import * as React from "react";
import Link from "next/link";
import { RecordAndCalibrate } from "@/components/record-calibrate";
import {
  REFERENCE_INSTRUCTION,
  REFERENCE_MAX_SECONDS,
  REFERENCE_PARAGRAPH,
} from "@/lib/reference-paragraph";
import { saveReferenceRecording } from "@/lib/reference-storage";
import { todayKey } from "@/lib/date";

export default function ReferencePage() {
  const [finished, setFinished] = React.useState(false);

  if (finished) {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-2xl font-semibold">
          Paragraphe de référence enregistré
        </h1>
        <p className="max-w-sm text-muted-foreground">
          Il servira de point de comparaison dans un mois. Dès que tu en auras
          deux, tu pourras les faire écouter à l&apos;aveugle à un proche.
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

  return (
    <RecordAndCalibrate
      prompt={REFERENCE_PARAGRAPH}
      label="Paragraphe de référence"
      instruction={REFERENCE_INSTRUCTION}
      hint="Le texte ne change jamais : c'est ce qui rend les enregistrements comparables dans le temps."
      startLabel="Enregistrer le paragraphe"
      maxSeconds={REFERENCE_MAX_SECONDS}
      recordingPrefix="reference"
      withCalibration={false}
      onFinished={(result) => {
        if (result?.recordingId) {
          const date = todayKey();
          saveReferenceRecording({
            id: `reference-${date}`,
            date,
            recordingId: result.recordingId,
          });
        }
        setFinished(true);
      }}
    />
  );
}
