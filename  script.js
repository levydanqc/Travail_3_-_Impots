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

// Conversion des données crues en objet JS
const jsEntree = JSON.parse(entree);
const jsTaux = JSON.parse(taux);

jsEntree.forEach((particulier) => {
  sortie.push({ nom: particulier.nom });
});

