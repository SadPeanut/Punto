import React from "react";
import PropTypes from 'prop-types'

import Global from "./Global.js";
import Card from "./Card.js";

function no_click() { }


/**
 * Composant représentant le plateau de jeu.
 * @param {object} props - Les propriétés du plateau.
 * @param {object} props.board - Les informations sur le plateau.
 * @param {number} props.board.dimx - La dimension X du plateau.
 * @param {number} props.board.dimy - La dimension Y du plateau.
 * @param {object[]} props.board.board - Le tableau représentant le plateau.
 * @param {string[]} props.player_color - Les couleurs des joueurs.
 * @param {function} props.onClick - La fonction de clic.
 * @returns {JSX.Element} La représentation JSX du plateau de jeu.
 */
function Board ({ board: { dimx, dimy, board }, player_color, onClick }) {
  const board_dimx = dimx * Global.TAILLE_DECK
  const board_dimy = dimy * Global.TAILLE_DECK
  return <div
    className="board"
    style={{ width: board_dimx + "px", height: board_dimy + "px" }}
  >
    {board.map(({ card, player, x, y, kind }, idx) => {
      return (
        <Card
          card={card}
          color={
            player === -1 ? "rgb(63, 60, 60)" : player_color[player]
          }
          x={x}
          y={y}
          kind={kind}
          onClick={
            kind === "hidden" ? no_click : onClick
          }
          key={idx}
        />
      );
    })}
  </div>
}

Board.propTypes = {
  board: PropTypes.shape({
    dimx: PropTypes.number,
    dimy: PropTypes.number,
    board: PropTypes.array,
  }).isRequired,
  player_color: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Board
