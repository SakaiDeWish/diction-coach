# Diction Coach

Application web personnelle d'entraînement quotidien à l'articulation. Séance courte,
sur téléphone, tous les jours, pour mieux se faire comprendre à l'oral.

Usage strictement personnel et mono-utilisateur. Toutes les données restent dans le
navigateur : aucun compte, aucun serveur, aucun envoi réseau.

## Pourquoi

Se sentir clair dans sa tête sans être compris par son entourage est un décalage
courant et documenté : l'auto-évaluation de sa propre clarté est faiblement corrélée à
la façon dont les auditeurs perçoivent réellement la parole. L'enjeu est renforcé par
une période d'entretiens d'admission, où l'expression orale pèse dans l'évaluation.

L'application vise donc deux choses à la fois : **entraîner l'articulation**, et
**entraîner la perception qu'on a de sa propre articulation**.

## Principe

Une séance quotidienne de 8 à 11 minutes enchaîne :

1. un échauffement de la mâchoire et des lèvres,
2. un virelangue répété en bloc,
3. une lecture à voix haute en sur-articulation,
4. un exercice de projection vocale,
5. une minute de parole spontanée enregistrée localement.

L'utilisateur note ensuite son ressenti **avant** de réécouter, puis après. L'écart
entre les deux notes est l'indicateur de progrès du produit.

Ce que l'application ne fait pas : ralentir le débit, analyser automatiquement la voix,
envoyer quoi que ce soit sur un serveur.

## Base de preuves

Le contenu et le rythme d'entraînement ne sont pas improvisés. Ils s'appuient sur la
littérature en phonétique clinique, apprentissage moteur de la parole et psychologie de
l'habitude, synthétisée dans **[docs/PROTOCOLE.md](docs/PROTOCOLE.md)**.

Trois résultats structurent le produit :

- ralentir n'améliore pas l'intelligibilité, contrairement à la précision articulatoire
  et à l'intensité vocale ;
- la formulation exacte de la consigne change le gain mesuré, et « sur-articule chaque
  mot » est la plus efficace ;
- l'auto-évaluation de sa clarté est peu fiable, mais elle se calibre par la répétition
  et l'évaluation explicite.

## Documentation

| Fichier | Contenu |
|---|---|
| [docs/PROTOCOLE.md](docs/PROTOCOLE.md) | Base de preuves académiques, fait foi en cas de contradiction |
| [docs/PRD.md](docs/PRD.md) | Problème, user stories, décisions d'implémentation |
| [docs/PLAN.md](docs/PLAN.md) | Phases de développement et critères d'acceptation |
| [docs/DESIGN.md](docs/DESIGN.md) | Système de design, palette, typographies |
| [CLAUDE.md](CLAUDE.md) | Consignes pour le développement assisté |

## État

Phases 1 à 4 livrées : séance de base, streak, journal simple, journal détaillé.

Phases 5 à 12 à faire, voir [docs/PLAN.md](docs/PLAN.md). Les phases 5 à 8 corrigent des
choix déjà codés qui contredisent le protocole, et ajoutent la boucle d'enregistrement
et d'auto-évaluation calibrée, qui est le principal apport restant.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, framer-motion.
Persistance en `localStorage` pour les données textuelles, IndexedDB pour l'audio.

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```
