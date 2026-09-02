"use client";

import * as React from "react";
import {
  pickTransferPrompt,
  TRANSFER_MAX_SECONDS,
  TRANSFER_MIN_SECONDS,
} from "@/lib/transfer-prompts";
import { getRecording, saveRecording } from "@/lib/recording-storage";
import {
  upsertCalibration,
  type CalibrationData,
} from "@/lib/journal-storage";
import { getSessionLogs } from "@/lib/session-storage";
import { todayKey } from "@/lib/date";

type Phase = "intro" | "recording" | "predict" | "replay" | "gap" | "unavailable";

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

export function TransferAndCalibration({
  onFinished,
}: {
  onFinished: (calibration: CalibrationData | null) => void;
}) {
  const [phase, setPhase] = React.useState<Phase>("intro");
  const [prompt] = React.useState(() => pickTransferPrompt());
  const [elapsed, setElapsed] = React.useState(0);
  const [predicted, setPredicted] = React.useState<number | null>(null);
  const [afterNote, setAfterNote] = React.useState<number | null>(null);
  const [calibration, setCalibration] = React.useState<CalibrationData | null>(
    null,
  );
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);

  const recorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const streamRef = React.useRef<MediaStream | null>(null);

  // Chronomètre de l'enregistrement, arrêt automatique à la durée cible haute.
  React.useEffect(() => {
    if (phase !== "recording") return;
    const timer = window.setInterval(() => {
      setElapsed((current) => {
        const next = current + 1;
        if (next >= TRANSFER_MAX_SECONDS) {
          recorderRef.current?.stop();
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  React.useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
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
        const id = `${todayKey()}-${Date.now()}`;
        const stored = await saveRecording(id, blob);
        setCalibration({ predicted: 0, recordingId: stored ? id : undefined });
        setPhase("predict");
      };

      recorder.start();
      setElapsed(0);
      setPhase("recording");
    } catch {
      // Micro refusé ou indisponible : l'étape est simplement sautée.
      setPhase("unavailable");
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
  };

  const handlePredict = async () => {
    if (predicted === null) return;
    const data: CalibrationData = {
      predicted,
      recordingId: calibration?.recordingId,
    };
    upsertCalibration(todayKey(), data);
    setCalibration(data);

    if (data.recordingId && shouldOfferReplay()) {
      const blob = await getRecording(data.recordingId);
      if (blob) {
        setAudioUrl(URL.createObjectURL(blob));
        setPhase("replay");
        return;
      }
    }
    onFinished(data);
  };

  const handleAfterNote = () => {
    if (afterNote === null || !calibration) return;
    const gap = Math.abs(afterNote - calibration.predicted);
    const data: CalibrationData = { ...calibration, after: afterNote, gap };
    upsertCalibration(todayKey(), data);
    setCalibration(data);
    setPhase("gap");
  };

  if (phase === "unavailable") {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-16 text-center">
        <h1 className="font-display text-xl font-semibold">
          Micro indisponible
        </h1>
        <p className="text-sm text-muted-foreground">
          Pas de souci, l&apos;étape de parole spontanée est facultative. Le
          reste de ta séance est déjà enregistré.
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

  if (phase === "gap" && calibration) {
    return (
      <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Écart de calibration
        </div>
        <div className="font-display text-5xl font-light tabular-nums">
          {calibration.gap}
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          Tu avais prédit {calibration.predicted}/5, tu as noté{" "}
          {calibration.after}/5 après écoute. C&apos;est la réduction de cet
          écart dans le temps qui mesure ta progression, pas la note elle-même.
        </p>
        <button
          onClick={() => onFinished(calibration)}
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
          onClick={stopRecording}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Terminer l&apos;enregistrement
        </button>
        <p className="text-xs text-muted-foreground">
          Arrêt automatique à {formatSeconds(TRANSFER_MAX_SECONDS)}. Ton audio
          reste sur cet appareil, il n&apos;est envoyé nulle part.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-16 text-center">
      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Transfert
      </div>
      <div className="rounded-3xl border border-border bg-card p-6 text-left shadow-sm">
        <p className="text-lg leading-relaxed">{prompt}</p>
        <p className="mt-4 text-sm font-semibold text-primary">
          Sur-articule chaque mot.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Parle librement pendant {TRANSFER_MIN_SECONDS} à{" "}
          {TRANSFER_MAX_SECONDS} secondes.
        </p>
      </div>
      <button
        onClick={startRecording}
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
      >
        Démarrer l&apos;enregistrement
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
