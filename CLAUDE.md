@AGENTS.md

# Diction Coach

PWA personnelle et mono-utilisateur d'entraînement quotidien à l'articulation, pour
Ethan Ung. Next.js 16, React 19, TypeScript, Tailwind 4, shadcn/ui, framer-motion.
Toutes les données vivent dans le navigateur, rien n'est envoyé sur un serveur.

Communiquer en francais. Pas de tirets longs (em dashes) dans le code, les commentaires
ni les messages de commit.

## Documents de référence, à lire avant de coder

| Fichier | Rôle | Autorité |
|---|---|---|
| `docs/PROTOCOLE.md` | Base de preuves académiques sur l'entraînement à l'articulation | **Fait foi en cas de contradiction** |
| `docs/PLAN.md` | Phases de développement, phases 1 à 4 livrées, 5 à 12 à faire | Feuille de route |
| `docs/PRD.md` | Problème, user stories, décisions d'implémentation | Révisé le 2026-08-31 |
| `docs/DESIGN.md` | Système de design, palette, typographies | Identité visuelle |

`docs/PROTOCOLE.md` a été rédigé après les phases 1 à 4 et **corrige plusieurs choix
déjà codés**. Quand le code existant contredit le protocole, c'est le code qui a tort.

## Les cinq règles issues du protocole

Ces règles ne sont pas des préférences esthétiques, elles viennent de résultats mesurés.
Ne pas les contourner sans lire la section correspondante du protocole.

1. **Ne jamais dire à l'utilisateur de ralentir.** Chez 78 locuteurs, témoins sains
   inclus, les conditions « claire » et « fort » améliorent l'intelligibilité, la
   condition « lente » ne l'améliore pas (Tjaden 2014, protocole section 1). Les
   consignes visent la précision articulatoire et l'intensité vocale.

2. **La consigne est littéralement « Sur-articule chaque mot ».** Comparée à « parle à
   quelqu'un de malentendant » et à « parle clairement », c'est elle qui produit le plus
   fort gain d'intelligibilité (Lam & Tjaden 2013, protocole section 2). Ne pas la
   reformuler, ne pas l'adoucir.

3. **Bloqué pour apprendre, aléatoire pour retenir.** Le virelangue se répète en bloc
   dans une séance, le tirage reste aléatoire entre les séances (Jones 2016, protocole
   section 4).

4. **Un jour manqué ne casse pas la série.** Manquer une occasion n'affecte pas
   matériellement la formation d'une habitude (Lally 2010, protocole section 10).
   Remise à zéro seulement après deux jours consécutifs manqués.

5. **Le ressenti brut ne mesure rien, l'écart de calibration si.** L'auto-évaluation de
   sa propre clarté est faiblement corrélée à la réalité (Trofimovich 2014, Strachan
   2019, Walshe 2008, protocole section 6). L'utilisateur note **avant** de réécouter,
   puis après, et c'est l'écart qui constitue le signal de progrès.

## Contraintes de confidentialité, non négociables

- **Aucun audio ne quitte l'appareil.** Pas d'envoi réseau, pas d'API tierce, pas
  d'analyse automatique de la voix. L'enregistrement sert uniquement de retour à
  l'utilisateur.
- Les blobs audio vont en **IndexedDB**, jamais en `localStorage`.
- Toute fonctionnalité qui impliquerait de transmettre la voix est hors périmètre.

## Architecture actuelle

```
src/
  app/
    page.tsx              accueil : streak + démarrer une séance
    seance/page.tsx       déroulé de la séance et journal de fin
    historique/page.tsx   liste des entrées de journal
    layout.tsx
  lib/
    exercises.ts          banque d'exercices en dur + types
    pick-exercises.ts     tirage d'un exercice par catégorie
    session-storage.ts    SessionLog en localStorage + sélection en cours
    journal-storage.ts    JournalEntry, modes simple et détaillé
    streak.ts             calcul des jours consécutifs
    date.ts               clé de date AAAA-MM-JJ
```

Points d'attention sur l'existant :

- `session-storage.ts` et `journal-storage.ts` encapsulent déjà tous les accès au
  stockage avec garde `isBrowser()` et `try/catch`. **Suivre ce motif** pour tout nouveau
  module de persistance, y compris IndexedDB.
- `journal-storage.ts` contient déjà une fonction `normalizeEntry` qui accepte les
  entrées de l'ancien format. **Préserver cette rétrocompatibilité** à chaque évolution
  du schéma : les données réelles d'Ethan sont dans son navigateur et ne doivent jamais
  être perdues par une migration.
- Les `SessionLog` référencent des identifiants d'exercices. Renommer ou supprimer un
  exercice de la banque casse l'historique : prévoir une résolution tolérante.

## Conventions

- Les identifiants d'exercices suivent le motif `<prefixe>-<n>` (`vir-1`, `lec-3`).
- Les dates sont des chaînes `AAAA-MM-JJ` produites par `dateKey()`.
- Le contenu des exercices est en français et vouvoie ou tutoie de façon cohérente avec
  l'existant (tutoiement).
- Composants shadcn/ui dans `src/components/ui/`, configuration dans `components.json`.

## Vérifications avant de livrer

```bash
npm run lint
npm run build
```

Il n'y a pas de suite de tests automatisés à ce jour. Vérifier manuellement sur un
viewport mobile, cible principale du produit.
