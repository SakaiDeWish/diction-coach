/**
 * Paragraphe de référence, unique et invariant (docs/PROTOCOLE.md, section 12).
 * Il sert de point de comparaison dans le temps : le texte ne doit jamais
 * changer, sinon les enregistrements ne sont plus comparables entre eux.
 */
export const REFERENCE_PARAGRAPH =
  "Le train de sept heures quarante part du quai numéro trois. " +
  "Les voyageurs pressés cherchent leur place, posent leurs sacs, " +
  "puis regardent défiler les champs gris de novembre. " +
  "Plus loin, un contrôleur vérifie les billets sans se presser, " +
  "et le silence retombe doucement sur le wagon.";

/**
 * Consigne explicite : condition habituelle, surtout pas de sur-articulation,
 * sinon on mesure la consigne au lieu de l'acquis.
 */
export const REFERENCE_INSTRUCTION =
  "Parle normalement, comme d'habitude. N'applique pas la sur-articulation ici.";

/** Fréquence proposée de l'enregistrement de référence, en jours. */
export const REFERENCE_INTERVAL_DAYS = 30;
/** Durée maximale de l'enregistrement, en secondes. */
export const REFERENCE_MAX_SECONDS = 90;
