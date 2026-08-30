# Plan : Diction Coach

> PRD source : docs/PRD.md

## Décisions architecturales

- **Écrans** : Accueil (streak + démarrer une séance), Séance (déroulé des 3 exercices), Journal (formulaire post-séance), Historique (liste des entrées), Paramètres (export/import)
- **Modèles clés** :
  - `Exercise` : catégorie (virelangue / lecture à voix haute / respiration-diction), contenu
  - `SessionLog` : date, exercices faits — créé dès qu'une séance est terminée, indépendamment du journal
  - `JournalEntry` : date, note globale, notes détaillées optionnelles par critère, commentaire libre
- **Streak** : dérivé exclusivement de `SessionLog` (pas du journal), pour que le compteur de régularité fonctionne même si l'utilisateur ne journalise pas

---

## Phase 1 : Séance de base

**User stories** : 1, 2, 3, 15, 16, 17

### Ce qu'on livre

L'utilisateur peut démarrer une séance en un geste depuis l'accueil et enchaîner 3 exercices (un virelangue, une lecture à voix haute, un exercice de respiration/diction) tirés de la banque, sans répéter un exercice fait récemment. La fin de séance est enregistrée. Sans donnée existante, un état de démarrage invite à faire la première séance. L'application reste fonctionnelle même sans données locales (première utilisation ou données perdues). L'interface est utilisable confortablement sur téléphone.

### Critères d'acceptation

- [ ] Depuis l'accueil, un utilisateur démarre une séance et voit défiler 3 exercices d'affilée, un par catégorie
- [ ] Deux séances consécutives ne proposent pas les mêmes exercices tant que la banque le permet
- [ ] Une séance terminée est enregistrée et consultable comme telle
- [ ] Au premier lancement (aucune donnée), l'accueil affiche une invitation claire à faire la première séance plutôt qu'un écran vide silencieux
- [ ] L'interface de séance est lisible et utilisable sur un écran de téléphone

## Bloquée par

Aucune — démarrable immédiatement

---

## Phase 2 : Streak

**User stories** : 8, 9

### Ce qu'on livre

L'accueil affiche le nombre de jours consécutifs pendant lesquels l'utilisateur a fait au moins une séance. Le compteur repart à zéro si un jour a été manqué.

### Critères d'acceptation

- [ ] Après une séance terminée dans la journée, le streak affiché inclut ce jour
- [ ] Après un jour sans séance terminée, le streak repasse à zéro au jour suivant
- [ ] Le streak reste correct après plusieurs jours de suite avec séance faite chaque jour

## Bloquée par

- Phase 1

---

## Phase 3 : Journal simple

**User stories** : 4, 6, 7, 10

### Ce qu'on livre

Après une séance, l'utilisateur peut (sans y être obligé) noter une appréciation globale de son ressenti et ajouter un commentaire libre. Il peut consulter la liste de ses entrées de journal passées.

### Critères d'acceptation

- [ ] Une séance peut être terminée sans qu'aucune entrée de journal ne soit créée
- [ ] Une entrée de journal enregistre une note globale et un commentaire libre optionnel, associés à la date
- [ ] L'historique liste les entrées de journal passées, les plus récentes en premier

## Bloquée par

- Phase 1

---

## Phase 4 : Journal détaillé

**User stories** : 5

### Ce qu'on livre

Au moment de journaliser, l'utilisateur peut basculer vers un mode détaillé pour noter plusieurs critères séparément, au lieu de la seule note globale.

### Critères d'acceptation

- [ ] Le mode détaillé propose plusieurs critères notés individuellement, à la place de la note globale unique
- [ ] Utiliser le mode détaillé un jour n'empêche pas de revenir au mode simple un autre jour
- [ ] Une entrée en mode détaillé apparaît correctement dans l'historique

## Bloquée par

- Phase 3

---

## Phase 5 : Export / Import

**User stories** : 11, 12

### Ce qu'on livre

L'utilisateur peut exporter l'ensemble de ses données (séances, streak, journal) dans un fichier, et importer un tel fichier pour restaurer ses données sur un autre appareil ou après une réinstallation.

### Critères d'acceptation

- [ ] L'export produit un fichier contenant l'ensemble des séances, du streak et des entrées de journal existantes
- [ ] L'import d'un fichier précédemment exporté restaure fidèlement ces données
- [ ] Importer un fichier sur une installation vierge reconstitue un état identique à celui exporté

## Bloquée par

- Phase 4

---

## Phase 6 : Installation et hors-ligne

**User stories** : 13, 14

### Ce qu'on livre

L'application peut être installée sur l'écran d'accueil du téléphone et reste utilisable sans connexion internet une fois chargée une première fois.

### Critères d'acceptation

- [ ] L'application propose une installation sur l'écran d'accueil depuis un navigateur mobile compatible
- [ ] Après un premier chargement en ligne, l'application reste utilisable (démarrer une séance, journaliser) sans connexion internet
- [ ] Les données créées hors-ligne restent présentes au retour en ligne

## Bloquée par

Aucune — démarrable en parallèle, à valider une fois les écrans principaux en place
