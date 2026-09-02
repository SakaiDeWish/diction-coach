/**
 * Questions type d'entretien pour la séance « en conditions »
 * (docs/PROTOCOLE.md, section 11) : s'entraîner dans des conditions proches de
 * la cible réelle, ici les entretiens d'admission.
 */
export const INTERVIEW_QUESTIONS: string[] = [
  "Présente-toi en deux minutes.",
  "Pourquoi veux-tu intégrer cette école en particulier ?",
  "Qu'est-ce que tu as retenu de tes deux années de prépa ?",
  "Parle-moi d'un projet personnel dont tu es fier, et de ce qu'il t'a appris.",
  "Raconte une situation où tu as échoué, et ce que tu en as tiré.",
  "Où te vois-tu dans cinq ans, et pourquoi ce chemin ?",
  "Qu'est-ce qui t'intéresse concrètement dans l'intelligence artificielle ?",
  "Comment travailles-tu en équipe quand tout le monde n'est pas d'accord ?",
];

/** Compte à rebours de préparation, en secondes. */
export const INTERVIEW_PREP_SECONDS = 30;
/** Durée maximale de la réponse, en secondes. */
export const INTERVIEW_ANSWER_SECONDS = 90;
/** Fréquence proposée de la séance en conditions, en jours. */
export const INTERVIEW_INTERVAL_DAYS = 7;

export function pickInterviewQuestion(): string {
  return INTERVIEW_QUESTIONS[
    Math.floor(Math.random() * INTERVIEW_QUESTIONS.length)
  ];
}
