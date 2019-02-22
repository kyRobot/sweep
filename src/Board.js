import React from "react";
import "./index.css";

function Square(props) {
  let classes = "square ";
  if (props.value === "*") {
    classes += "mine";
  } else if (props.value === 0) {
    classes += "safe empty";
  } else if (props.value != null) {
    classes += "safe";
  }

  return (
    <button className={classes} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const squares = props.minefield.slice().fill();
    this.state = {
      squares: squares,
      dead: false
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        key={i}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i] || this.state.dead) {
      return;
    }
    let dead = false;
    if (this.props.minefield[i]) {
      squares[i] = "*";
      dead = true;
    } else {
      this.walkout([i], this.props.columns, squares, []);
    }

    this.setState({
      squares: squares,
      dead: dead
    });
  }

  mines(tiles) {
    return tiles.map(t => this.props.minefield[t]).filter(Boolean).length;
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

  walkout(tiles, columns, squares, visited) {
    if (tiles.length === 0) {
      return;
    }
    let i = tiles.pop();
    visited.push(i);
    let neighbours = this.neighbours(i, columns);
    let mines = this.mines(neighbours);
    if (mines === 0) {
      neighbours.forEach(neighbour => {
        if (!visited.includes(neighbour) && !tiles.includes(neighbour)) {
          tiles.push(neighbour);
        }
      });
    }
    squares[i] = mines;
    this.walkout(tiles, columns, squares, visited);
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

  renderRow(row, totalRows) {
    let tiles = [];
    for (let index = row; index < row + totalRows; index++) {
      tiles.push(this.renderSquare(index));
    }
    return (
      <div key={"row" + row / totalRows} className="board-row">
        {tiles}
      </div>
    );
  }

  renderBoard(columns) {
    return Array(columns)
      .fill(null)
      .map((_, i) => this.renderRow(columns * i, columns));
  }

  render() {
    let status;
    if (this.state.dead) {
      status = "Uh oh. Game over.";
    } else {
      status = "Avoid the " + this.props.mines + " mines!";
    }
    return (
      <div>
        <div className="board-row status">{status}</div>
        {this.renderBoard(this.props.columns)}
      </div>
    );
  }
}

export default Board;
