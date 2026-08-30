# PRD - Diction Coach

> **Révisé le 2026-08-31** à la lumière de docs/PROTOCOLE.md (revue de la littérature
> académique). Les sections « User Stories », « Décisions d'implémentation », « Critères
> de succès » et « Hors périmètre » ont changé. Les modifications sont signalées par
> la mention *(révisé)*. En cas de contradiction, docs/PROTOCOLE.md fait foi.

## Problème

Ethan constate régulièrement que son entourage ne saisit pas toujours clairement ce qu'il dit à l'oral, alors qu'il a le sentiment d'être clair dans sa tête. Ce décalage se manifeste au quotidien, dans des situations variées, et non dans un contexte isolé. Il prend une importance particulière en ce moment, alors qu'Ethan traverse une période d'entretiens d'admission (dossiers AST, Avenir+) où une expression orale claire pèse dans l'évaluation. Il souhaite s'entraîner régulièrement à mieux articuler, sans altérer son débit naturel de parole.

## Solution

Un outil d'entraînement quotidien qui propose une courte séance d'exercices d'articulation (virelangues, lecture à voix haute, exercices de respiration), en variant les exercices proposés pour éviter la répétition. Après chaque séance, l'utilisateur peut noter en quelques secondes son ressenti et consulter sa régularité de pratique dans le temps.

## Utilisateur cible

Ethan Ung, étudiant en réorientation post-prépa, en pleine période d'admissions parallèles vers une grande école d'ingénieur. Il souhaite améliorer sa clarté orale via une pratique courte et quotidienne, principalement depuis son téléphone, dans les moments disponibles de sa journée. Usage strictement personnel et mono-utilisateur.

## User Stories

1. En tant qu'utilisateur, je veux démarrer une séance d'exercices d'articulation en un geste, afin de m'entraîner sans friction au quotidien.
2. En tant qu'utilisateur, je veux qu'une séance propose 3 exercices (un virelangue, une lecture à voix haute, un exercice de respiration/diction), afin de travailler différents aspects de l'articulation à chaque fois.
3. En tant qu'utilisateur, je veux que les exercices proposés changent d'un jour à l'autre sans répéter ceux faits récemment, afin de garder de la variété et éviter la lassitude.
4. En tant qu'utilisateur, je veux noter mon ressenti global sur une échelle simple après une séance, afin de suivre mon évolution dans le temps.
5. En tant qu'utilisateur, je veux pouvoir détailler mon ressenti sur plusieurs critères séparés si je le souhaite, afin d'affiner le suivi certains jours sans y être obligé.
6. En tant qu'utilisateur, je veux ajouter une remarque libre à mon entrée de journal, afin de noter des observations précises (sons ou mots qui posent problème).
7. En tant qu'utilisateur, je veux consulter l'historique de mes entrées de journal, afin de voir mon évolution et me remémorer mes difficultés récurrentes.
8. En tant qu'utilisateur, je veux voir mon nombre de jours consécutifs de pratique, afin de rester motivé à maintenir ma régularité.
9. En tant qu'utilisateur, je veux que ce compteur de régularité soit remis à zéro si je manque un jour, afin qu'il reflète honnêtement ma pratique réelle.
10. En tant qu'utilisateur, je veux pouvoir faire une séance sans remplir le journal, afin de ne pas être bloqué si je manque de temps.
11. En tant qu'utilisateur, je veux pouvoir exporter mes données dans un fichier, afin de les sauvegarder ou les transférer vers un autre appareil.
12. En tant qu'utilisateur, je veux pouvoir importer un fichier de données précédemment exporté, afin de récupérer mon historique sur un nouvel appareil ou après une réinstallation.
13. En tant qu'utilisateur, je veux installer l'application sur l'écran d'accueil de mon téléphone, afin d'y accéder aussi rapidement qu'une app native.
14. En tant qu'utilisateur, je veux que l'application reste utilisable sans connexion internet après le premier chargement, afin de pouvoir m'entraîner n'importe où.
15. En tant que nouvel utilisateur sans aucune donnée, je veux voir un état de démarrage clair m'invitant à faire ma première séance, afin de comprendre immédiatement comment utiliser l'outil.
16. En tant qu'utilisateur, je veux que l'application reste fonctionnelle même si mes données locales sont vides ou perdues (ex: après vidage du cache), afin de pouvoir repartir de zéro sans être bloqué.
17. En tant qu'utilisateur, je veux que l'application soit lisible et confortable sur un écran de téléphone, afin de m'entraîner facilement en déplacement.

### User stories ajoutées le 2026-08-31 *(révisé)*

18. En tant qu'utilisateur, je veux que chaque exercice m'affiche une consigne explicite de sur-articulation, afin d'appliquer la stratégie qui améliore réellement l'intelligibilité plutôt que de ralentir inutilement.
19. En tant qu'utilisateur, je veux des exercices d'échauffement de la mâchoire et de projection vocale distincts des exercices de souffle, afin de travailler séparément les deux leviers qui fonctionnent.
20. En tant qu'utilisateur, je veux répéter plusieurs fois d'affilée le même virelangue dans une séance, afin de bénéficier de la réitération qui produit l'effet d'entraînement.
21. En tant qu'utilisateur, je veux qu'un seul jour manqué ne remette pas ma série à zéro, afin de ne pas être découragé par un accident de parcours sans conséquence réelle sur l'habitude.
22. En tant qu'utilisateur, je veux voir mon nombre de séances sur les 30 derniers jours, afin de disposer d'un indicateur de régularité qui ne s'effondre pas d'un coup.
23. En tant qu'utilisateur, je veux terminer ma séance par un temps de parole spontanée enregistré, afin de faire le lien entre les exercices et ma parole réelle.
24. En tant qu'utilisateur, je veux noter mon ressenti avant de réécouter mon enregistrement, puis le renoter après, afin d'apprendre à percevoir ma propre clarté.
25. En tant qu'utilisateur, je veux voir l'écart entre ma note prédite et ma note après écoute évoluer dans le temps, afin de mesurer ma calibration plutôt que mon seul ressenti.
26. En tant qu'utilisateur, je veux une séance hebdomadaire en conditions d'entretien (question tirée au sort, temps de préparation limité, réponse chronométrée), afin de m'entraîner dans les conditions où j'en ai besoin.
27. En tant qu'utilisateur, je veux enregistrer un paragraphe de référence une fois par mois en parlant normalement, afin de disposer d'un point de comparaison objectif dans le temps.
28. En tant qu'utilisateur, je veux faire écouter deux enregistrements à l'aveugle à un proche et enregistrer son verdict, afin d'obtenir la seule mesure de progrès qui fasse foi.

## Critères de succès *(révisé)*

### Indicateurs de processus, à 1 mois

- Au moins 22 séances terminées sur 30 jours.
- Au moins 20 entrées de journal sur cette même période.

> Le critère initial « 14 jours consécutifs » a été retiré : il dépend de la règle de
> streak, qui était elle-même mal calibrée. Le nombre de séances sur 30 jours reflète
> mieux la dose réellement pratiquée.

### Indicateurs de résultat, à 2 et 3 mois

- L'écart moyen entre note prédite et note après réécoute diminue entre le premier et le
  troisième mois (calibration de l'auto-perception).
- Lors d'une comparaison à l'aveugle par un proche, l'enregistrement de référence du
  mois 2 ou 3 est jugé plus facile à comprendre que celui du mois 0.

> L'horizon d'automatisation d'une habitude quotidienne est d'environ 2 mois (médiane 59
> à 66 jours), avec une variabilité individuelle de 18 à 254 jours. Un critère à 1 mois
> seul est trop court pour juger le résultat.

## Hors périmètre *(révisé)*

- **Analyse automatique de la voix** (reconnaissance vocale, mesure acoustique, notation
  automatique de l'articulation). L'enregistrement audio local, lui, entre au contraire
  dans le périmètre depuis la révision : voir la phase 8 du plan.
- Envoi de l'audio hors de l'appareil, sous quelque forme que ce soit
- Notifications ou rappels
- Gamification poussée (points d'expérience, badges, niveaux)
- Écran d'édition de la banque d'exercices dans l'application
- Comptes utilisateurs et synchronisation cloud multi-appareils
- Parcours de difficulté progressif structuré

## Décisions d'implémentation *(révisé)*

### Principe directeur

**La cible est la précision articulatoire et l'intensité vocale, jamais le ralentissement.**
Chez 78 locuteurs, témoins sains inclus, les conditions « claire » et « fort » améliorent
l'intelligibilité, la condition « lente » ne l'améliore pas (Tjaden 2014). La contrainte
initiale d'Ethan, « sans altérer mon débit naturel », n'est donc pas un compromis subi :
c'est la bonne stratégie, et elle devient un principe de conception.

### Décisions actives

- Une séance quotidienne enchaîne échauffement, virelangue en bloc, lecture, projection
  et parole spontanée enregistrée, pour une durée visée de 8 à 11 minutes
- **La consigne affichée est littéralement « Sur-articule chaque mot »**, jamais « parle
  clairement » ni « parle lentement » : la formulation exacte de la consigne détermine
  l'ampleur du gain (Lam & Tjaden 2013)
- Les exercices avertissent d'exagérer les mouvements sans déformer les sons : une
  sur-articulation qui réduit le contraste phonémique dégrade l'intelligibilité
- Le virelangue est **répété en bloc** dans la séance (6 à 8 réitérations), le tirage
  reste aléatoire entre les séances : c'est le schéma bloqué-puis-aléatoire qui donne la
  meilleure rétention à une semaine (Jones 2016)
- Le tirage des exercices évite de répéter un exercice déjà fait récemment
- Le journal propose par défaut une note globale unique et un champ de texte libre
  optionnel ; un mode détaillé permet de noter plusieurs critères séparément
- Remplir le journal est optionnel après une séance
- **La séance se termine par 60 à 90 s de parole spontanée enregistrée localement.**
  L'utilisateur note son ressenti **avant** de réécouter, puis après ; l'app affiche
  l'écart. C'est cet écart, et non le ressenti brut, qui mesure le progrès
- La réécoute est proposée environ une séance sur trois, le principe robuste étant le
  délai avant le retour plutôt que sa fréquence
- **Le compteur de régularité tolère un jour manqué** et ne se réinitialise qu'après deux
  jours consécutifs manqués : manquer une occasion n'affecte pas matériellement la
  formation d'une habitude (Lally 2010). Un second indicateur affiche le nombre de
  séances sur 30 jours
- Au premier lancement, l'app demande un **déclencheur contextuel** ancrant la séance à
  une routine existante, la stabilité du contexte prédisant la force de l'habitude
- Une séance hebdomadaire se fait en conditions d'entretien : question tirée au sort,
  30 s de préparation, 90 s de réponse debout, enregistrée
- Une fois par mois, un paragraphe de référence invariant est enregistré **en parlant
  normalement**, et l'app permet une comparaison par paires à l'aveugle par un proche
- Une fonction d'export produit un fichier contenant toutes les données, et une fonction
  d'import les restaure
- L'application est installable sur l'écran d'accueil et reste utilisable hors connexion
  après le premier chargement
- Sans donnée existante, l'application affiche un état de démarrage invitant à faire la
  première séance
- L'interface est conçue en priorité pour un usage sur téléphone, avec un affichage
  adapté aussi sur ordinateur

### Décisions abandonnées

| Décision initiale | Raison de l'abandon |
|---|---|
| 3 exercices d'affilée, un par catégorie, en passe unique | La réitération est le mécanisme actif des virelangues ; 4 familles valent mieux que 3 |
| Catégorie unique « respiration/diction » | Mélange échauffement et souffle, et omet la projection vocale, qui est un levier efficace |
| Streak remis à zéro après un jour manqué | Non soutenu par les données sur la formation d'habitude, et psychologiquement coûteux |
| Le ressenti comme seul signal de progrès | Faiblement corrélé à l'intelligibilité réelle, voir Notes complémentaires |

## Notes complémentaires *(révisé)*

### Pourquoi le ressenti seul ne suffit pas

La version initiale de ce PRD acceptait comme limite que « le seul signal de progrès
réel vient du ressenti personnel ». La littérature montre que ce signal est **faiblement
corrélé à la réalité**, ce qui est plus grave qu'une simple imprécision :

- l'auto-évaluation de la compréhensibilité est majoritairement inexacte, et les
  locuteurs les moins compréhensibles surestiment leur performance (Trofimovich 2014) ;
- des locuteurs à qui l'on demande explicitement de se rendre plus faciles à comprendre
  ne le deviennent pas, les auteurs concluant qu'ils ne sont pas conscients de leur
  propre compréhensibilité (Strachan 2019) ;
- aucune relation significative entre intelligibilité mesurée formellement et perception
  qu'en ont les locuteurs (Walshe 2008).

C'est précisément le problème décrit en tête de ce document : se sentir clair sans être
compris. Ce n'est pas une particularité d'Ethan, c'est le fonctionnement normal de
l'auto-perception de la parole.

La solution ne consiste pas à mesurer automatiquement la voix, mais à **entraîner la
calibration** : noter avant de réécouter, puis après, et suivre l'écart. L'alignement
entre auto-évaluation et jugement réel apparaît après répétition de la tâche et
auto-évaluation explicite (Strachan 2019).

### Limite honnête qui subsiste

Aucune des études mobilisées ne porte spécifiquement sur un adulte sain qu'on comprend
mal sans pathologie identifiée. Les mécanismes sont transposables et les effets mesurés
sur les témoins sains vont dans le même sens, mais l'ampleur du gain attendu chez Ethan
n'est pas documentée. Si la difficulté est ancienne, constante et signalée par plusieurs
interlocuteurs différents, une consultation unique en orthophonie donnerait une ligne de
base mesurée et écarterait une cause structurelle. Cette application ne remplace pas un
diagnostic.
