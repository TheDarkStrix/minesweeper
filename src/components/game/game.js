import React, { Component } from "react"
import "./game.css"
import Board from "../board/board"

export default class Game extends Component {
  height = 9
  width = 9
  mines = 10

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
      gameStatus: "🙂",
      minesCount: this.mines,
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

  handleRightClick(event, row, column) {
    const game = this.state.game.slice()
    event.preventDefault()

    let value = game[row][column]
    if (this.state.gameOver || (value !== null && value !== "🚩")) {
      return
    }

    game[row][column] = value ? null : "🚩"
    const minesCount = this.state.minesCount + (game[row][column] ? -1 : 1)

    this.setState({ ...game, minesCount })
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

  updateGameStatus(cells, row, column) {
    if (this.isMine(cells, row, column)) {
      cells = cells.map((row, rowKey) =>
        row.map((cell, cellKey) => {
          const isMine = this.isMine(this.state.sudoMode, rowKey, cellKey)
          if (cell === "🚩") {
            // if flag placed at wrong mine cell
            return isMine ? cell : "❌"
          }

          return isMine ? "B" : cell
        })
      )

      return this.setState({
        game: cells,
        gameOver: true,
        gameStatus: "💀",
      })
    }

    //check if game is won
    const gameOver = !this.continueGame(cells)
    const gameStatus = gameOver ? "😎" : this.state.gameStatus
    let minesCount = this.state.minesCount

    if (gameOver) {
      cells = this.getPlacedBombs(cells, "🚩")
      minesCount = 0
    }

    this.setState({
      game: cells,
      gameOver: gameOver,
      gameStatus: gameStatus,
      minesCount: minesCount,
    })
  }

  getPlacedBombs(cells, symbol) {
    return cells.map((row, rowKey) =>
      row.map((cell, cellKey) =>
        this.isMine(this.state.sudoMode, rowKey, cellKey)
          ? symbol
          : this.state.sudoMode[rowKey][cellKey]
      )
    )
  }

  continueGame(cells) {
    // checks if player can continue the game
    //console.log(Array.isArray(cells))
    return (
      cells.flat().filter(cel => cel === null || cel === "🚩").length >
      this.mines
    )
  }

  randomInRange(minimum, maximum) {
    // generate random in board
    return Math.round(Math.random() * (maximum - minimum) + minimum)
  }

  // [][]
  generateArray(value) {
    return Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => value)
    )
  }

  generateGame() {
    const cells = this.generateArray(0)
    let generatedMines = 0
    let row
    let column

    while (generatedMines < this.mines) {
      row = this.randomInRange(0, this.height - 1)
      column = this.randomInRange(0, this.width - 1)

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
    // return boolean if inside board
    return row >= 0 && column >= 0 && row < this.height && column < this.width
  }

  render() {
    return (
      <div className="game">
        <div>
          <div>
            <button onClick={() => this.setState(this.getInitialState())}>
              {this.state.gameStatus}
            </button>
          </div>
        </div>
        <Board
          onClick={(row, column) => this.handleClick(row, column)}
          onRightClick={(event, row, column) =>
            this.handleRightClick(event, row, column)
          }
          game={this.state.game}
        />
        <button onClick={() => console.log(this.state.sudoMode)}>
          sudo Mode
        </button>
      </div>
    )
  }
}
