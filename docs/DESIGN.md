# Design System — Diction Coach

## Product Context
- **Quoi** : une PWA personnelle d'entraînement quotidien à l'articulation (virelangues, lecture à voix haute, respiration), sans enregistrement audio en v1.
- **Pour qui** : Ethan, seul utilisateur, en pleine période d'admissions parallèles, sur téléphone principalement.
- **Espace** : habit-tracker / bien-être vocal, proche des apps de santé/wellness (référence : Synvy Neuro sur Dribbble, RonDesignLab).
- **Type** : web app mobile-first (PWA).
- **Memorable thing** : une app calme et précise, pas un dashboard clinique froid ni un jouet gamifié — le streak et la séance du jour se lisent d'un coup d'œil, sans bruit visuel.

## Aesthetic Direction
- **Direction** : Neuro Clinique (révisé) — tuiles en verre dépoli sur fond pastel bleu-gris, sans dark mode ni photographie.
- **Décoration** : intentionnelle — glass tiles avec léger flou (`backdrop-filter`), glow ambiant discret derrière les tuiles, jamais de texture ou motif superflu.
- **Mood** : précision douce. L'app rassure sans être froide : tons pastel clairs, chiffres fins, pas de saturation.
- **Références** : Synvy Neuro Mobile App (Dribbble, RonDesignLab) pour les tuiles en verre et les chiffres fins ; adapté sans la photographie ni le ton biométrique/marketing.

## Typography
- **Display/Hero** : Outfit — géométrique et net, sert pour le nom de l'app et les gros chiffres du streak (weight 300 pour les chiffres, 600 pour les titres).
- **Body** : DM Sans — lisible, neutre, bonne complémentarité avec Outfit.
- **Data/Tables** : JetBrains Mono (`font-variant-numeric: tabular-nums`) — historique des séances, dates.
- **Code** : JetBrains Mono (non utilisé dans le produit, gardé par cohérence si besoin en debug/logs).
- **Loading** : `https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap`
- **Scale** : 12 / 14 / 16 / 20 / 26 / 32 / 44 px

## Color
- **Approche** : restrained — un seul accent (bleu acier), le reste en neutres pastel.
- **Primary** : `#1C2733` — texte principal, boutons pilule pleins (CTA "Démarrer la séance", nav)
- **Secondary** : `#3D6F86` — accent bleu acier, liens, chip "ghost", valeurs d'accent
- **Neutrals** : `#F6F8FA` (le plus clair) → `#E7EDF1` (fond) → `#D7DEE3` (bordures) → `#5C6B78` (texte atténué) → `#1C2733` (le plus sombre)
- **Semantic** : success `#3F7D63`, warning `#A9791F`, error `#A8493A`, info `#3D6F86`
- **Dark mode** : hors périmètre pour cette v1 — l'identité visuelle est un monde clair et pastel assumé, elle ne bascule pas automatiquement avec le thème système (cohérent avec le PRD, qui n'exige pas de dark mode).

## Spacing
- **Base** : 8px
- **Densité** : confortable
- **Scale** : 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64)

## Layout
- **Approche** : grid-disciplined — un seul flux vertical par écran (streak, CTA, historique), pas de mise en page créative.
- **Grid** : 1 colonne sur mobile (cible principale), contenu centré avec max-width sur desktop.
- **Max content width** : 480px (conçu comme un écran de téléphone, même sur grand écran).
- **Border radius** : sm:10px, md:14px, lg:20px, full:9999px (boutons et nav en pilule complète).

## Motion
- **Approche** : intentionnel — transitions douces sur les changements d'état (streak qui s'incrémente, ouverture d'une séance), rien de gratuit.
- **Easing** : enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration** : micro(80ms) court(200ms) moyen(320ms) long(500ms)

## Decisions Log
| Date | Décision | Rationale |
|------|----------|-----------|
| 2026-08-30 | Création initiale | `/design` — comparatif de 3 thèmes (Neuro Clinique, Carnet du soir, Sobre & direct) présenté après recherche sur les habit-trackers et une référence Dribbble (Synvy Neuro) fournie par l'utilisateur en captures d'écran |
| 2026-08-30 | Choix du Thème A (Neuro Clinique, révisé) | L'utilisateur valide cette piste ; révision faite pour retirer la photographie et alléger le fond (pastel clair plutôt que dark navy) tout en gardant les tuiles en verre et les chiffres fins de la référence |
