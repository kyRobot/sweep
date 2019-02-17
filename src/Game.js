import React from "react";
import Board from "./Board"


class Game extends React.Component {

    render() {
        return (
            <div >
            <Board columns={5}/>
            <div className="board-row">
                <button className="square double-width">Reset</button>
            </div>
            </div>
        );
    }
}

export default Game;