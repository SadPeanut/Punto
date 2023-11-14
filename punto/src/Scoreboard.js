import React from "react";
import useFitText from "use-fit-text";
import PropTypes from "prop-types";

import './Scoreboard.css'

import Card from "./Card.js";

function Scoreboard({ player_scores, player_color, width }) {
  const { fontSize1, ref1 } = useFitText();
  const { fontSize2, ref2 } = useFitText();

  if (player_scores.some(scores => scores.length > 0)) {
    const boardPadding = 20;
    const boardMargin = 10;
    const boardWidth = width - boardPadding - 2 * boardMargin;
    const boardWidthFraction = 5;
    const scoresWidthFraction = 7;
    const totalScoreWidthFraction = 10;

    const playerNameStyle = {
      fontSize: fontSize1,
      width: `${boardWidth / boardWidthFraction}px`,
    };

    const scoresStyle = {
      width: `${(scoresWidthFraction * boardWidth) / 10}px`,
      marginLeft: `${boardMargin}px`,
    };

    const totalScoreStyle = {
      fontSize: fontSize2,
      width: `${boardWidth / totalScoreWidthFraction}px`,
      marginLeft: `${boardMargin}px`,
    };

    return (
      <div className="scoreboard" style={{ width: `${width}px` }}>
        <h4>Score</h4>
        <ul style={{ paddingLeft: `${boardPadding}px` }}>
          {player_scores.map((scores, idx) => (
            <li key={idx}>
              <div
                ref={ref1}
                className="playerName"
                style={playerNameStyle}
              >
                Player {idx}:
              </div>
              <div
                className="scores"
                style={scoresStyle}
              >
                {scores.map((score, idx2) => (
                  <Card
                    card={score}
                    color={player_color[idx]}
                    kind="show"
                    key={idx2}
                  />
                ))}
              </div>
              <div
                className="totalScore"
                ref={ref2}
                style={totalScoreStyle}
              >
                {scores.length > 1 && `= ${scores.reduce((acc, v) => acc + v)}`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}

Scoreboard.propTypes = {
  player_scores: PropTypes.array.isRequired,
  player_color: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
};

export default Scoreboard;
