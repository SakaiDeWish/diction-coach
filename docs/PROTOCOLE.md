# Protocole d'entraînement : Diction Coach

> Base de preuves et spécification du contenu de l'entraînement.
> Rédigé le 2026-08-31 à partir de la littérature académique (phonétique clinique,
> apprentissage moteur de la parole, psychologie de l'habitude).
> Ce document prime sur les intuitions de départ du PRD quand les deux divergent.
> Les divergences sont signalées explicitement.

---

## 1. Le résultat qui change tout : ralentir ne marche pas

C'est le point le plus important de tout ce document.

Tjaden, Sussman et Wilding (2014, *JSLHR*) ont fait lire des phrases à 78 locuteurs
(Parkinson, sclérose en plaques, et **témoins sains**) dans quatre conditions :
habituelle, « claire », « fort », « lent ». Les phrases ont été égalisées en amplitude
et mélangées à du brouhaha multi-locuteurs, puis jugées par des auditeurs.

**Résultat : les conditions « claire » et « fort » améliorent l'intelligibilité par
rapport à l'habituel. La condition « lent » ne l'améliore pas.** Le gain des conditions
efficaces est de 7 à 11 % sur une échelle continue.

Van Nuffelen et al. (2010) confirment de leur côté que, chez la majorité des locuteurs,
**la réduction maximale du débit ne correspond pas au gain maximal d'intelligibilité**.

### Conséquence pour le projet

La contrainte du PRD, « améliorer l'articulation sans altérer le débit naturel »,
n'est pas un compromis à négocier. C'est **la bonne stratégie**, et la littérature la
soutient mieux que l'alternative. Il faut la traiter comme un principe de conception,
pas comme une limite acceptée.

Ce que l'app doit cibler, dans l'ordre :

1. **précision articulatoire** (sur-articulation),
2. **intensité vocale** (parler plus fort, projeter),
3. **structure prosodique** (phrasé, contraste, fins de phrase),
4. le débit seulement comme effet secondaire, jamais comme consigne principale.

---

## 2. La formulation exacte de la consigne change le résultat

Lam et Tjaden (*JSLHR*, 2013), « Intelligibility of Clear Speech: Effect of Instruction »,
ont comparé trois consignes données au locuteur :

| Consigne | Gain d'intelligibilité |
|---|---|
| « Sur-articule chaque mot » | **le plus élevé** |
| « Parle à quelqu'un de malentendant » | intermédiaire |
| « Parle clairement » | le plus faible |

La consigne « sur-articule » produit aussi la plus forte modification acoustique
(espace vocalique, timing). Conclusion des auteurs : l'instruction à sur-articuler est
probablement la plus efficace dans un programme d'entraînement à la parole claire.

Aoki et al. (2024, *Journal of Phonetics*) renforcent le point : « parole claire » n'est
pas une catégorie unique. La parole adressée à un malentendant améliore l'intelligibilité,
la parole adressée à un non-natif (plus lente, moins intense) **ne l'améliore pas**.
L'image mentale que se fait le locuteur détermine le résultat.

### Conséquence pour le projet

- La consigne affichée dans l'app doit être littéralement **« Sur-articule chaque mot »**.
- Ne jamais afficher « parle clairement » ni « parle lentement » comme consigne principale.
- Si une image mentale est proposée, c'est **« comme si ton interlocuteur était
  malentendant »**, jamais « comme si c'était un étranger ».

---

## 3. Ce que la parole claire modifie réellement

Smiljanic et Bradlow (2004, *JASA*, 283 citations ; 2008, *JASA*) :

- expansion de l'espace vocalique,
- augmentation de l'étendue de hauteur (pitch range),
- **réinsertion des segments consonantiques et vocaliques élidés ou coarticulés** dans
  la parole ordinaire,
- augmentation du nombre de groupes prosodiques.

Point crucial de l'étude de 2008 : le coefficient de variation des intervalles
consonantiques et vocaliques **reste stable** entre les deux styles. Autrement dit, le
gain vient de **l'amélioration de la structure prosodique et de la segmentabilité**,
pas d'un simple étirement temporel.

### Le contre-exemple à connaître

Sereno et al. (2018) signalent que certaines modifications de parole claire
**réduisent le contraste phonémique et dégradent alors l'intelligibilité**. Le principe
correct est double : renforcer les indices **tout en préservant la distinctivité des
catégories**. Sur-articuler ne veut pas dire déformer.

### Conséquence pour le projet

Les exercices doivent viser explicitement :

- les **consonnes en milieu et fin de mot** (les premières élidées en parole ordinaire),
- les **fins de phrase** (ne pas laisser mourir l'énergie),
- le **contraste prosodique** (question vs affirmation, mise en relief).

Ajouter un avertissement dans les consignes : exagérer les mouvements, pas déformer
les sons.

---

## 4. Ordonnancement de la pratique : bloqué puis aléatoire

Jones, Ballard et al. (2016, *Motor Control*), « The Effect of Blocked, Random and Mixed
Practice Schedules on Speech Motor Learning of Tongue Twisters in Unimpaired Speakers ».
Population : **locuteurs sans trouble**, donc directement transposable à Ethan.

Résultat : les programmes **aléatoire** et **bloqué-puis-aléatoire** donnent une
précision supérieure à la fin de l'acquisition **et au test de rétention à une semaine**.
Le programme purement bloqué est inférieur en rétention.

Tasko (2015) et la littérature générale d'apprentissage moteur vont dans le même sens :
la pratique massée aide l'acquisition initiale, la pratique distribuée et variable
sert la rétention et le transfert.

### Conséquence pour le projet : correction de l'algorithme

L'algorithme actuel (tirage rotatif de 3 exercices différents, sans répétition récente)
est de la **pratique aléatoire pure**. C'est déjà mieux que du bloqué pur, mais ce n'est
pas l'optimum mesuré.

Structure recommandée :

- **À l'intérieur d'une séance** : bloc de répétitions du *même* virelangue
  (6 à 8 réitérations), puis passage à une phase variable.
- **Entre les séances** : tirage aléatoire, sans répétition récente. L'algorithme
  existant convient pour ce niveau.
- Pour un exercice **nouveau**, commencer bloqué ; une fois acquis, le basculer en
  aléatoire.

Le modèle mental : *bloqué pour apprendre, aléatoire pour retenir.*

---

## 5. Les virelangues fonctionnent, et on connaît la dose

Ohkubo et al. (2025, *Bulletin of Tokyo Dental College*) : entraînement aux virelangues
ciblant pointe et dos de langue, **5 fois par semaine pendant 1 mois**, chez des
locutrices japonaises saines. Mesures : diadococinésie orale et imagerie ultrasonore.

Résultats :

- amélioration significative du nombre de répétitions par seconde pour /ta/ et /ka/
  après 1 mois,
- gain maintenu à **7 mois** pour /ta/,
- **diminution de la distance de mouvement vertical de la langue** pour les deux
  syllabes, c'est-à-dire une articulation plus efficace, pas seulement plus rapide.

Tergujeff et al. (2023, *Foreign Language Annals*) : chez des apprenants de L2, les
virelangues battent l'entraînement sur phrases authentiques pour la prononciation, et
sont perçus positivement.

Wilshire (1999) précise le mécanisme : ce qui induit la difficulté, c'est la
**réitération répétée** et la **similarité des phonèmes**. Un virelangue est un
stresseur d'encodage phonologique, pas seulement un exercice musculaire.

### Conséquence pour le projet

- **5 séances par semaine minimum** est la dose validée. Le quotidien du PRD est
  au-dessus, donc correct.
- Le bénéfice se mesure à **1 mois** et persiste à 7 mois. Horizon réaliste confirmé.
- Exploiter la **réitération** : répéter le même virelangue plusieurs fois d'affilée,
  pas le dire une fois et passer au suivant.
- Sélectionner des virelangues à **phonèmes similaires** (/s/-/ʃ/, /t/-/k/, /p/-/b/),
  c'est ce qui crée la charge utile.

---

## 6. Le point faible du projet : l'auto-perception n'est pas fiable

C'est la critique centrale du PRD dans sa forme actuelle.

Le PRD acte que « le seul signal de progrès réel vient du ressenti personnel consigné
dans le journal », et considère cela comme une limite acceptée. La littérature dit que
ce signal est **faiblement corrélé à la réalité**, ce qui est plus grave qu'une simple
imprécision.

- **Trofimovich et al. (2014, *Bilingualism*)** : l'auto-évaluation de la
  compréhensibilité est majoritairement inexacte. Les locuteurs les moins compréhensibles
  **surestiment** leur performance ; les meilleurs la sous-estiment.
- **Strachan et al. (2019, *Journal of Second Language Pronunciation*)** : on demande à
  des locuteurs de rendre leur parole aussi facile à comprendre que possible. Ils
  **ne deviennent pas plus compréhensibles**, qu'on les y invite ou non. Les auteurs
  concluent que les locuteurs ne sont pas conscients de leur propre compréhensibilité.
- **Walshe et al. (2008, *IJLCD*)** : aucune relation statistiquement significative entre
  les scores d'intelligibilité mesurés formellement et la perception qu'en ont les
  locuteurs eux-mêmes.

Cela explique directement le problème rapporté par Ethan : se sentir clair dans sa tête
tout en n'étant pas compris. Ce n'est pas une bizarrerie personnelle, c'est le
fonctionnement normal de l'auto-perception de la parole.

### Mais Strachan donne aussi la solution

Dans la même étude, l'alignement entre auto-évaluation et jugement des auditeurs
apparaît **après répétition de la tâche et auto-évaluation explicite**. La calibration
s'acquiert, elle ne se décrète pas.

### Conséquence pour le projet : la fonctionnalité manquante

Il faut une **boucle d'auto-évaluation calibrée**, dans cet ordre précis :

1. L'utilisateur produit un échantillon (parole spontanée, 60 à 90 s), **enregistré**.
2. Il **prédit** sa note avant de réécouter. C'est cette prédiction qui entraîne la
   calibration.
3. Il réécoute.
4. Il note à nouveau.
5. L'app affiche **l'écart entre prédiction et note après écoute**. Cet écart est
   l'indicateur de calibration, et il doit se réduire dans le temps.

Techniquement, cela ne demande aucune analyse audio : `MediaRecorder` du navigateur
suffit, l'audio reste en local (IndexedDB), rien ne sort de l'appareil. Cela reste
donc compatible avec la contrainte « pas d'analyse de la voix » du PRD, qui excluait
l'analyse automatique, pas l'enregistrement.

**Recommandation : faire passer cette boucle avant les phases 5 et 6 du plan actuel.**
Sans elle, l'app entraîne une régularité sans garantir qu'elle entraîne la bonne chose.

---

## 7. Attention au miroir

Casserly et Marino (2024, *Frontiers in Human Neuroscience*) : la parole produite
**devant un miroir** est jugée **moins intelligible** que la parole de référence, par
des auditeurs naïfs, en l'absence de toute autre manipulation sensorielle.

C'est contre-intuitif et cela contredit le conseil grand public le plus répandu
(« entraîne-toi devant un miroir »).

### Conséquence pour le projet

Utiliser le miroir uniquement pour **vérifier statiquement** une position (ouverture de
mâchoire, position des lèvres), pas comme retour pendant la production continue. Ne pas
en faire une consigne d'exercice.

---

## 8. La parole interactive bat la parole claire en solo

Krajewski et al. (2026, *JASA*) comparent parole habituelle, parole claire et
**parole interactive structurée**. L'intelligibilité et le temps de réponse des auditeurs
sont **meilleurs en parole interactive qu'en parole claire**.

Ghayedlou et al. (2025, *JASA*) et Robertson et al. (2024, *JASA*) montrent le mécanisme :
quand un interlocuteur signale une incompréhension (« ??? » ou une méprise précise), le
locuteur produit spontanément une hyper-articulation ciblée, et la nature du retour
change la nature de la correction.

### Conséquence pour le projet

L'entraînement en solo a un plafond. Il faut un pont vers l'interaction réelle :

- une étape « parle 60 à 90 s à quelqu'un » une fois par semaine, avec consigne de
  demander un retour honnête,
- ou, à défaut, la lecture face à un dispositif de reconnaissance vocale qui « échoue »
  visiblement, ce qui reproduit le signal d'incompréhension.

---

## 9. Le retour d'information : moins souvent, mais l'évidence est fragile

L'état de la littérature, honnêtement :

**En faveur d'un retour réduit :**
- Weir-Mayta et al. (2022) : chez des adultes âgés, un retour tous les 5 essais donne
  une **meilleure rétention à 2-4 jours** qu'un retour à chaque essai.
- Lowe et al. (2017, *JSLHR*) : le groupe à 50 % de retour montre le meilleur
  raffinement de la durée à long terme.
- Austermann Hula et al. (2008, *JSLHR*) : retour réduit ou différé améliore
  l'apprentissage chez 3 participants apraxiques sur 4.
- Aoyagi et al. (2019) : un retour **dégressif** prolonge l'effet d'apprentissage.

**Contre, et c'est sérieux :**
- **McKay et al. (2022, *Psychology of Sport and Exercise*)** : méta-analyse de 61
  articles, N = 2228. **Aucun effet significatif de la fréquence réduite de retour, à
  aucun moment de mesure.** Hétérogénéité importante, études sévèrement sous-puissantes,
  soupçon de biais de publication. Les auteurs concluent que les preuves robustes
  manquent.
- Maas et al. (2012) : résultats mitigés chez l'enfant apraxique, 2 sur 4.
- Marco-Ahulló et al. (2024) : c'est le groupe à **67 %** qui progresse, pas les groupes
  à fréquence plus basse.

### Conséquence pour le projet

Ne pas sur-concevoir cette dimension. Le principe robuste qui survit à la controverse
est **le délai avant le retour**, pas sa rareté : laisser l'apprenant s'auto-évaluer
d'abord, puis lui donner l'information. C'est exactement la boucle décrite en section 6.

En pratique : auto-évaluation à chaque séance, réécoute effective environ 1 séance sur 3
plutôt que systématique. Ne pas prétendre à une précision que la littérature n'a pas.

---

## 10. La série de jours (streak) : le mécanisme actuel est trop punitif

### Combien de temps pour une habitude

- **Lally et al. (2010, *EJSP*, 1870 citations)** : 96 volontaires, comportement
  quotidien en contexte constant, 12 semaines. Le temps pour atteindre 95 % du plateau
  d'automaticité va de **18 à 254 jours**, médiane classiquement citée à 66 jours.
- **Singh et al. (2024, *Healthcare*)**, méta-analyse, 20 études, 2601 participants :
  médianes de **59 à 66 jours**, moyennes de 106 à 154 jours, variabilité individuelle
  de 4 à 335 jours.
- **Keller et al. (2021, *BJHP*)**, ECR, N = 192, 84 jours : médiane de **59 jours** pour
  atteindre le pic d'automaticité. Ancrer sur une **routine** ou sur une **heure fixe**
  fonctionne aussi bien. Le prédicteur clé est **la répétition effective du plan**.

### Le point qui invalide la règle actuelle

Lally et al. (2010) rapportent explicitement que **manquer une occasion de réaliser le
comportement n'affecte pas matériellement le processus de formation de l'habitude.**

Or le PRD prévoit une remise à zéro du compteur après **un seul** jour manqué
(user story 9, phase 2). Cette règle :

- n'est pas soutenue par les données sur la formation d'habitude,
- crée un coût psychologique disproportionné à un événement sans conséquence réelle,
- et augmente le risque d'abandon complet après un accident de parcours, qui est le
  vrai mode d'échec d'un outil auto-dirigé.

### Conséquence pour le projet : correction recommandée

- Autoriser **un jour manqué sans remise à zéro** (jour de grâce). Remise à zéro à
  partir de deux jours consécutifs manqués.
- Afficher en parallèle un indicateur **non fragile** : nombre de séances sur les 30
  derniers jours. C'est cet indicateur qui reflète la dose réelle, et c'est lui qui
  compte pour le résultat.
- **Ancrer la séance à un déclencheur contextuel stable** (après le petit-déjeuner,
  au retour des cours). Bürgler et al. (2026) identifient la stabilité du contexte, la
  motivation autonome, la fréquence et la faible difficulté perçue comme prédicteurs de
  la force de l'habitude. L'app devrait demander ce déclencheur au premier lancement.

### Correction de l'horizon annoncé

Le critère de succès du PRD (14 jours consécutifs dans le mois suivant, 20 entrées de
journal) est un bon **indicateur de processus**, mais il ne mesure pas le résultat et
son horizon est trop court. L'horizon réel d'automatisation est de **2 mois environ**,
avec une forte variabilité individuelle.

---

## 11. Le contexte d'entretien : entraîner sous stress

Le stress augmente la charge cognitive et limite l'accès au lexique. Sur le plan
physiologique, l'éveil augmente la pression respiratoire et la tension des cordes
vocales, ce qui peut **accélérer le tempo d'articulation** chez certains locuteurs.

Le principe de spécificité de la pratique implique que si le but est de bien articuler
en entretien, une partie de l'entraînement doit se faire dans des conditions proches.

### Conséquence pour le projet

Ajouter une modalité **« séance en conditions »**, une fois par semaine :

- une question type d'entretien tirée au sort, affichée avec un compte à rebours court
  de préparation (30 s),
- réponse debout, à voix haute, 90 s, enregistrée,
- consigne unique et explicite : **sur-articuler**.

C'est le format qui rapproche le plus la pratique de la cible.

---

## 12. Mesurer le progrès sans analyse vocale

### Ce qui ne marche pas seul

- Le ressenti (section 6).
- La reconnaissance vocale automatique : le taux d'erreur de mots (WER) est utilisé
  comme mesure inverse d'intelligibilité et validé en dysarthrie, **mais sa stabilité
  est faible précisément pour les locuteurs typiques et légèrement atteints**, ce qui
  est la catégorie d'Ethan. Utile comme signal grossier, inutilisable comme instrument
  de précision.

### Ce qui marche

**Le jugement d'auditeurs naïfs est l'étalon.** C'est la mesure utilisée dans toutes les
études citées ici. Elle est gratuite et accessible.

Protocole mensuel recommandé :

1. Enregistrer **le même paragraphe de référence** à J0, J30, J60, J90, en condition
   habituelle (pas en sur-articulation, sinon on mesure la consigne et non l'acquis).
2. Faire écouter deux enregistrements à un proche, **sans lui dire lequel est le plus
   récent**, et demander lequel est le plus facile à comprendre. Comparaison par paires,
   à l'aveugle.
3. En complément grossier : dicter le même paragraphe dans la dictée vocale du
   téléphone, compter les mots mal transcrits.

L'app peut stocker ces enregistrements de référence et gérer la comparaison par paires
à l'aveugle. C'est une fonctionnalité à faible coût technique et à fort contenu
informatif.

---

## 13. Structure de séance recommandée

Durée cible 8 à 11 min, quotidienne, ancrée sur un déclencheur contextuel fixe.

| # | Étape | Durée | Contenu | Justification |
|---|---|---|---|---|
| 0 | Ancrage | . | Même moment, même contexte chaque jour | Keller 2021, Bürgler 2026 |
| 1 | Échauffement | 45 s | Bâillement-fredonnement, trilles de lèvres, voyelles A-E-I-O-U très ouvertes, une respiration diaphragmatique | Ouverture mâchoire, soutien du souffle |
| 2 | Virelangue, bloc | 2 min | **Le même** virelangue, 6 à 8 réitérations, phonèmes similaires, vitesse croissante sans sacrifier un son | Jones 2016 (bloqué), Ohkubo 2025, Wilshire 1999 |
| 3 | Lecture, variable | 2-3 min | Texte lu avec la consigne **« Sur-articule chaque mot »**. Insister sur consonnes finales et fins de phrase. Inspirer à chaque ponctuation, porter la phrase jusqu'au point | Lam & Tjaden 2013, Smiljanic 2008 |
| 4 | Projection | 30 s | Une phrase répétée en augmentant l'intensité vocale, sans crier ni forcer | Tjaden 2014 (condition « fort ») |
| 5 | Transfert, enregistré | 60-90 s | Parole spontanée sur consigne tirée au sort, en appliquant la sur-articulation | Krajewski 2026, spécificité de la pratique |
| 6 | Auto-évaluation calibrée | 45 s | **Noter avant d'écouter**, puis réécouter, puis renoter. L'app affiche l'écart | Strachan 2019, Trofimovich 2014 |

Modulations :

- **1 séance par semaine « en conditions »** : question d'entretien, debout, 30 s de
  préparation, 90 s de réponse (section 11).
- **1 fois par mois** : enregistrement du paragraphe de référence, comparaison à
  l'aveugle par un proche (section 12).
- **Réécoute effective** environ 1 séance sur 3 plutôt qu'à chaque fois (section 9).

---

## 14. Récapitulatif des corrections à apporter au PRD et au PLAN

| # | Élément actuel | Correction | Source |
|---|---|---|---|
| 1 | Le ralentissement implicitement valorisé | Cibler précision, intensité et prosodie. Le ralenti n'est qu'un outil de drill | Tjaden 2014, Van Nuffelen 2010 |
| 2 | Consigne d'exercice non spécifiée | Afficher littéralement « Sur-articule chaque mot » | Lam & Tjaden 2013 |
| 3 | Tirage aléatoire pur des 3 exercices | Bloqué dans la séance, aléatoire entre séances | Jones 2016 |
| 4 | Streak remis à zéro après 1 jour manqué | 1 jour de grâce, remise à zéro à 2 jours. Ajouter « séances sur 30 jours » | Lally 2010 |
| 5 | Pas de déclencheur contextuel | Demander un ancrage au premier lancement | Keller 2021, Bürgler 2026 |
| 6 | Ressenti comme seul signal de progrès | Ajouter enregistrement local + auto-évaluation calibrée (noter avant d'écouter) | Trofimovich 2014, Strachan 2019, Walshe 2008 |
| 7 | Pas d'exercice de transfert | Ajouter parole spontanée enregistrée, et une séance hebdomadaire en conditions d'entretien | Krajewski 2026 |
| 8 | Pas de mesure objective | Paragraphe de référence mensuel + comparaison par paires à l'aveugle par un proche | Standard de toutes les études citées |
| 9 | Horizon de succès à 1 mois | Horizon d'automatisation à ~2 mois, variabilité 18 à 254 jours | Lally 2010, Singh 2024, Keller 2021 |
| 10 | Catégorie « respiration/diction » vague | Séparer échauffement mâchoire/lèvres et projection vocale | Tjaden 2014 |

### Priorisation recommandée

1. **Corrections 1, 2, 3, 4** : peu coûteuses, elles touchent le contenu et
   l'algorithme existants. À faire avant toute nouvelle phase.
2. **Correction 6** (enregistrement + auto-évaluation calibrée) : c'est la
   fonctionnalité à plus fort levier du projet. À faire passer **avant** les phases 5
   (export/import) et 6 (PWA) du plan actuel.
3. **Corrections 7, 8, 11** : nouvelle phase dédiée au transfert et à la mesure.
4. Phases 5 et 6 du plan existant ensuite.

---

## 15. Limite honnête de ce protocole

Toutes les études d'intelligibilité citées portent soit sur des populations cliniques
(Parkinson, sclérose en plaques, apraxie, dysarthrie), soit sur des locuteurs sains dans
des tâches de laboratoire, soit sur l'apprentissage d'une langue seconde. **Aucune ne
porte spécifiquement sur un adulte sain qu'on comprend mal sans pathologie identifiée.**

Les mécanismes (sur-articulation, intensité, prosodie, apprentissage moteur, formation
d'habitude) sont transposables et les effets mesurés sur les témoins sains vont dans le
même sens. Mais l'ampleur de l'effet attendu chez Ethan n'est pas documentée.

Si la difficulté est ancienne, constante et signalée par plusieurs interlocuteurs
différents, **une consultation unique chez un orthophoniste** vaut le coût : elle
écarterait une cause structurelle (audition, frein de langue, trouble léger non
diagnostiqué) et donnerait une ligne de base mesurée. Ce protocole reste valable dans
tous les cas, mais il ne remplace pas un diagnostic.

---

## Références

**Parole claire et intelligibilité**
- Tjaden, Sussman & Wilding (2014). *Impact of Clear, Loud, and Slow Speech on Scaled Intelligibility and Speech Severity in Parkinson's Disease and Multiple Sclerosis.* JSLHR. https://pubmed.ncbi.nlm.nih.gov/24687042/
- Lam & Tjaden (2013). *Intelligibility of Clear Speech: Effect of Instruction.* JSLHR.
- Smiljanic & Bradlow (2004). *Production and perception of clear speech in Croatian and English.* JASA.
- Smiljanic & Bradlow (2008). *Temporal organization of English clear and conversational speech.* JASA.
- Aoki et al. (2024). *Being clear about clear speech.* Journal of Phonetics.
- Sereno et al. (2018). *Linking production and perception of clear speech.* JASA.
- Tjaden & Wilding (2004). *Rate and loudness manipulations in dysarthria.* JSLHR.
- Van Nuffelen et al. (2010). *Effect of Rate Control on Speech Production and Intelligibility in Dysarthria.* Folia Phoniatrica.
- Krajewski et al. (2026). *Characterizing listener perception of dysarthric speech beyond speech intelligibility.* JASA.
- Ghayedlou et al. (2025). *Examining effects of specific feedback on the acoustic characteristics of clearly spoken nasal consonants.* JASA.

**Apprentissage moteur de la parole**
- Jones, Ballard et al. (2016). *The Effect of Blocked, Random and Mixed Practice Schedules on Speech Motor Learning of Tongue Twisters in Unimpaired Speakers.* Motor Control.
- Tasko (2015). *Effect of practice type on acquisition and retention of speech motor skills.* JASA.
- Weir-Mayta et al. (2022). *Feedback Schedule Effects on Speech Motor Learning in Older Adults.* Physical Activity and Health.
- Lowe et al. (2017). *The Impact of Feedback Frequency on Performance in a Novel Speech Motor Learning Task.* JSLHR.
- Austermann Hula et al. (2008). *Effects of feedback frequency and timing on acquisition, retention, and transfer of speech skills in acquired apraxia of speech.* JSLHR.
- Maas et al. (2012). *Feedback frequency in treatment for childhood apraxia of speech.* AJSLP.
- McKay et al. (2022). *Meta-analysis of the reduced relative feedback frequency effect on motor learning and performance.* Psychology of Sport and Exercise.
- Aoyagi et al. (2019). *Feedback protocol of 'fading knowledge of results' is effective for prolonging motor learning retention.* JPTS.

**Virelangues**
- Ohkubo et al. (2025). *Evaluating Effectiveness of Articulation Practice with Tongue-twister Movement Distance Using Ultrasound.* Bulletin of Tokyo Dental College.
- Tergujeff et al. (2023). *Teaching classic put to the test: Do tongue twisters work for L2 pronunciation?* Foreign Language Annals.
- Wilshire (1999). *The "Tongue Twister" Paradigm as a Technique for Studying Phonological Encoding.* Language and Speech.

**Auto-perception**
- Trofimovich et al. (2014). *Flawed self-assessment: Investigating self- and other-perception of second language speech.* Bilingualism: Language and Cognition.
- Strachan et al. (2019). *Second language speakers' awareness of their own comprehensibility.* Journal of Second Language Pronunciation.
- Walshe et al. (2008). *Intelligibility of dysarthric speech: perceptions of speakers and listeners.* IJLCD.
- Casserly & Marino (2024). *Mirrors and toothaches: commonplace manipulations of non-auditory feedback availability change perceived speech intelligibility.* Frontiers in Human Neuroscience.

**Formation d'habitude**
- Lally et al. (2010). *How are habits formed: Modelling habit formation in the real world.* EJSP.
- Singh et al. (2024). *Time to Form a Habit: A Systematic Review and Meta-Analysis.* Healthcare.
- Keller et al. (2021). *Habit formation following routine-based versus time-based cue planning: A randomized controlled trial.* BJHP.
- Bürgler et al. (2026). *What Makes a Habit? Investigating Potential Determinants of Habit Formation.* PSPB.
- Gardner et al. (2019). *Habit Formation and Behavior Change.* Oxford Research Encyclopedia of Psychology.
