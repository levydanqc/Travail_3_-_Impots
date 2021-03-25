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


function CalculerImpotEtTauxMoyen(revenu, tauxImposition) {
  let impot = 0;
  let diff = 0;

  const { paliers } = tauxImposition;

  // Itérer à travers le tableau à l'envers
  paliers.slice().reverse().forEach((palier, index) => {
    // Trouver le 1er palier imposable
    while (revenu > palier.montant) {
      /* Si 1ère itération, alors diff = revenu - montant
       * Si dernière itération, soustraire le montant personnel de base
       */
      const first = impot === 0;
      const last = index === paliers.length - 1;
      diff = paliers[index - 1].montant - (palier.montant * !first + revenu * first)
        - (palier.montantPersonnelBase * last); // montant personnel de base

      impot += diff * palier.taux;
    }
  });

  const tauxMoyen = (impot / revenu) * 100;

  return [impot.toFixed(2), tauxMoyen.toFixed(2)];
}

/* Nom, Impôt fédéral, Taux moyen fédéral, Impôt provincial, Taux moyen provincial */
jsEntree.forEach((particulier) => {
  const [impotFederal, tauxMoyenFederal] = CalculerImpotEtTauxMoyen(
    particulier.revenu, jsTaux[0].federal,
  );
  const [impotProvincial, tauxMoyenProvincial] = CalculerImpotEtTauxMoyen(
    particulier.revenu, jsTaux[0].provincial,
  );
  sortie.push({
    nom: particulier.nom,
    impotFederal,
    tauxMoyenFederal,
    impotProvincial,
    tauxMoyenProvincial,
  });
});
