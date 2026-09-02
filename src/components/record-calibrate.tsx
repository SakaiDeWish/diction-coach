"use client";

import * as React from "react";
import { getRecording, saveRecording } from "@/lib/recording-storage";
import { getSessionLogs } from "@/lib/session-storage";
import { todayKey } from "@/lib/date";

export interface CalibrationResult {
  predicted: number;
  after?: number;
  gap?: number;
  recordingId?: string;
}

type Phase =
  | "intro"
  | "prep"
  | "recording"
  | "predict"
  | "replay"
  | "gap"
  | "unavailable";

/**
 * Réécoute proposée environ une séance sur trois : le principe robuste de la
 * littérature est le délai avant le retour, pas sa rareté (docs/PROTOCOLE.md,
 * section 9).
 */
function shouldOfferReplay(): boolean {
  return getSessionLogs().length % 3 === 0;
}

function formatSeconds(total: number): string {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

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

/**
 * Enregistrement local puis boucle d'auto-évaluation calibrée : la note est
 * prédite avant toute réécoute, la réécoute n'est proposée qu'une séance sur
 * trois, et c'est l'écart qui constitue le signal de progrès
 * (docs/PROTOCOLE.md, section 6). Aucun audio ne quitte l'appareil.
 */
export function RecordAndCalibrate({
  prompt,
  label,
  hint,
  startLabel = "Démarrer l'enregistrement",
  prepSeconds = 0,
  maxSeconds,
  recordingPrefix,
  onPredicted,
  onFinished,
}: {
  prompt: string;
  label: string;
  hint?: string;
  startLabel?: string;
  prepSeconds?: number;
  maxSeconds: number;
  recordingPrefix: string;
  /** Appelé dès la note prédite validée, pour persister sans attendre la fin. */
  onPredicted?: (result: CalibrationResult) => void;
  onFinished: (result: CalibrationResult | null) => void;
}) {
  const [phase, setPhase] = React.useState<Phase>("intro");
  const [elapsed, setElapsed] = React.useState(0);
  const [prepLeft, setPrepLeft] = React.useState(prepSeconds);
  const [predicted, setPredicted] = React.useState<number | null>(null);
  const [afterNote, setAfterNote] = React.useState<number | null>(null);
  const [recordingId, setRecordingId] = React.useState<string | undefined>();
  const [result, setResult] = React.useState<CalibrationResult | null>(null);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);

  const recorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const streamRef = React.useRef<MediaStream | null>(null);

  const beginRecording = React.useCallback(() => {
    const stream = streamRef.current;
    if (!stream) {
      setPhase("unavailable");
      return;
    }
    const recorder = new MediaRecorder(stream);
    recorderRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = async () => {
      stream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(chunksRef.current, {
        type: recorder.mimeType || "audio/webm",
      });
      const id = `${recordingPrefix}-${todayKey()}-${Date.now()}`;
      const stored = await saveRecording(id, blob);
      setRecordingId(stored ? id : undefined);
      setPhase("predict");
    };

    recorder.start();
    setElapsed(0);
    setPhase("recording");
  }, [recordingPrefix]);

  // Compte à rebours de préparation.
  React.useEffect(() => {
    if (phase !== "prep") return;
    const timer = window.setInterval(() => {
      setPrepLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          beginRecording();
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, beginRecording]);

  // Chronomètre d'enregistrement, arrêt automatique à la durée cible haute.
  React.useEffect(() => {
    if (phase !== "recording") return;
    const timer = window.setInterval(() => {
      setElapsed((current) => {
        const next = current + 1;
        if (next >= maxSeconds) {
          recorderRef.current?.stop();
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, maxSeconds]);

  React.useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const handleStart = async () => {
    try {
      // La permission est demandée sur le geste utilisateur, avant tout
      // éventuel compte à rebours de préparation.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      if (prepSeconds > 0) {
        setPrepLeft(prepSeconds);
        setPhase("prep");
        return;
      }
      beginRecording();
    } catch {
      // Micro refusé ou indisponible : l'étape est simplement sautée.
      setPhase("unavailable");
    }
  };

  const handlePredict = async () => {
    if (predicted === null) return;
    const data: CalibrationResult = { predicted, recordingId };
    setResult(data);
    onPredicted?.(data);

    if (recordingId && shouldOfferReplay()) {
      const blob = await getRecording(recordingId);
      if (blob) {
        setAudioUrl(URL.createObjectURL(blob));
        setPhase("replay");
        return;
      }
    }
    onFinished(data);
  };

  const handleAfterNote = () => {
    if (afterNote === null || !result) return;
    const gap = Math.abs(afterNote - result.predicted);
    const data: CalibrationResult = { ...result, after: afterNote, gap };
    setResult(data);
    setPhase("gap");
  };

  if (phase === "unavailable") {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-16 text-center">
        <h1 className="font-display text-xl font-semibold">
          Micro indisponible
        </h1>
        <p className="text-sm text-muted-foreground">
          Pas de souci, cette étape est facultative. Le reste de ta séance est
          déjà enregistré.
        </p>
        <button
          onClick={() => onFinished(null)}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Continuer
        </button>
      </main>
    );
  }

  if (phase === "prep") {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-16 text-center">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Préparation
        </div>
        <div className="font-display text-6xl font-light tabular-nums">
          {prepLeft}
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 text-left shadow-sm">
          <p className="text-lg leading-relaxed">{prompt}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          L&apos;enregistrement démarre tout seul à la fin du compte à rebours.
        </p>
      </main>
    );
  }

  if (phase === "predict") {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-16">
        <div className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Avant de réécouter
        </div>
        <p className="text-center text-sm text-muted-foreground">
          À quel point penses-tu avoir été clair ? Note maintenant, sans
          réécouter : c&apos;est cette prédiction qui entraîne ta calibration.
        </p>
        <RatingButtons value={predicted} onChange={setPredicted} />
        <button
          onClick={handlePredict}
          disabled={predicted === null}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          Valider ma note
        </button>
      </main>
    );
  }

  if (phase === "replay") {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-16">
        <div className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Réécoute
        </div>
        {audioUrl && (
          <audio controls src={audioUrl} className="w-full">
            Ton navigateur ne peut pas lire cet enregistrement.
          </audio>
        )}
        <p className="text-center text-sm text-muted-foreground">
          Maintenant que tu t&apos;es entendu, note à nouveau ta clarté.
        </p>
        <RatingButtons value={afterNote} onChange={setAfterNote} />
        <button
          onClick={handleAfterNote}
          disabled={afterNote === null}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          Valider
        </button>
      </main>
    );
  }

  if (phase === "gap" && result) {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Écart de calibration
        </div>
        <div className="font-display text-5xl font-light tabular-nums">
          {result.gap}
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          Tu avais prédit {result.predicted}/5, tu as noté {result.after}/5
          après écoute. C&apos;est la réduction de cet écart dans le temps qui
          mesure ta progression, pas la note elle-même.
        </p>
        <button
          onClick={() => onFinished(result)}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Continuer
        </button>
      </main>
    );
  }

  if (phase === "recording") {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-16 text-center">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Enregistrement en cours
        </div>
        <div className="font-display text-5xl font-light tabular-nums">
          {formatSeconds(elapsed)}
        </div>
        <p className="text-sm text-muted-foreground">{prompt}</p>
        <p className="text-sm font-semibold text-primary">
          Sur-articule chaque mot.
        </p>
        <button
          onClick={() => recorderRef.current?.stop()}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Terminer l&apos;enregistrement
        </button>
        <p className="text-xs text-muted-foreground">
          Arrêt automatique à {formatSeconds(maxSeconds)}. Ton audio reste sur
          cet appareil, il n&apos;est envoyé nulle part.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-16 text-center">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="rounded-3xl border border-border bg-card p-6 text-left shadow-sm">
        <p className="text-lg leading-relaxed">{prompt}</p>
        <p className="mt-4 text-sm font-semibold text-primary">
          Sur-articule chaque mot.
        </p>
        {hint && <p className="mt-2 text-sm text-muted-foreground">{hint}</p>}
      </div>
      <button
        onClick={handleStart}
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        {startLabel}
      </button>
      <button
        onClick={() => onFinished(null)}
        className="text-sm font-medium text-muted-foreground underline-offset-4 hover:underline"
      >
        Passer cette étape
      </button>
    </main>
  );
}
