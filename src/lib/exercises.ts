export type ExerciseCategory = "virelangue" | "lecture" | "respiration";

export interface Exercise {
  id: string;
  category: ExerciseCategory;
  title: string;
  content: string;
}

export const CATEGORY_LABELS: Record<ExerciseCategory, string> = {
  virelangue: "Virelangue",
  lecture: "Lecture à voix haute",
  respiration: "Respiration & diction",
};

export const EXERCISES: Exercise[] = [
  {
    id: "vir-1",
    category: "virelangue",
    title: "L'archiduchesse",
    content: "Les chaussettes de l'archiduchesse sont-elles sèches, archi-sèches ?",
  },
  {
    id: "vir-2",
    category: "virelangue",
    title: "Le chasseur",
    content: "Un chasseur sachant chasser sait chasser sans son chien.",
  },
  {
    id: "vir-3",
    category: "virelangue",
    title: "Les tortues",
    content: "Trois tortues trottaient sur un trottoir très étroit.",
  },
  {
    id: "vir-4",
    category: "virelangue",
    title: "Les cyprès",
    content:
      "Si six scies scient six cyprès, six cent six scies scient six cent six cyprès.",
  },
  {
    id: "vir-5",
    category: "virelangue",
    title: "Les chats",
    content: "Cinq chiens chassent six chats.",
  },
  {
    id: "lec-1",
    category: "lecture",
    title: "Le ciel gris",
    content:
      "Aujourd'hui, le ciel est gris mais l'air reste doux. Je marche lentement, en articulant chaque syllabe, sans me presser.",
  },
  {
    id: "lec-2",
    category: "lecture",
    title: "La bibliothèque",
    content:
      "La bibliothèque municipale ouvre à neuf heures. Les étagères, hautes et chargées, sentent le papier ancien.",
  },
  {
    id: "lec-3",
    category: "lecture",
    title: "Ouvrir la bouche",
    content:
      "Pour bien prononcer, il faut ouvrir grand la bouche et détacher chaque mot, comme si on parlait à quelqu'un qui lit sur les lèvres.",
  },
  {
    id: "lec-4",
    category: "lecture",
    title: "Le train en gare",
    content:
      "Le train entre en gare avec un peu de retard. Les voyageurs pressés grimpent les marches deux par deux.",
  },
  {
    id: "lec-5",
    category: "lecture",
    title: "Cinq minutes comptent",
    content:
      "Parler clairement demande de l'entraînement, pas du talent. Chaque jour compte, même cinq minutes.",
  },
  {
    id: "res-1",
    category: "respiration",
    title: "Compter jusqu'à dix",
    content:
      "Inspire profondément par le nez pendant 4 secondes, retiens 2 secondes, puis expire lentement en comptant à voix haute jusqu'à 10.",
  },
  {
    id: "res-2",
    category: "respiration",
    title: "Le long sifflement",
    content:
      "Inspire, puis expire en articulant un long « sssss » régulier, sans à-coups, jusqu'à manquer d'air.",
  },
  {
    id: "res-3",
    category: "respiration",
    title: "L'alphabet en une respiration",
    content:
      "Prends une grande inspiration, puis récite l'alphabet à voix haute sur une seule expiration, aussi loin que possible.",
  },
  {
    id: "res-4",
    category: "respiration",
    title: "Le rire contrôlé",
    content:
      "Inspire calmement, puis expire en prononçant « ha-ha-ha-ha » depuis le ventre, comme un rire contrôlé.",
  },
  {
    id: "res-5",
    category: "respiration",
    title: "Le chuchotement précis",
    content:
      "Inspire par le nez, expire par la bouche en chuchotant une phrase de ton choix le plus distinctement possible.",
  },
];

export function getExercisesByCategory(category: ExerciseCategory): Exercise[] {
  return EXERCISES.filter((exercise) => exercise.category === category);
}

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISES.find((exercise) => exercise.id === id);
}
