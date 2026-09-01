export type ExerciseCategory =
  | "echauffement"
  | "virelangue"
  | "lecture"
  | "projection";

export interface Exercise {
  id: string;
  category: ExerciseCategory;
  title: string;
  content: string;
  instruction: string;
  /**
   * Nombre de réitérations attendues avant de passer à l'exercice suivant
   * (docs/PROTOCOLE.md, section 4 : bloqué pour apprendre). Absent pour les
   * exercices en passe unique.
   */
  reps?: number;
}

export const CATEGORY_LABELS: Record<ExerciseCategory, string> = {
  echauffement: "Échauffement",
  virelangue: "Virelangue",
  lecture: "Lecture à voix haute",
  projection: "Projection vocale",
};

/**
 * Consigne rappelée pendant chaque séance (docs/PROTOCOLE.md, section 3) :
 * la sur-articulation ne doit jamais déformer les sons.
 */
export const ARTICULATION_WARNING =
  "Exagère les mouvements, ne déforme pas les sons.";

export const EXERCISES: Exercise[] = [
  {
    id: "ech-1",
    category: "echauffement",
    title: "Bâillement-fredonnement",
    content: "Baille largement, puis fredonne un « mmm » grave en sentant les lèvres vibrer.",
    instruction: "Détends la mâchoire, sans forcer.",
  },
  {
    id: "ech-2",
    category: "echauffement",
    title: "Trilles de lèvres",
    content:
      "Fais vibrer tes lèvres en soufflant, comme un moteur qui tourne, pendant une dizaine de secondes.",
    instruction: "Garde un souffle régulier, sans à-coups.",
  },
  {
    id: "ech-3",
    category: "echauffement",
    title: "Voyelles grand ouvert",
    content: "Prononce A, E, I, O, U en ouvrant la bouche au maximum à chaque voyelle.",
    instruction: "Exagère l'ouverture, sans déformer le son.",
  },
  {
    id: "ech-4",
    category: "echauffement",
    title: "L'alphabet en une respiration",
    content:
      "Prends une grande inspiration, puis récite l'alphabet à voix haute sur une seule expiration, aussi loin que possible.",
    instruction: "Cherche le souffle, pas la vitesse.",
  },
  {
    id: "vir-1",
    category: "virelangue",
    title: "L'archiduchesse",
    content: "Les chaussettes de l'archiduchesse sont-elles sèches, archi-sèches ?",
    instruction: "Sur-articule chaque mot.",
    reps: 8,
  },
  {
    id: "vir-2",
    category: "virelangue",
    title: "Le chasseur",
    content: "Un chasseur sachant chasser sait chasser sans son chien.",
    instruction: "Sur-articule chaque mot.",
    reps: 8,
  },
  {
    id: "vir-3",
    category: "virelangue",
    title: "Les tortues",
    content: "Trois tortues trottaient sur un trottoir très étroit.",
    instruction: "Sur-articule chaque mot.",
    reps: 8,
  },
  {
    id: "vir-4",
    category: "virelangue",
    title: "Les cyprès",
    content:
      "Si six scies scient six cyprès, six cent six scies scient six cent six cyprès.",
    instruction: "Sur-articule chaque mot.",
    reps: 8,
  },
  {
    id: "vir-5",
    category: "virelangue",
    title: "Les chats",
    content: "Cinq chiens chassent six chats.",
    instruction: "Sur-articule chaque mot.",
    reps: 8,
  },
  {
    id: "lec-6",
    category: "lecture",
    title: "Le ciel gris",
    content:
      "Le ciel est gris ce matin, mais l'air reste doux. Les gens pressés traversent la place sans un regard.",
    instruction: "Sur-articule chaque mot, surtout les fins de mots.",
  },
  {
    id: "lec-2",
    category: "lecture",
    title: "La bibliothèque",
    content:
      "La bibliothèque municipale ouvre à neuf heures. Les étagères, hautes et chargées, sentent le papier ancien.",
    instruction: "Sur-articule chaque mot, surtout les fins de mots.",
  },
  {
    id: "lec-3",
    category: "lecture",
    title: "Ouvrir la bouche",
    content:
      "Pour bien prononcer, il faut ouvrir grand la bouche et détacher chaque mot, comme si on parlait à quelqu'un qui lit sur les lèvres.",
    instruction: "Sur-articule chaque mot, surtout les fins de mots.",
  },
  {
    id: "lec-4",
    category: "lecture",
    title: "Le train en gare",
    content:
      "Le train entre en gare avec un peu de retard. Les voyageurs pressés grimpent les marches deux par deux.",
    instruction: "Sur-articule chaque mot, surtout les fins de mots.",
  },
  {
    id: "lec-7",
    category: "lecture",
    title: "Le pain frais",
    content:
      "Le pain frais sort du four à six heures précises. Son odeur traverse toute la rue jusqu'au bout du quartier.",
    instruction: "Sur-articule chaque mot, surtout les fins de mots.",
  },
  {
    id: "proj-1",
    category: "projection",
    title: "Phrase qui porte",
    content: "Répète, en augmentant l'intensité à chaque fois : « Je serai prêt pour cet entretien. »",
    instruction: "Projette ta voix, sans crier ni forcer.",
  },
  {
    id: "proj-2",
    category: "projection",
    title: "Depuis le fond de la pièce",
    content:
      "Imagine que quelqu'un t'écoute depuis l'autre bout de la pièce. Dis : « Est-ce que vous m'entendez bien ? » en portant ta voix jusqu'à lui.",
    instruction: "Pousse le son depuis le ventre, pas depuis la gorge.",
  },
  {
    id: "proj-3",
    category: "projection",
    title: "La dernière syllabe",
    content:
      "Dis une phrase de ton choix en insistant particulièrement sur le dernier mot, sans le laisser mourir.",
    instruction: "Garde l'énergie jusqu'au point final.",
  },
];

export function getExercisesByCategory(category: ExerciseCategory): Exercise[] {
  return EXERCISES.filter((exercise) => exercise.category === category);
}

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISES.find((exercise) => exercise.id === id);
}
