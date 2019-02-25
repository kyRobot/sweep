import React from "react";
import Board from "./Board";
import BoardControl from "./BoardControl";
import { isUndefined } from "util";

class Game extends React.Component {
  static MINE = "*";

  constructor(props) {
    super(props);
    const columns = 8;
    const mines = 10;
    const minefield = this.generateMinefield(mines, columns);
    const tiles = minefield.slice().fill();
    this.state = {
      columns: columns,
      mines: mines,
      minefield: minefield,
      tiles: tiles,
      dead: false,
      status: mines + " mines"
    };
  }

  render() {
    return (
      <div>
        <BoardControl
          newGame={this.newGame}
          resetGame={this.reset}
          status={this.state.status}
        />
        <Board
          columns={this.state.columns}
          mines={this.state.mines}
          minefield={this.state.minefield}
          tiles={this.state.tiles}
          onClick={this.handleClick}
        />
      </div>
    );
  }

  generateMinefield(mines, columns) {
    let minefield = Array(columns * columns).fill(Game.MINE, 0, mines);
    shuffle(minefield);
    return minefield;
  }

  reset = () => {
    let freshTiles = this.state.tiles.slice().fill();
    let complete = false;
    this.setState({
      tiles: freshTiles,
      complete: complete
    });
  };

  newGame = () => {
    let minefield = this.generateMinefield(
      this.state.mines,
      this.state.columns
    );
    let freshTiles = minefield.slice().fill();
    let complete = false;
    this.setState({
      minefield: minefield,
      tiles: freshTiles,
      complete: complete
    });
  };

  // fat arrow function to avoid needing to bind(this)
  handleClick = i => {
    const tiles = this.state.tiles.slice();
    if (tiles[i] || this.state.complete) {
      return;
    }
    let complete = false;
    if (this.state.minefield[i]) {
      tiles[i] = Game.MINE;
      complete = true;
    } else {
      this.walkout([i], this.state.columns, tiles, []);
    }
    let status;
    if (complete) {
      status = "Game over :(";
    } else if (this.checkWin(tiles, this.state.mines)) {
      status = "Winner !";
      complete = true;
    } else {
      status = this.state.mines + " mines";
    }

    this.setState({
      tiles: tiles,
      complete: complete,
      status: status
    });
  };

  checkWin = (tiles, mines) =>
    tiles.slice().filter(isUndefined).length === mines;

  mines(tiles) {
    return tiles.map(t => this.state.minefield[t] === Game.MINE).filter(Boolean)
      .length;
  }

  get xyMovements() {
    // 0,0 is top left so north & south are flipped
    return [
      [0, -1], // n
      [1, 0], // e
      [0, 1], // s
      [-1, 0], // w
      [-1, -1], // nw
      [1, -1], // ne
      [-1, 1], // sw
      [1, 1] // se
    ];
  }

  walkout(targets, columns, tiles, visited) {
    if (targets.length === 0) {
      return;
    }
    let i = targets.pop();
    visited.push(i);
    let neighbours = this.neighbours(i, columns);
    let mines = this.mines(neighbours);
    if (mines === 0) {
      neighbours.forEach(neighbour => {
        if (!visited.includes(neighbour) && !targets.includes(neighbour)) {
          targets.push(neighbour);
        }
      });
    }
    tiles[i] = mines;
    this.walkout(targets, columns, tiles, visited);
  }

  neighbours(i, columns) {
    // i = x + cols * y
    // x = i % width
    // y = i / width
    return this.xyMovements
      .map(move =>
        this.get1DIndex(
          i % columns,
          Math.floor(i / columns),
          columns,
          move[0],
          move[1]
        )
      )
      .filter(Number.isInteger);
  }

  get1DIndex(originX, originY, columns, moveX, moveY) {
    if (
      !(
        originX + moveX < 0 ||
        originX + moveX >= columns ||
        originY + moveY < 0 ||
        originY + moveY >= columns
      )
    ) {
      return originX + moveX + columns * (originY + moveY);
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default Game;
