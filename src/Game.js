import React from "react";
import Board from "./Board"


class Game extends React.Component {

    render() {
        return (
            <div >
            <Board />
            <div className="board-row">
                <button className="square double-width">Reset</button>
            </div>
            </div>
        );
    }
}

export default Game;