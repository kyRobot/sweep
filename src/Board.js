import React from "react";
import "./index.css";

function Square(props) {
  let classes = "square ";
  if (props.value === "*") {
    classes += "mine";
  }

  if (props.value === " ") {
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
    const size = props.columns * props.columns;
    const squares = Array(size).fill(null);
    const mines = squares.map(x => {
      return Math.floor(Math.random() * Math.floor(10)) > 7 ? "*" : null;
    });
    this.state = {
      squares: squares,
      mines: mines,
      totalMines: mines.filter(x => x != null).length,
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
    if (this.state.mines[i]) {
      squares[i] = "*";
      dead = true;
    } else {
      squares[i] = " ";
    }

    this.setState({
      squares: squares,
      dead: dead
    });
  }

  renderRow(row, totalRows) {
    let tiles = [];
    const last = row + totalRows;
    for (let index = row; index < last; index++) {
      tiles.push(this.renderSquare(index));
    }
    return <div className="board-row">{tiles}</div>;
  }

  render() {
    let status;
    if (this.state.dead) {
      status = "Uh oh. Game over.";
    } else {
      status = "Avoid the " + this.state.totalMines + " mines!";
    }
    return (
      <div>
        <div className="status">{status}</div>
        {Array(this.props.columns)
          .fill(null)
          .map((_, i) => {
            return this.renderRow(this.props.columns*i, this.props.columns);
          })}
      </div>
    );
  }
}

export default Board;
