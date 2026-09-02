"use client";

import * as React from "react";
import Link from "next/link";
import { getRecording } from "@/lib/recording-storage";
import {
  getReferenceRecordings,
  saveComparison,
  type ReferenceRecording,
} from "@/lib/reference-storage";
import { todayKey } from "@/lib/date";

interface BlindPair {
  older: ReferenceRecording;
  newer: ReferenceRecording;
  /** Ordre de lecture tiré au sort : A et B ne révèlent pas l'ancienneté. */
  aIsOlder: boolean;
  urlA: string;
  urlB: string;
}

type Choice = "A" | "B" | "equal";

function formatDateLabel(key: string): string {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ComparaisonPage() {
  const [pair, setPair] = React.useState<BlindPair | null>(null);
  const [notEnough, setNotEnough] = React.useState(false);
  const [choice, setChoice] = React.useState<Choice | null>(null);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    let urlA: string | null = null;
    let urlB: string | null = null;

    const load = async () => {
      const references = getReferenceRecordings();
      if (references.length < 2) {
        setNotEnough(true);
        return;
      }
      const older = references[0];
      const newer = references[references.length - 1];
      const [blobOlder, blobNewer] = await Promise.all([
        getRecording(older.recordingId),
        getRecording(newer.recordingId),
      ]);
      if (!blobOlder || !blobNewer) {
        setNotEnough(true);
        return;
      }
      const aIsOlder = Math.random() < 0.5;
      urlA = URL.createObjectURL(aIsOlder ? blobOlder : blobNewer);
      urlB = URL.createObjectURL(aIsOlder ? blobNewer : blobOlder);
      setPair({ older, newer, aIsOlder, urlA, urlB });
    };

    void load();

    return () => {
      if (urlA) URL.revokeObjectURL(urlA);
      if (urlB) URL.revokeObjectURL(urlB);
    };
  }, []);

  const handleChoose = (value: Choice) => {
    if (!pair) return;
    setChoice(value);
    const winner =
      value === "equal"
        ? "equal"
        : (value === "A") === pair.aIsOlder
          ? "older"
          : "newer";
    saveComparison({
      id: `comparaison-${Date.now()}`,
      date: todayKey(),
      olderDate: pair.older.date,
      newerDate: pair.newer.date,
      winner,
    });
    setRevealed(true);
  };

  if (notEnough) {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-2xl font-semibold">
          Pas encore comparable
        </h1>
        <p className="max-w-sm text-muted-foreground">
          Il faut au moins deux enregistrements du paragraphe de référence,
          espacés d&apos;un mois, pour qu&apos;une comparaison ait du sens.
        </p>
        <Link
          href="/reference"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Enregistrer le paragraphe
        </Link>
      </main>
    );
  }

  if (!pair) return null;

  if (revealed && choice) {
    const winnerLabel =
      choice === "equal"
        ? "Aucune différence perçue"
        : (choice === "A") === pair.aIsOlder
          ? `Le plus ancien (${formatDateLabel(pair.older.date)})`
          : `Le plus récent (${formatDateLabel(pair.newer.date)})`;

    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Verdict enregistré
        </div>
        <p className="font-display text-xl font-semibold">{winnerLabel}</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Extrait A : {pair.aIsOlder ? "le plus ancien" : "le plus récent"}.
          Extrait B : {pair.aIsOlder ? "le plus récent" : "le plus ancien"}.
        </p>
        <Link
          href="/historique"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Voir l&apos;historique
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
        >
          Retour à l&apos;accueil
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-16">
      <div className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Comparaison à l&apos;aveugle
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Fais écouter les deux extraits à un proche, sans lui dire lequel est le
        plus récent, et demande-lui lequel est le plus facile à comprendre.
      </p>

      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
        <div className="text-sm font-semibold">Extrait A</div>
        <audio controls src={pair.urlA} className="mt-2 w-full">
          Ton navigateur ne peut pas lire cet enregistrement.
        </audio>
      </div>

      <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
        <div className="text-sm font-semibold">Extrait B</div>
        <audio controls src={pair.urlB} className="mt-2 w-full">
          Ton navigateur ne peut pas lire cet enregistrement.
        </audio>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => handleChoose("A")}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          A est plus facile à comprendre
        </button>
        <button
          onClick={() => handleChoose("B")}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          B est plus facile à comprendre
        </button>
        <button
          onClick={() => handleChoose("equal")}
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
        >
          Aucune différence
        </button>
      </div>
    </main>
  );
}
