/**
 * Classe représentant des fonctions utilitaires globales pour un jeu.
 */
class Global {
  /**
   * Le jeu de cartes.
   * @type {number[]}
   */
  static DECK = [9,9,9,9,8,8,8,8,7,7,7,7,6,6,6,6,5,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,1,1,1,1];

  /**
   * Taille totale du jeu de cartes.
   * @type {number}
   */
  static TAILLE_DECK = 50;

  /**
   * Taille du tableau.
   * @type {number}
   */
  static TAILLE_TABLEAU = 6;

  /**
   * Convertit une coordonnée unidimensionnelle en coordonnée bidimensionnelle.
   * @param {number} idx - L'indice unidimensionnel.
   * @param {number} dimx - La dimension X.
   * @param {number} dimy - La dimension Y.
   * @returns {{x: number, y: number}} La coordonnée bidimensionnelle.
   */
  static coord1d2d(idx, dimx, dimy) {
    return {
      x: idx % dimx,
      y: Math.trunc(idx / dimx),
    };
  }

  /**
   * Convertit une coordonnée bidimensionnelle en indice unidimensionnel.
   * @param {number} x - La coordonnée X.
   * @param {number} y - La coordonnée Y.
   * @param {number} dimx - La dimension X.
   * @param {number} dimy - La dimension Y.
   * @returns {number} L'indice unidimensionnel.
   */
  static coord2d1d(x, y, dimx, dimy) {
    return y * dimx + x;
  }

  /**
   * Mélange les éléments dans le tableau.
   * @param {any[]} a - Le tableau à mélanger.
   * @returns {any[]} Le tableau mélangé.
   */
  static melanger(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

export default Global;
