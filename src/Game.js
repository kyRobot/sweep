import React from "react";
import Board from "./Board";

class Game extends React.Component {
  render() {
    const columns = 5;
    const mines = 4;
    const minefield = Array(columns*columns).fill("*", 0, mines);
    shuffle(minefield);
    return (
      <div>
        <Board columns={columns} mines={mines} minefield={minefield} />
        <div className="board-row">
          <button className="square double-width">Reset</button>
        </div>
      </div>
    );
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default Game;
