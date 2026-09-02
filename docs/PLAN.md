# Plan : Diction Coach

> PRD source : docs/PRD.md
> Base de preuves : docs/PROTOCOLE.md
>
> **Révision du 2026-08-31.** Les phases 1 à 4 sont livrées. Une revue de la
> littérature académique (docs/PROTOCOLE.md) a montré que trois choix déjà codés
> vont contre les données disponibles, et qu'une fonctionnalité manquante est le
> vrai goulot du projet. Les phases 5 à 8 corrigent cela et passent **avant**
> l'export/import et la PWA, qui étaient les phases 5 et 6 du plan initial.

## Décisions architecturales

- **Écrans** : Accueil (streak + démarrer une séance), Séance (déroulé des exercices),
  Journal (formulaire post-séance), Historique (liste des entrées), Paramètres (export/import)
- **Modèles clés** :
  - `Exercise` : catégorie, contenu, **consigne** (champ ajouté en phase 5)
  - `SessionLog` : date, exercices faits, créé dès qu'une séance est terminée,
    indépendamment du journal
  - `JournalEntry` : date, note globale, notes détaillées optionnelles, commentaire libre,
    **note prédite avant réécoute** (ajoutée en phase 8)
  - `Recording` : audio local d'une étape de transfert (ajouté en phase 8)
- **Streak** : dérivé exclusivement de `SessionLog`, jamais du journal
- **Stockage** : `localStorage` pour les données textuelles, **IndexedDB pour l'audio**,
  les blobs ne tenant pas dans `localStorage`
- **Aucun audio ne quitte l'appareil.** Pas d'analyse automatique de la voix, pas d'envoi
  réseau. L'enregistrement sert uniquement de retour à l'utilisateur.

---

# Phases livrées

## Phase 1 : Séance de base, LIVRÉE

User stories 1, 2, 3, 15, 16, 17. Banque d'exercices, tirage rotatif, écrans accueil et
séance, état de démarrage, tolérance aux données absentes, lisible sur téléphone.

## Phase 2 : Streak, LIVRÉE

User stories 8, 9. Compteur de jours consécutifs sur l'accueil.

> Révisée en phase 7 : la règle de remise à zéro est trop stricte.

## Phase 3 : Journal simple, LIVRÉE

User stories 4, 6, 7, 10. Note globale, commentaire libre, écran historique.

## Phase 4 : Journal détaillé, LIVRÉE

User story 5. Mode détaillé (débit, articulation, fatigue) en option du mode simple.

---

# Phases correctives

## Phase 5 : Recaler le contenu sur les preuves, LIVRÉE

**User stories** : 18, 19
**Justification** : docs/PROTOCOLE.md sections 1, 2, 3
**Fichiers visés** : `src/lib/exercises.ts`, `src/app/seance/page.tsx`

### Le problème

Le contenu actuel de `src/lib/exercises.ts` porte des consignes qui vont contre les
données mesurées :

| Exercice | Texte actuel | Problème |
|---|---|---|
| `lec-1` | « Je marche lentement, en articulant chaque syllabe, sans me presser » | Valorise le ralentissement, qui **n'améliore pas** l'intelligibilité (Tjaden 2014) |
| `res-5` | « Le chuchotement précis », chuchoter une phrase | Le chuchotement est l'inverse de la condition « fort », l'un des deux seuls leviers efficaces |
| `lec-5` | « Parler clairement demande de l'entraînement, pas du talent » | Texte méta sur l'app, pauvre en matière articulatoire |
| tous | Aucune consigne portée par l'exercice | La formulation exacte de la consigne détermine le gain (Lam & Tjaden 2013) |

La catégorie `respiration` mélange par ailleurs deux choses distinctes, l'échauffement
articulatoire (mâchoire, lèvres) et le soutien du souffle, et ne couvre pas la
projection vocale, qui est pourtant l'un des deux leviers efficaces.

### Ce qu'on livre

Le type `Exercise` gagne un champ `instruction`. La consigne affichée pendant un
exercice est littéralement **« Sur-articule chaque mot »**, jamais « parle clairement »
ni « parle lentement ». Les catégories deviennent `echauffement`, `virelangue`,
`lecture`, `projection`. Les textes contre-productifs sont réécrits ou retirés. Les
textes de lecture ciblent les consonnes en milieu et fin de mot, ainsi que les fins de
phrase.

### Critères d'acceptation

- [x] `Exercise` porte un champ `instruction`, affiché sur l'écran de séance
- [x] Aucun exercice de la banque n'emploie « lentement », « sans se presser » ou
      « chuchoter » comme consigne
- [x] La catégorie `respiration` est scindée en `echauffement` et `projection`,
      avec au moins 3 exercices chacune
- [x] Un avertissement « exagère les mouvements, ne déforme pas les sons » est visible
      au moins une fois par séance
- [x] Les `SessionLog` existants, qui référencent les anciens identifiants d'exercices,
      restent lisibles par l'historique sans planter

### Bloquée par

Aucune.

---

## Phase 6 : Ordonnancement bloqué puis aléatoire, LIVRÉE

**User stories** : 20
**Justification** : docs/PROTOCOLE.md sections 4 et 5
**Fichiers visés** : `src/lib/pick-exercises.ts`, `src/app/seance/page.tsx`

### Le problème

`src/lib/pick-exercises.ts` tire aujourd'hui **un** exercice par catégorie, au hasard,
en évitant les 2 dernières séances. C'est de la pratique aléatoire pure, et chaque
exercice n'est fait qu'une seule fois.

Or, chez des locuteurs sains, ce sont les programmes **aléatoire** et
**bloqué-puis-aléatoire** qui donnent la meilleure précision en fin d'acquisition et au
test de rétention à une semaine (Jones et al. 2016). Et le bénéfice des virelangues vient
de la **réitération répétée**, pas d'une lecture unique (Wilshire 1999, Ohkubo 2025).

### Ce qu'on livre

À l'intérieur d'une séance, le virelangue tiré est répété en bloc, 6 à 8 réitérations,
avec un compteur visible et une vitesse annoncée croissante. Entre les séances, le
tirage reste aléatoire sans répétition récente, ce qui est déjà le comportement actuel
et n'a pas besoin de changer.

### Critères d'acceptation

- [x] Un exercice peut déclarer un nombre de réitérations attendu (`reps`)
- [x] L'écran de séance affiche la progression des réitérations, par exemple 3 / 8,
      et ne passe à l'exercice suivant qu'une fois le bloc terminé ou explicitement passé
- [x] Le virelangue est répété en bloc ; la lecture et la projection restent en passe unique
- [x] Le tirage entre séances continue d'éviter les exercices des 2 dernières séances
- [x] `SessionLog` continue d'enregistrer les identifiants d'exercices comme aujourd'hui

### Bloquée par

- Phase 5

---

## Phase 7 : Streak tolérant et indicateur de dose, LIVRÉE

**User stories** : 21, 22
**Justification** : docs/PROTOCOLE.md section 10
**Fichiers visés** : `src/lib/streak.ts`, `src/app/page.tsx`

### Le problème

`src/lib/streak.ts` remet le compteur à zéro dès **un** jour manqué. Or Lally et al.
(2010) rapportent explicitement que manquer une occasion **n'affecte pas matériellement**
la formation d'une habitude. La règle actuelle punit donc un événement sans conséquence
réelle, et augmente le risque d'abandon complet après un accident de parcours, qui est
le vrai mode d'échec d'un outil auto-dirigé.

Par ailleurs, le streak seul ne dit rien de la dose réellement pratiquée.

### Ce qu'on livre

Un jour manqué ne casse pas la série. Deux jours consécutifs manqués la remettent à zéro.
L'accueil affiche en parallèle un indicateur non fragile, le nombre de séances sur les
30 derniers jours. Au premier lancement, l'app demande un **déclencheur contextuel**
(« après le petit-déjeuner », « en rentrant des cours ») et le rappelle sur l'accueil,
la stabilité du contexte étant un prédicteur de la force de l'habitude (Keller 2021,
Bürgler 2026).

### Critères d'acceptation

- [x] Une série survit à un jour manqué isolé
- [x] Deux jours consécutifs manqués remettent la série à zéro
- [x] L'usage d'un jour de grâce est visible pour l'utilisateur, sans le culpabiliser
- [x] L'accueil affiche le nombre de séances des 30 derniers jours
- [x] Un déclencheur contextuel est demandé au premier lancement, modifiable ensuite,
      et l'app reste pleinement utilisable s'il n'est pas renseigné

### Bloquée par

Aucune. Indépendante des phases 5 et 6, réalisable en parallèle.

---

## Phase 8 : Enregistrement et auto-évaluation calibrée, LIVRÉE

**User stories** : 23, 24, 25
**Justification** : docs/PROTOCOLE.md sections 6 et 9
**Fichiers visés** : nouveau `src/lib/recording-storage.ts`, `src/lib/journal-storage.ts`,
`src/app/seance/page.tsx`, `src/app/historique/page.tsx`

> **C'est la phase à plus fort levier du projet.** Sans elle, l'app entraîne une
> régularité sans garantir qu'elle entraîne la bonne chose.

### Le problème

Le PRD acte que « le seul signal de progrès réel vient du ressenti personnel » et traite
cela comme une limite acceptée. La littérature montre que ce signal est **faiblement
corrélé à la réalité**, ce qui est plus grave qu'une simple imprécision :

- l'auto-évaluation de la compréhensibilité est majoritairement inexacte, et les
  locuteurs les moins compréhensibles **surestiment** leur performance (Trofimovich 2014) ;
- des locuteurs à qui l'on demande de se rendre plus faciles à comprendre **ne le
  deviennent pas**, les auteurs concluant qu'ils ne sont pas conscients de leur propre
  compréhensibilité (Strachan 2019) ;
- aucune relation significative entre intelligibilité mesurée et perception qu'en ont
  les locuteurs (Walshe 2008).

C'est exactement le symptôme décrit dans le PRD, se sentir clair sans être compris.

La même étude donne le remède : l'alignement apparaît **après répétition de la tâche et
auto-évaluation explicite**. La calibration s'entraîne, elle ne se décrète pas.

### Ce qu'on livre

Une étape de transfert enregistrée en fin de séance, puis une boucle d'auto-évaluation
dans cet ordre strict :

1. l'utilisateur parle 60 à 90 s sur une consigne tirée au sort, c'est enregistré ;
2. il **note son ressenti avant de réécouter** ;
3. il réécoute ;
4. il note à nouveau ;
5. l'app affiche **l'écart entre les deux notes**.

Cet écart est l'indicateur de calibration, et sa réduction dans le temps constitue le
vrai signal de progrès du projet.

L'audio reste en local (IndexedDB), n'est jamais envoyé nulle part, et aucune analyse
automatique n'est faite. La réécoute est proposée environ une séance sur trois plutôt
qu'à chaque fois : le principe robuste de la littérature est le **délai** avant le
retour, pas sa fréquence, et l'évidence sur la fréquence réduite est contestée
(docs/PROTOCOLE.md section 9).

### Critères d'acceptation

- [x] Une étape de parole spontanée enregistrée, 60 à 90 s, clôt la séance
- [x] L'enregistrement est stocké en IndexedDB et réécoutable dans l'app
- [x] Aucune requête réseau ne transporte l'audio
- [x] La note prédite est saisie **avant** que la réécoute soit possible, sans retour arrière
- [x] L'écart entre note prédite et note après écoute est calculé, stocké et affiché
- [x] L'historique montre l'évolution de cet écart dans le temps
- [x] Refuser l'accès au micro, ou en manquer, ne bloque pas la séance : l'étape est
      simplement sautée
- [x] Un quota de stockage atteint est géré sans planter, avec purge des enregistrements
      les plus anciens au delà d'un seuil configurable

### Bloquée par

- Phase 5, pour la consigne de sur-articulation appliquée à l'étape de transfert

---

## Phase 9 : Séance en conditions d'entretien, LIVRÉE

**User stories** : 26
**Justification** : docs/PROTOCOLE.md sections 8 et 11

### Ce qu'on livre

Une modalité hebdomadaire distincte : une question type d'entretien tirée au sort,
30 s de préparation avec compte à rebours, puis 90 s de réponse debout, enregistrée,
avec la consigne unique de sur-articuler.

Le stress modifie le tempo et la tension vocale, et le principe de spécificité de la
pratique implique de s'entraîner dans des conditions proches de la cible, ici les
entretiens d'admission. Par ailleurs la parole interactive bat la parole claire en solo
sur l'intelligibilité mesurée (Krajewski 2026), ce qui plafonne l'entraînement isolé.

### Critères d'acceptation

- [x] Une séance « en conditions » est proposée une fois par semaine, sans remplacer
      la séance quotidienne
- [x] La préparation est limitée par un compte à rebours visible
- [x] La réponse est enregistrée et suit la même boucle d'auto-évaluation que la phase 8
- [x] Ces séances sont distinguables des séances ordinaires dans l'historique

### Bloquée par

- Phase 8

---

## Phase 10 : Mesure mensuelle par paragraphe de référence, LIVRÉE

**User stories** : 27, 28
**Justification** : docs/PROTOCOLE.md section 12

### Le problème

Ni le streak ni le nombre d'entrées de journal ne mesurent la clarté : ce sont des
indicateurs de processus. Le jugement d'auditeurs naïfs est l'étalon utilisé par toutes
les études citées, et il est gratuit. La reconnaissance vocale automatique, elle, est
instable précisément pour les locuteurs typiques et légèrement atteints, donc
inutilisable ici comme instrument de précision.

### Ce qu'on livre

Un **paragraphe de référence fixe**, enregistré une fois par mois **en condition
habituelle**, pas en sur-articulation, sinon on mesure la consigne et non l'acquis.
L'app propose ensuite une comparaison par paires **à l'aveugle** : deux enregistrements
sont lus dans un ordre aléatoire non révélé, et un proche désigne le plus facile à
comprendre. Le résultat est enregistré avec sa date.

### Critères d'acceptation

- [x] Un paragraphe de référence unique et invariant est proposé une fois par mois
- [x] Il est enregistré avec la consigne explicite de parler normalement
- [x] Le mode comparaison lit deux enregistrements dans un ordre aléatoire, sans révéler
      lequel est le plus récent avant le choix
- [x] Le résultat de chaque comparaison est stocké avec sa date
- [x] L'historique montre la suite des verdicts dans le temps

### Bloquée par

- Phase 8

---

# Phases initiales repoussées

## Phase 11 : Export / Import

**User stories** : 11, 12
*(Anciennement phase 5.)*

### Ce qu'on livre

Export de l'ensemble des données dans un fichier, et import pour restaurer sur un autre
appareil ou après réinstallation.

### Critères d'acceptation

- [ ] L'export contient séances, journal, écarts de calibration, déclencheur contextuel
      et résultats de comparaison
- [ ] L'import d'un fichier exporté restaure fidèlement ces données
- [ ] Importer sur une installation vierge reconstitue un état identique
- [ ] Le sort des enregistrements audio est explicite, soit inclus, soit exclus avec
      un avertissement clair à l'utilisateur

### Bloquée par

- Phase 8, le format d'export devant couvrir les nouvelles données

---

## Phase 12 : Installation et hors-ligne

**User stories** : 13, 14
*(Anciennement phase 6.)*

### Ce qu'on livre

Installation sur l'écran d'accueil et fonctionnement sans connexion après le premier
chargement.

### Critères d'acceptation

- [ ] L'application propose une installation sur l'écran d'accueil depuis un navigateur
      mobile compatible
- [ ] Après un premier chargement en ligne, démarrer une séance et journaliser
      fonctionnent hors connexion
- [ ] L'enregistrement audio fonctionne hors connexion
- [ ] Les données créées hors-ligne restent présentes au retour en ligne

### Bloquée par

Aucune sur le principe, à valider une fois les écrans stabilisés.

---

## Ordre d'exécution recommandé

1. **Phases 5, 6, 7** : peu coûteuses, elles corrigent du code et du contenu existants.
   La phase 7 est indépendante et peut se traiter en parallèle.
2. **Phase 8** : le vrai apport du projet.
3. **Phases 9 et 10** : transfert et mesure.
4. **Phases 11 et 12** : export/import et PWA.
