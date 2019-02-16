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
    const squares = Array(16).fill(null);
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
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
      </div>
    );
  }
}

export default Board;
