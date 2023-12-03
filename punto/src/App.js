import React, { Component } from "react";
import "./App.css";

import Global from "./Global.js";
import Card from "./Card.js";
import Board from "./Board.js";
import Scoreboard from "./Scoreboard.js";


// Fonction pour envoyer les données vers la route /Partie
const sendData = async (gameData, dataBase) => {
  console.log("data sendGameData", gameData, dataBase)
  try {
    const response = await fetch('http://localhost:5000/Partie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gameData, dataBase }), // Inclure le type de base de données
    });

    if (response.ok) {
      console.log('Données envoyées avec succès');
    } else {
      console.error('Erreur lors de l\'envoi des données');
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
};

const sendPlay = async (playData, dataBase) => {
  console.log("data sendPlayData", playData, dataBase)
  try {
    const response = await fetch('http://localhost:5000/Plays', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playData, dataBase }), // Inclure le type de base de données
    });

    if (response.ok) {
      console.log('Données envoyées avec succès');
    } else {
      console.error('Erreur lors de l\'envoi des données');
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
}


const {
  coord1d2d,
  coord2d1d,
  shuffle,
  TAILLE_TABLEAU,
  DECK,
  TAILLE_DECK,
} = Global;

function no_card (x, y) {
  return {
    card: -1,
    player: -1,
    x: x,
    y: y,
    kind: "hidden",
  }
}

const DEFAULT_STATE = () => {
  const empty_board = [];
  for (var i = 0; i < (TAILLE_TABLEAU + 1) * (TAILLE_TABLEAU + 1); i++) {
    const { x, y } = coord1d2d(i, TAILLE_TABLEAU + 1, TAILLE_TABLEAU + 1);
    empty_board.push({
      card: -1,
      player: -1,
      x: x - Math.trunc(TAILLE_TABLEAU / 2),
      y: y - Math.trunc(TAILLE_TABLEAU / 2),
      kind: "hidden",
    });
  }

  return {
    n_players: 4,
    cur_player: 0,
    player_color: ["red", "cyan", "green", "yellow"],
    player_deck: [shuffle([...DECK]), shuffle([...DECK]), shuffle([...DECK]), shuffle([...DECK])],
    player_scores: [[], [], [], []],
    plays: [],

    // board on screen
    board: {
      dimx: TAILLE_TABLEAU + 1,
      dimy: TAILLE_TABLEAU + 1,
      minx: -Math.trunc(TAILLE_TABLEAU / 2) - 1,
      miny: -Math.trunc(TAILLE_TABLEAU / 2) - 1,
      board: empty_board,
    },

    // virtual board, before its width/height reaches board_dim, it is centered
    // on screen
    virtual_board: {
      minx: 0,
      maxx: 0,
      miny: 0,
      maxy: 0,
    },

    won: false,
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...DEFAULT_STATE(), selectedDataBase: "MongoDB", nbTours: 0 };
    this.playsMongoDB = {
      plays_joueur1: [],
      plays_joueur2: [],
      plays_joueur3: [],
      plays_joueur4: []
    };
  }

  componentDidMount() {
    this.setup();
  }

  reset = () => {
    this.setState(DEFAULT_STATE(), this.setup);
  };

  setup() {
    this.update_board();
  }

  next_round = async () => {

    console.log("next round")
    const scores = this.state.player_scores;

    const {nbTours} = this.state;
    const nbToursPlusUn = nbTours + 1;
    this.setState({nbTours: nbToursPlusUn});

    const gameData = {
      id_joueur_gagnant: this.state.cur_player,
      manches_gagnees: this.state.player_scores[this.state.cur_player].length,
      nbTours: nbToursPlusUn,
      points_joueur1: this.state.player_scores[0].reduce((a, b) => a + b, 0),
      points_joueur2: this.state.player_scores[1].reduce((a, b) => a + b, 0),
      points_joueur3: this.state.player_scores[2].reduce((a, b) => a + b, 0),
      points_joueur4: this.state.player_scores[3].reduce((a, b) => a + b, 0),
    };

    const gameDataMongo = {
      id_joueur_gagnant: this.state.cur_player,
      manches_gagnees: this.state.player_scores[this.state.cur_player].length,
      nbTours: nbToursPlusUn,
      points_joueur1: this.state.player_scores[0].reduce((a, b) => a + b, 0),
      points_joueur2: this.state.player_scores[1].reduce((a, b) => a + b, 0),
      points_joueur3: this.state.player_scores[2].reduce((a, b) => a + b, 0),
      points_joueur4: this.state.player_scores[3].reduce((a, b) => a + b, 0),
      plays_joueur1: this.playsMongoDB.plays_joueur1,
      plays_joueur2: this.playsMongoDB.plays_joueur2,
      plays_joueur3: this.playsMongoDB.plays_joueur3,
      plays_joueur4: this.playsMongoDB.plays_joueur4,
    };

    this.setup()

    console.log(gameData);


    if (gameData.manches_gagnees === 2) {

      if(this.state.selectedDataBase !== "MongoDB") {
        sendData(gameData, this.state.selectedDataBase)
          .then(() => {
            // Si les données sont envoyées avec succès, réinitialise les scores
            const emptyScores = [[], [], [], []];
            this.setState({ player_scores: emptyScores });
          })
          .catch((error) => {
            console.error('Erreur lors de l\'envoi des données :', error);
          });
        }else{
          
          sendData(gameDataMongo, this.state.selectedDataBase)
          .then(() => {
            // Si les données sont envoyées avec succès, réinitialise les scores
            const emptyScores = [[], [], [], []];
            this.setState({ player_scores: emptyScores });
          })
          .catch((error) => {
            console.error('Erreur lors de l\'envoi des données :', error);
          });
        }
    }

    try {
      this.setState(DEFAULT_STATE(), async () => {
        this.setState({ player_scores: scores }, async () => {
          this.setup();
        });
      });
    } catch (error) {
      console.error('Error in next_round:', error);
    }
  };

  mk_board() {
    const {
      plays,
      virtual_board: { minx, maxx, miny, maxy },
      won,
    } = this.state;

    const board_width = maxx - minx;
    const board_height = maxy - miny;

    const actual_dimx = board_width < TAILLE_TABLEAU ? TAILLE_TABLEAU + 1 : TAILLE_TABLEAU;
    const actual_dimy = board_height < TAILLE_TABLEAU ? TAILLE_TABLEAU + 1 : TAILLE_TABLEAU;

    const empty_left_size =
      board_width < TAILLE_TABLEAU
        ? Math.trunc((TAILLE_TABLEAU - board_width) / 2) + 1
        : 0;
    const empty_top_size =
      board_height < TAILLE_TABLEAU
        ? Math.trunc((TAILLE_TABLEAU - board_height) / 2) + 1
        : 0;

    const actual_minx = minx - empty_left_size;
    const actual_miny = miny - empty_top_size;

    const result = [];
    for (var i = 0; i < actual_dimx * actual_dimy; i++) {
      const { x, y } = coord1d2d(i, actual_dimx, actual_dimy);
      result.push(no_card(x + actual_minx, y + actual_miny));
    }

    if (!won && (board_width === 0 || board_height === 0)) {
      // no card played yet, minx = maxx = miny = maxy = 0
      const center_x = [];
      if (actual_dimx % 2 === 0) {
        center_x.push(actual_dimx / 2);
        center_x.push(actual_dimx / 2 - 1);
      } else {
        center_x.push((actual_dimx - 1) / 2);
      }

      const center_y = [];
      if (actual_dimy % 2 === 0) {
        center_y.push(actual_dimy / 2);
        center_y.push(actual_dimy / 2 - 1);
      } else {
        center_y.push((actual_dimy - 1) / 2);
      }

      for (var x of center_x) {
        for (var y of center_y) {
          const idx = coord2d1d(x, y, actual_dimx, actual_dimy);
          result[idx].kind = "open";
        }
      }
    }

    for (const { player, card, x, y } of plays) {
      const actual_x = x - actual_minx;
      const actual_y = y - actual_miny;
      const idx = coord2d1d(actual_x, actual_y, actual_dimx, actual_dimy);
      result[idx].card = card;
      result[idx].player = player;
      result[idx].kind = "show";

      if (!won) {
        for (const modx of [-1, 0, 1]) {
          const x = actual_x + modx;
          if (x >= 0 && x < actual_dimx) {
            for (const mody of [-1, 0, 1]) {
              const y = actual_y + mody;
              if (y >= 0 && y < actual_dimy) {
                const idx = coord2d1d(x, y, actual_dimx, actual_dimy);
                if (result[idx].kind === "hidden") {
                  result[idx].kind = "open";
                }
              }
            }
          }
        }
      }
    }

    return {
      dimx: actual_dimx,
      dimy: actual_dimy,
      minx: actual_minx,
      miny: actual_miny,
      board: result,
    };
  }

  update_board() {
    const board = this.mk_board();
    this.setState({ board }, this.win_condition);
  }

  board_coord(x, y) {
    const { dimx, dimy, minx, miny } = this.state.board;
    return coord2d1d(x - minx, y - miny, dimx, dimy);
  }

  check_line(x, player, n_consec) {
    const { dimy, miny, board } = this.state.board;

    var n_consecutive = 0;
    var last_cols = [];
    for (var y = miny; y < miny + dimy; y++) {
      const idx = this.board_coord(x, y);
      if (board[idx].player === player) {
        n_consecutive += 1;
        if (n_consecutive >= n_consec) last_cols.push(y);
      } else {
        n_consecutive = 0;
      }
    }

    if (last_cols.length > 0) {
      const best_cards = [];
      for (const last_col of last_cols) {
        const ids = [];
        for (var i = n_consec; i > 0; i--) {
          ids.push(this.board_coord(x, last_col - i + 1));
        }
        const cards = ids.map((id) => board[id].card);
        const best_card = Math.max(...cards);

        best_cards.push(best_card);
      }

      return best_cards;
    }

    return [];
  }

  check_col(y, player, n_consec) {
    const { dimx, minx, board } = this.state.board;

    var n_consecutive = 0;
    var last_rows = [];
    for (var x = minx; x < minx + dimx; x++) {
      const idx = this.board_coord(x, y);
      if (board[idx].player === player) {
        n_consecutive += 1;
        if (n_consecutive >= n_consec) last_rows.push(x);
      } else {
        n_consecutive = 0;
      }
    }

    if (last_rows.length > 0) {
      const best_cards = [];
      for (const last_row of last_rows) {
        const ids = [];
        for (var i = n_consec; i > 0; i--) {
          ids.push(this.board_coord(last_row - i + 1, y));
        }
        const cards = ids.map((id) => board[id].card);
        const best_card = Math.max(...cards);

        best_cards.push(best_card);
      }
      return best_cards;
    }

    return [];
  }

  check_diag(x, y, player, n_consec, orient = true) {
    // if orient is true then diag \
    // else diag /
    const { dimx, dimy, minx, miny, board } = this.state.board;

    const dist_left = x - minx;
    const dist_up = y - miny;
    const dist_right = minx + dimx - x - 1;
    const dist_down = miny + dimy - y - 1;

    var diag_size, startx, starty;

    if (orient) {
      const aux1 = Math.min(dist_left, dist_up);
      const aux2 = Math.min(dist_right, dist_down);
      diag_size = aux1 + aux2 + 1;
      startx = x - aux1;
      starty = y - aux1;
    } else {
      const aux1 = Math.min(dist_left, dist_down);
      const aux2 = Math.min(dist_right, dist_up);
      diag_size = aux1 + aux2 + 1;
      startx = x - aux1;
      starty = y + aux1;
    }

    if (diag_size >= 4) {
      var last_cells = [];
      var n_consecutive = 0;
      for (var ofst = 0; ofst < diag_size; ofst++) {
        const x_ = startx + ofst;
        const y_ = orient ? starty + ofst : starty - ofst;
        const idx = this.board_coord(x_, y_);
        if (board[idx].player === player) {
          n_consecutive += 1;
          if (n_consecutive >= n_consec) last_cells.push([x_, y_]);
        } else {
          n_consecutive = 0;
        }
      }

      if (last_cells.length > 0) {
        const best_cards = [];
        for (const [last_row, last_col] of last_cells) {
          const ids = [];
          for (var i = n_consec; i > 0; i--) {
            const x = last_row - i + 1;
            const y = orient ? last_col - i + 1 : last_col + i - 1;
            ids.push(this.board_coord(x, y));
          }
          const cards = ids.map((id) => board[id].card);
          const best_card = Math.max(...cards);

          best_cards.push(best_card);
        }
        return best_cards;
      }
    }

    return [];
  }

  win_condition(n_consec = 4) {
    // win_condition is called after each move, we only need to consider
    // the lines, rows and diags involving last play

    if (this.state.plays.length === 0 || this.state.won) return;

    var { player, x, y } = this.state.plays[this.state.plays.length - 1];

    const best_cards1 = this.check_line(x, player, n_consec);
    const best_cards2 = this.check_col(y, player, n_consec);
    const best_cards3 = this.check_diag(x, y, player, n_consec, true);
    const best_cards4 = this.check_diag(x, y, player, n_consec, false);

    const best_cards = [
      ...best_cards1,
      ...best_cards2,
      ...best_cards3,
      ...best_cards4,
    ];

    var won = best_cards.length > 0

    var best_card, winner;

    if (won) {
      best_card = Math.min(...best_cards);
      winner =
        (this.state.cur_player + this.state.n_players - 1) %
        this.state.n_players;
    } else {
      const remaining_cards = this.state.player_deck.map((deck) => deck.length);
      if (
        remaining_cards.map((n) => n <= 0).includes(true) ||
        !this.state.board.board.map((cell) => cell.kind === "open").includes(true)
      ) {
        // one player has no more cards
        const { best_card: best_card_, winner: winner_ } = this.alternative_win_condition();
        best_card = best_card_
        winner = winner_
        won = true
      }
    }

    if (won) {
      const player_scores = this.state.player_scores;

      if (winner >= 0) player_scores[winner].push(best_card);

      this.setState(
        { cur_player: winner, player_scores, won: true },
        this.update_board
      );
    }
  }

  alternative_win_condition() {
    const {
      n_players,
      board: { minx, miny, dimx, dimy },
    } = this.state;

    const best_cards = [];

    for (var p = 0; p < n_players; p++) {
      var best_cards_p = [];
      for (var x = minx; x < minx + dimx; x++) {
        const best_cards_line = this.check_line(x, p, 3);
        best_cards_p = [...best_cards_line, ...best_cards_p];
      }
      for (var y = miny; y < miny + dimy; y++) {
        const best_cards_col = this.check_col(y, p, 3);
        best_cards_p = [...best_cards_col, ...best_cards_p];
      }

      const mindim = Math.min(dimx, dimy);
      for (var d = minx; d < minx + mindim; d++) {
        const best_cards_diag1 = this.check_diag(dimx - d - 1, d, p, 3, true);
        const best_cards_diag2 = this.check_diag(d, d, p, 3, false);
        best_cards_p = [...best_cards_diag1, ...best_cards_diag2, ...best_cards_p];
      }

      best_cards.push(best_cards_p);
    }

    const n_sols = best_cards.map((a) => a.length);
    const winner = n_sols.reduce(
      (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
      0
    );

    const second_winner = n_sols.map(x => x === n_sols[winner]).includes(true)

    if (best_cards[winner].length === 0 || second_winner) {
        return { best_card: [], winner: -1 }
    } else {
      const best_card = Math.min(...best_cards[winner]);
      return { best_card, winner }
    }
  }

  handle_click = ({ x, y }) => {
    const {
      n_players,
      cur_player,
      player_deck,
      plays,
      virtual_board: { minx, maxx, miny, maxy },
    } = this.state;
    const card = this.get_cur_card();

    const playData = {
      id_Partie: null,
      id_joueur: cur_player,
      x: x,
      y: y,
      carte: card
    }

    if(this.state.selectedDataBase !== "MongoDB") {
      try{
        sendPlay(playData, this.state.selectedDataBase)
          .then(() => {
            // Si les données sont envoyées avec succès, réinitialise les scores
            console.log("Données envoyées avec succès");
          })
          .catch((error) => {
            console.error('Erreur lors de l\'envoi des données play :', error);
          });
      }catch (error){
        console.error('Erreur lors de l\'envoi des données play :', error);
      }

    }else{
      if(cur_player === 0){
        this.playsMongoDB.plays_joueur1.push([playData.x, playData.y]);
      }else if(cur_player === 1){
        this.playsMongoDB.plays_joueur2.push([playData.x, playData.y]);
      }else if(cur_player === 2){
        this.playsMongoDB.plays_joueur3.push([playData.x, playData.y]);
      }else if(cur_player === 3){
        this.playsMongoDB.plays_joueur4.push([playData.x, playData.y]);
      }
    }

    var prev_play_idx = -1;
    for (var i = 0; i < plays.length; i++) {
      const play = plays[i];
      if (play.x === x && play.y === y) {
        prev_play_idx = i;
      }
    }

    if (prev_play_idx >= 0) {
      const prev_play = plays[prev_play_idx];
      const prev_card = prev_play.card;
      if (prev_card >= card) return;
    }

    plays.push({ player: cur_player, card, x, y });
    player_deck[cur_player].shift();
    const new_cur_player = (cur_player + 1) % n_players;
    const new_minx = x < minx ? x : minx;
    const new_maxx = x + 1 > maxx ? x + 1 : maxx;
    const new_miny = y < miny ? y : miny;
    const new_maxy = y + 1 > maxy ? y + 1 : maxy;
    this.setState(
      {
        cur_player: new_cur_player,
        player_deck,
        plays,
        virtual_board: {
          minx: new_minx,
          maxx: new_maxx,
          miny: new_miny,
          maxy: new_maxy,
        },
      },
      this.update_board
    );
  };

  get_cur_player = () => this.state.cur_player;

  get_cur_card = () => {
    const cur_player_deck = this.get_cur_deck();
    if (cur_player_deck && cur_player_deck.length > 0)
      return cur_player_deck[0];
    else
      return -1
  };

  get_cur_deck = () => {
    return this.state.player_deck[this.get_cur_player()];
  };

  render() {
    const { dimx, board } = this.state.board;
    const board_dimx = dimx * TAILLE_DECK;
    const cur_player = this.get_cur_player();
    const cur_card = this.get_cur_card();
    const cur_color = this.state.player_color[cur_player];
    const { selectedDataBase } = this.state;
    return (
      <div className="punto">
        <header>
          <div className="menu">
            <input type="button" value="Réinitialiser" onClick={this.reset}/>
            <select value={selectedDataBase} onChange={(e) => this.setState({ selectedDataBase: e.target.value })}>
              <option value="MongoDB">MongoDB</option>
              <option value="MySQL">MySQL</option>
              <option value="SQLite">SQLite</option>
          </select>
          </div>
        </header>
        {board && (
          <Board
            board={this.state.board}
            player_color={this.state.player_color}
            onClick={this.handle_click}
          />
        )}
        {this.state.won ? (
          <div className="won" style={{ color: cur_color }}>
            {cur_player >= 0 ?
              `Le joueur ${cur_player} a gagné!`
              :
              `Match nul...`
            }
            <br />
            <input type="button" value="Partie suivante" onClick={this.next_round} />
          </div>
        ) : (

          
          <div className="next_card" style={{ width: board_dimx + "px" }}>
            <div>
              <h4 style={{ color: 'white' }}>Joueur {cur_player}</h4>
            </div>
            <Card card={cur_card} color={cur_color} kind="show" />
          </div>
        )}
        <Scoreboard
          player_scores={this.state.player_scores}
          player_color={this.state.player_color}
          width={board_dimx}
        />
      </div>
    );
  }
}

export default App;
