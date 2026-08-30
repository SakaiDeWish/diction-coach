# PRD - Diction Coach

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

## Critères de succès

- Le nombre de jours consécutifs de pratique atteint au moins 14 dans le mois suivant le lancement de l'application.
- Au moins 20 entrées de journal sont enregistrées sur cette même période d'un mois.

## Hors périmètre

- Enregistrement audio et analyse de la voix
- Notifications ou rappels
- Gamification poussée (points d'expérience, badges, niveaux)
- Écran d'édition de la banque d'exercices dans l'application
- Comptes utilisateurs et synchronisation cloud multi-appareils
- Parcours de difficulté progressif structuré

## Décisions d'implémentation

- Une séance quotidienne comprend 3 exercices d'affilée (virelangue, lecture à voix haute, respiration/diction), pour une durée totale visée de 5 à 10 minutes
- Le tirage des exercices évite de répéter un exercice déjà fait récemment
- Le journal propose par défaut une note globale unique et un champ de texte libre optionnel ; un mode détaillé permet de noter plusieurs critères séparément pour qui le souhaite
- Remplir le journal est optionnel après une séance
- Le compteur de régularité affiche le nombre de jours consécutifs et se réinitialise après un jour manqué
- Une fonction d'export produit un fichier contenant toutes les données, et une fonction d'import restaure les données depuis un tel fichier
- L'application est installable sur l'écran d'accueil et reste utilisable hors connexion après le premier chargement
- Sans donnée existante, l'application affiche un état de démarrage invitant à faire la première séance
- L'interface est conçue en priorité pour un usage sur téléphone, avec un affichage adapté aussi sur ordinateur

## Notes complémentaires

Sans mesure audio en v1, le seul signal de progrès réel vient du ressenti personnel consigné dans le journal et d'éventuels retours de l'entourage, pas d'une mesure objective de l'articulation elle-même. C'est une limite connue et acceptée pour cette version.
