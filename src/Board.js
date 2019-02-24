import React from "react";
import "./index.css";

function Tile(props) {
  let classes = props.shape + " tile";
  if (props.value === "*") {
    classes += " mine";
  } else if (props.value === 0) {
    classes += " safe empty";
  } else if (props.value != null) {
    classes += " safe";
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
    this.state = {
      tileOption: "square"
    }
  }

  renderTile(i) {
    return (
      <Tile
        value={this.props.tiles[i]}
        shape={this.state.tileOption}
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

  handleTileOptionChange = e => {
    this.setState({tileOption: e.target.value})
  };

  render() {
    return (
      <div>
        {this.renderBoard(this.props.columns)}
        <div className="board-row tile-select">
          <label className="radio-option">
            <input
              type="radio"
              name="tile-option"
              value="square"
              checked={this.state.tileOption === "square"}
              onChange={this.handleTileOptionChange}
            />
            <span class="dot"></span>
            Square
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="tile-option"
              value="circle"
              checked={this.state.tileOption === "circle"}
              onChange={this.handleTileOptionChange}
            />
            <span class="dot"></span>
            Circle
          </label>
        </div>
      </div>
    );
  }
}

export default Board;
