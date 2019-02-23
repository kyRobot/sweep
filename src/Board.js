import React from "react";
import "./index.css";

function Tile(props) {
  let classes = "circle ";
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
  renderTile(i) {
    return (
      <Tile
        value={this.props.tiles[i]}
        key={i}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRow(row, totalRows) {
    let tiles = [];
    for (let index = row; index < row + totalRows; index++) {
      tiles.push(this.renderTile(index));
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
    return (
      <div>
        <div className="board-row status">{this.props.status}</div>
        {this.renderBoard(this.props.columns)}
      </div>
    );
  }
}

export default Board;
