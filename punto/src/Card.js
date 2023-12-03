import React from 'react';
import PropTypes from 'prop-types';

import './Card.css';

import Global from './Global.js';

/**
 * Composant représentant une carte dans le jeu.
 * @param {object} props - Les propriétés de la carte.
 * @param {number} props.card - La valeur de la carte.
 * @param {string} props.color - La couleur de la carte.
 * @param {number} props.x - La coordonnée X de la carte.
 * @param {number} props.y - La coordonnée Y de la carte.
 * @param {string} props.kind - Le type de la carte ("show", "open", "hidden").
 * @param {function} props.onClick - La fonction à exécuter lorsqu'on clique sur la carte.
 * @returns {JSX.Element} La représentation JSX de la carte.
 */
function Card({ card, color, x, y, kind, onClick }) {
  return (
    <div className={`card ${kind}`}
         style={{ width: Global.TAILLE_DECK + "px",
                  height: Global.TAILLE_DECK + "px",
                  color }}
         onClick={() => onClick({ x, y })}>
      <div className="cardContent">
        {card}
      </div>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  kind: PropTypes.oneOf([
    "show",
    "open",
    "hidden",
  ]).isRequired,
  onClick: PropTypes.func,
};

Card.defaultProps = {
  x: -1,
  y: -1,
  onClick: () => null,
};

export default Card;
