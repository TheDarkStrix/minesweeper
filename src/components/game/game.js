import React, { Component } from "react"
import "./game.css"
import Board from "../board/board"

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
    this.sudoMode = this.sudoMode.bind(this)
  }

  restartGame(...args) {
    this.setState(this.getInitialState(...args))
  }

  getInitialState(height = 9, width = 9, mines = 10) {
    return {
      height: height,
      width: width,
      mines: mines,
      minesCount: mines,
      board: this.generateArray(height, width, null),
      solution: null,
      gameStatus: "🙂",
      gameStarted: false,
      gameOver: false,
    }
  }

  handleClick(row, column) {
    let board = this.state.board.slice()
    let solution

    if (!this.state.solution) {
      solution = this.generateGame(
        this.state.height,
        this.state.width,
        row,
        column,
        this.state.mines
      )
      this.setState({ gameStarted: true, solution: solution })
    } else {
      solution = this.state.solution.slice()
    }

    if (this.state.gameOver || board[row][column] !== null) {
      return
    }

    this.reveal(board, solution, row, column)

    this.updateGameStatus(board, solution, row, column)
  }

  handleRightClick(event, row, column) {
    let board = this.state.board.slice()
    event.preventDefault()

    let value = board[row][column]
    if (this.state.gameOver || (value !== null && value !== "🚩")) {
      return
    }

    board[row][column] = value ? null : "🚩"
    const minesCount = this.state.minesCount + (board[row][column] ? -1 : 1)

    this.setState({ board, minesCount })
  }

  reveal(board, solution, row, column) {
    if (!this.inRange(row, column) || board[row][column] !== null) {
      return
    }

    board[row][column] = solution[row][column]

    if (board[row][column] === 0) {
      this.expand(board, solution, row, column)
    }
  }

  expand(board, solution, row, column) {
    this.reveal(board, solution, row, column - 1)
    this.reveal(board, solution, row, column + 1)
    this.reveal(board, solution, row - 1, column)
    this.reveal(board, solution, row + 1, column)
    this.reveal(board, solution, row - 1, column - 1)
    this.reveal(board, solution, row - 1, column + 1)
    this.reveal(board, solution, row + 1, column + 1)
    this.reveal(board, solution, row + 1, column - 1)
  }

  randomInRange(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
  }

  isMine(cells, row, column) {
    return cells[row][column] === "B"
  }

  generateArray(height, width, value) {
    return Array.from({ length: height }, () =>
      Array.from({ length: width }, () => value)
    )
  }

  getSolution(board, solution, symbol) {
    return board.map((row, rowKey) =>
      row.map((cell, squareKey) =>
        this.isMine(solution, rowKey, squareKey)
          ? symbol
          : solution[rowKey][squareKey]
      )
    )
  }

  // check if the game can be continued
  doContinueGame(cells, mines) {
    return cells.flat().filter(cl => cl === null || cl === "🚩").length > mines
  }

  updateGameStatus(board, solution, row, column) {
    if (this.isMine(board, row, column)) {
      return this.setGameOver(board, solution, row, column)
    }

    const gameOver = !this.doContinueGame(board, this.state.mines)
    const gameStatus = gameOver ? "😎" : this.state.gameStatus
    let minesCount = this.state.minesCount

    if (gameOver) {
      board = this.getSolution(board, solution, "🚩")
      minesCount = 0
    }

    this.setState({ board, gameOver, gameStatus, minesCount })
  }

  setGameOver(board, solution, row, column) {
    board = board.map((row, rowKey) =>
      row.map((cell, squareKey) => {
        const isMine = this.isMine(solution, rowKey, squareKey)
        if (cell === "🚩") {
          return isMine ? cell : "❌"
        }

        return isMine ? "B" : cell
      })
    )

    this.setState({
      board,
      gameOver: true,
      gameStatus: "💀",
    })
  }

  sudoMode() {
    if (this.state.solution != null) {
      console.log(this.state.solution)
      this.setGameOver(
        this.state.board,
        this.state.solution,
        this.state.row,
        this.state.column
      )
    }
  }

  generateGame(height, width, currentRow, currentColumn, mines) {
    const board = this.generateArray(height, width, 0)
    let generatedMines = 0
    let row
    let column

    while (generatedMines < mines) {
      row = this.randomInRange(0, height - 1)
      column = this.randomInRange(0, width - 1)

      if (
        !this.isMine(board, row, column) &&
        !(currentRow === row && currentColumn === column)
      ) {
        board[row][column] = "B"
        this.incrementCell(board, row - 1, column)
        this.incrementCell(board, row + 1, column)
        this.incrementCell(board, row, column - 1)
        this.incrementCell(board, row, column + 1)
        this.incrementCell(board, row - 1, column - 1)
        this.incrementCell(board, row - 1, column + 1)
        this.incrementCell(board, row + 1, column + 1)
        this.incrementCell(board, row + 1, column - 1)
        generatedMines++
      }
    }

    return board
  }

  // after generating mines , increment touching cells
  incrementCell(board, row, column) {
    if (this.inRange(row, column) && !this.isMine(board, row, column)) {
      board[row][column] = board[row][column] + 1
    }
  }

  inRange(row, column) {
    return (
      row >= 0 &&
      row < this.state.height &&
      column >= 0 &&
      column < this.state.width
    )
  }

  render() {
    return (
      <div className="game">
        <button
          onClick={() =>
            this.setState(
              this.getInitialState(
                this.state.height,
                this.state.width,
                this.state.mines
              )
            )
          }
        >
          {this.state.gameStatus}
        </button>
        <Board
          onClick={(row, column) => this.handleClick(row, column)}
          onRightClick={(event, row, column) =>
            this.handleRightClick(event, row, column)
          }
          board={this.state.board}
          gameOver={this.state.gameOver}
        />
        <button onClick={this.sudoMode}>Reveal Mines</button>
      </div>
    )
  }
}
