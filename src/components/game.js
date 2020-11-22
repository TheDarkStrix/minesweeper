import React from "react"
import Board from "../components/board"
import "../styles/index.css"

export default class Game extends React.Component {
  state = {
    height: 8,
    mines: 10,
    width: 8,
  }

  render() {
    const { height, width, mines } = this.state
    return (
      <>
        <h1 className="game-heading">Minesweeper</h1>
        <div className="game">
          <div className="board-parent">
            <Board height={height} width={width} mines={mines} />
          </div>
        </div>
      </>
    )
  }
}
