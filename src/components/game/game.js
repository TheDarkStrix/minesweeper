import React, { Component } from "react"
import "./game.css"
import Board from "../board/board"

const height = 9
const width = 9
const mines = 10

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
    console.log(this.state)
  }

  getInitialState() {
    return {
      sudoMode: this.generateGame(),
      game: this.generateArray(null),
      gameOver: false,
      status: "🙂",
    }
  }

  handleClick(row, column) {
    const game = this.state.game.slice()
    console.log(game)
    console.log(this.state.gameOver)

    // check for game over or if cell is revealed already
    if (this.state.gameOver || game[row][column] !== null) {
      return
    }

    this.reveal(game, row, column)

    this.updateGameStatus(game, row, column)
  }

  reveal(cells, row, column) {
    if (!this.inRange(row, column) || cells[row][column] !== null) {
      return
    }

    cells[row][column] = this.state.sudoMode[row][column]

    //reveal if cell value is 0
    if (cells[row][column] === 0) {
      this.expand(cells, row, column)
      //console.log("cells " + cells, "rows " + row, "column" + column)
    }
  }

  expand(cells, row, column) {
    // reveal touching cells of a cell
    this.reveal(cells, row, column - 1)
    this.reveal(cells, row, column + 1)
    this.reveal(cells, row - 1, column)
    this.reveal(cells, row + 1, column)
    this.reveal(cells, row - 1, column - 1)
    this.reveal(cells, row - 1, column + 1)
    this.reveal(cells, row + 1, column + 1)
    this.reveal(cells, row + 1, column - 1)
  }

  randomInRange(minimum, maximum) {
    // generate random in board
    return Math.round(Math.random() * (maximum - minimum) + minimum)
  }

  generateArray(value) {
    // [][]
    return Array.from({ length: height }, () =>
      Array.from({ length: width }, () => value)
    )
  }

  updateGameStatus(cells, row, column) {
    if (this.isMine(cells, row, column)) {
      return this.setState({
        game: cells,
        gameOver: true,
        status: "💀",
      })
    }

    const gameOver = !this.continueGame(cells)
    const gameStatus = gameOver ? "😎" : this.state.status

    if (gameOver) {
      cells = cells.map(row => row.map(cell => (cell !== null ? cell : "🚩")))
    }

    this.setState({
      game: cells,
      gameOver: gameOver,
      status: gameStatus,
    })
  }

  continueGame(cells) {
    // checks if player can continue the game
    //console.log(Array.isArray(cells))
    return cells.flat().filter(cell => cell === null).length > mines
  }

  generateGame() {
    const cells = this.generateArray(0)
    let generatedMines = 0
    let row
    let column

    while (generatedMines < mines) {
      row = this.randomInRange(0, height - 1)
      column = this.randomInRange(0, width - 1)

      if (!this.isMine(cells, row, column)) {
        cells[row][column] = "B"
        // after placing mine, increment touching cells
        this.incrementCell(cells, row, column - 1)
        this.incrementCell(cells, row, column + 1)
        this.incrementCell(cells, row - 1, column)
        this.incrementCell(cells, row + 1, column)
        this.incrementCell(cells, row - 1, column - 1)
        this.incrementCell(cells, row - 1, column + 1)
        this.incrementCell(cells, row + 1, column + 1)
        this.incrementCell(cells, row + 1, column - 1)
        generatedMines++
      }
    }

    return cells
  }

  incrementCell(cells, row, column) {
    if (this.inRange(row, column) && !this.isMine(cells, row, column)) {
      cells[row][column] = cells[row][column] + 1
    }
  }

  isMine(cells, row, column) {
    return cells[row][column] === "B"
  }

  inRange(row, column) {
    // value inside board
    return row >= 0 && column >= 0 && row < height && column < width
  }

  render() {
    return (
      <div className="game">
        <div>
          <button onClick={() => this.setState(this.getInitialState())}>
            {this.state.status}
          </button>
        </div>
        <Board
          onClick={(row, column) => this.handleClick(row, column)}
          game={this.state.game}
        />
        <button onClick={() => console.log(this.state.sudoMode)}>
          sudo Mode
        </button>
      </div>
    )
  }
}
