"use client";

import * as React from "react";
import {
  pickTransferPrompt,
  TRANSFER_MAX_SECONDS,
  TRANSFER_MIN_SECONDS,
} from "@/lib/transfer-prompts";
import {
  RecordAndCalibrate,
  type CalibrationResult,
} from "@/components/record-calibrate";
import {
  upsertCalibration,
  type CalibrationData,
} from "@/lib/journal-storage";
import { todayKey } from "@/lib/date";

/**
 * Étape de transfert en fin de séance quotidienne : parole spontanée
 * enregistrée, puis boucle d'auto-évaluation calibrée. La calibration est
 * persistée dès qu'elle est connue, même si l'utilisateur saute le journal.
 */
export function TransferAndCalibration({
  onFinished,
}: {
  onFinished: (calibration: CalibrationData | null) => void;
}) {
  const [prompt] = React.useState(() => pickTransferPrompt());

  const toCalibrationData = (result: CalibrationResult): CalibrationData => ({
    predicted: result.predicted,
    after: result.after,
    gap: result.gap,
    recordingId: result.recordingId,
  });

  const handleFinished = (result: CalibrationResult | null) => {
    if (!result) {
      onFinished(null);
      return;
    }
    const data = toCalibrationData(result);
    upsertCalibration(todayKey(), data);
    onFinished(data);
  };

  return (
    <RecordAndCalibrate
      prompt={prompt}
      label="Transfert"
      hint={`Parle librement pendant ${TRANSFER_MIN_SECONDS} à ${TRANSFER_MAX_SECONDS} secondes.`}
      maxSeconds={TRANSFER_MAX_SECONDS}
      recordingPrefix="transfert"
      onPredicted={(result) =>
        upsertCalibration(todayKey(), toCalibrationData(result))
      }
      onFinished={handleFinished}
    />
  );
}
