/* eslint-disable strict */
/* eslint-disable no-console */

/** @type {JsonString} Données crues */
const entree = `[
    {
      "nom": "Alice X",
      "revenus": "60000"
    },
    {
      "nom": "Bob Yota",
      "revenus": "10000"
    },
    {
      "nom": "Charlie Zeta",
      "revenus": "1000000"
    }
  ]`;
/** @type {JsonString} Données crues */
const taux = `[
    {
      "federal": {
        "montantPersonnelBase": 13808,
        "paliers": [
          {
            "montant": 0,
            "taux": 0.15
          },
          {
            "montant": 49020,
            "taux": 0.205
          },
          {
            "montant": 98040,
            "taux": 0.26
          },
          {
            "montant": 151978,
            "taux": 0.29
          },
          {
            "montant": 216511,
            "taux": 0.33
          }
        ]
      },
      "provincial": {
        "montantPersonnelBase": 15728,
        "paliers": [
          {
            "montant": 0,
            "taux": 0.15
          },
          {
            "montant": 45105,
            "taux": 0.2
          },
          {
            "montant": 90200,
            "taux": 0.24
          },
          {
            "montant": 109755,
            "taux": 0.2575
          }
        ]
      }
    }
  ]`;
/** @type {Object[]} Tableau des données des particuliers */
const sortie = [];
/** @type {Object} Objet JS depuis la chaine JSON */
const jsEntree = JSON.parse(entree);
/** @type {Object} Objet JS depuis la chaine JSON */
const jsTaux = JSON.parse(taux);

/**
 * Calcul le montant total d'impot ainsi que le taux
 * moyen d'après le revenu annuel.
 * @param {number} revenu Montant du revenu total annuel
 * @param {Object} tauxImposition Liste des taux d'imposition
 * @return {number[]} Somme d'impôt, Taux moyen d'imposition
 */
function CalculerImpotEtTauxMoyen(revenu, tauxImposition) {
  let impot = 0;
  let diff = 0;

  const { paliers } = tauxImposition;
  const paliersInverse = paliers.slice().reverse();
  // Itérer à travers le tableau à l'envers
  paliersInverse.forEach((palier, index) => {
    // Trouver le 1er palier imposable
    if (revenu > palier.montant) {
      /* Si 1ère itération, alors diff = revenu - montant
       * Si dernière itération, soustraire le montant personnel de base
       */
      const last = index === paliersInverse.length - 1;
      if (impot === 0) {
        diff = revenu - palier.montant
          - (tauxImposition.montantPersonnelBase * last); // montant personnel de base
      } else {
        diff = paliersInverse[index - 1].montant - palier.montant
          - (tauxImposition.montantPersonnelBase * last); // montant personnel de base
      }
      if (diff < 0) {
        return 0;
      }
      impot += diff * palier.taux;
    }
  });

  const tauxMoyen = (impot / revenu) * 100;

  return [impot.toFixed(2), tauxMoyen.toFixed(2)];
}

/* Nom, Impôt fédéral, Taux moyen fédéral, Impôt provincial, Taux moyen provincial */
jsEntree.forEach((particulier) => {
  const [impotFederal, tauxMoyenFederal] = CalculerImpotEtTauxMoyen(
    particulier.revenus, jsTaux[0].federal,
  );
  const [impotProvincial, tauxMoyenProvincial] = CalculerImpotEtTauxMoyen(
    particulier.revenus, jsTaux[0].provincial,
  );
  sortie.push({
    nom: particulier.nom,
    impotFederal,
    tauxMoyenFederal,
    impotProvincial,
    tauxMoyenProvincial,
  });
});
