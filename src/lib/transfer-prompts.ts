/**
 * Consignes de parole spontanée pour l'étape de transfert (docs/PROTOCOLE.md,
 * section 13, étape 5). Le but est de parler librement 60 à 90 secondes en
 * appliquant la sur-articulation, pas de réciter un texte.
 */
export const TRANSFER_PROMPTS: string[] = [
  "Raconte ce que tu as fait hier, du réveil au coucher.",
  "Explique à quelqu'un qui n'y connaît rien ce qu'est une classe préparatoire.",
  "Décris le trajet que tu fais le plus souvent, rue par rue.",
  "Explique pourquoi tu veux intégrer une école d'ingénieurs.",
  "Raconte un film ou une série que tu as vus récemment.",
  "Explique comment fonctionne quelque chose que tu maîtrises bien.",
  "Décris ta chambre à quelqu'un qui ne l'a jamais vue.",
  "Raconte le dernier moment où tu as été vraiment content de toi.",
];

/** Durée cible de l'étape de transfert, en secondes. */
export const TRANSFER_MIN_SECONDS = 60;
export const TRANSFER_MAX_SECONDS = 90;

export function pickTransferPrompt(): string {
  return TRANSFER_PROMPTS[Math.floor(Math.random() * TRANSFER_PROMPTS.length)];
}
