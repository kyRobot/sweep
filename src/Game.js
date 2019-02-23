import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    const columns = 8;
    const mines = 10;
    const minefield = Array(columns * columns).fill("*", 0, mines);
    shuffle(minefield);
    const tiles = minefield.slice().fill();
    this.state = {
      columns: columns,
      mines: mines,
      minefield: minefield,
      tiles: tiles,
      dead: false
    };
  }

  render() {
    let status;
    if (this.state.dead) {
      status = "Uh oh. Game over.";
    } else {
      status = "Avoid the " + this.state.mines + " mines!";
    }
    return (
      <div>
        <Board
          columns={this.state.columns}
          mines={this.state.mines}
          minefield={this.state.minefield}
          tiles={this.state.tiles}
          onClick={this.handleClick}
          status={status}
        />
        <div className="board-row">
          <button className="square double-width" onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }

  reset = () => {
    let freshTiles = this.state.tiles.slice().fill();
    let dead = false;
    this.setState({
      tiles: freshTiles,
      dead: dead
    });
  };

  // fat arrow function to avoid needing to bind(this)
  handleClick = i => {
    const tiles = this.state.tiles.slice();
    if (tiles[i] || this.state.dead) {
      return;
    }
    let dead = false;
    if (this.state.minefield[i]) {
      tiles[i] = "*";
      dead = true;
    } else {
      this.walkout([i], this.state.columns, tiles, []);
    }

    this.setState({
      tiles: tiles,
      dead: dead
    });
  };

  mines(tiles) {
    return tiles.map(t => this.state.minefield[t]).filter(Boolean).length;
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
