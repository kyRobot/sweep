import React from "react";
import "./index.css";

class BoardControl extends React.Component {
  render() {
    return (
      <div className="board-row">
        <button className="rounded-button" onClick={this.props.newGame}>
          New
        </button>
        <button className="rounded-button" onClick={this.props.resetGame}>
          Reset
        </button>
        <div className="status">
          <code>{this.props.status}</code>
        </div>
      </div>
    );
  }
}

export default BoardControl;
