import React, { Component } from "react"
import "./game.css"
import Board from "../board/board"
import { withSnackbar } from "react-simple-snackbar"
import Confetti from "react-dom-confetti"
import { options } from "../../config/snackbar-config"

import flag from "../../includes/img/flag.svg"
import difficulty from "../../includes/img/difficulty.svg"
import smile from "../../includes/img/smile.svg"
import danger from "../../includes/img/danger.svg"
import cool from "../../includes/img/cool.svg"
import GameOptions from "../options/options"

const config = {
  angle: 90,
  spread: 60,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
}

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
    this.sudoMode = this.sudoMode.bind(this)
    this.setGameWon = this.setGameWon.bind(this)
    this.restartGame = this.restartGame.bind(this)
  }

  gameStatus = {
    P: smile,
    O: danger,
    W: cool,
  }

  restartGame(...args) {
    console.log(...args)
    this.setState(this.getInitialState(...args))
    this.props.openSnackbar("Game Restarted")
  }

  getGameStatus(value) {
    return this.gameStatus[value] || (value ? value : null)
  }

  getInitialState(height = 9, width = 9, mines = 10, difficulty = "easy") {
    return {
      height: height,
      width: width,
      mines: mines,
      minesCount: mines,
      board: this.generateArray(height, width, null),
      solution: null,
      gameStatus: "P",
      gameStarted: false,
      gameOver: false,
      gameWon: false,
      difficulty: difficulty,
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
    if (this.state.gameOver || (value !== null && value !== "flag")) {
      return
    }

    board[row][column] = value ? null : "flag"
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
    return cells[row][column] === "bomb"
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
    return (
      cells.flat().filter(cl => cl === null || cl === "flag").length > mines
    )
  }

  updateGameStatus(board, solution, row, column) {
    if (this.isMine(board, row, column)) {
      return this.setGameOver(board, solution, row, column)
    }

    const gameOver = !this.doContinueGame(board, this.state.mines)
    const gameStatus = gameOver ? this.setGameWon() : this.state.gameStatus
    let minesCount = this.state.minesCount

    if (gameOver) {
      board = this.getSolution(board, solution, "flag")
      minesCount = 0
    }

    this.setState({ board, gameOver, gameStatus, minesCount })
  }

  setGameWon() {
    this.props.openSnackbar("You Won !")
    this.setState({ gameWon: true })
    return "W"
  }

  setGameOver(board, solution, row, column) {
    board = board.map((row, rowKey) =>
      row.map((cell, squareKey) => {
        const isMine = this.isMine(solution, rowKey, squareKey)
        if (cell === "flag") {
          return isMine ? cell : "exploded"
        }

        return isMine ? "bomb" : cell
      })
    )
    if (row || column !== undefined) board[row][column] = "bomb_exploded"
    this.props.openSnackbar("Game Over !")
    this.setState({
      board,
      gameOver: true,
      gameWon: false,
      gameStatus: "O",
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
    } else {
      this.props.openSnackbar("Make your first move !")
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
        board[row][column] = "bomb"
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
      <>
        <GameOptions sudoMode={this.sudoMode} restartGame={this.restartGame} />
        <div className="gameStatus">
          <div className="minesCountParent">
            <span className="flag">
              <img src={flag} />
            </span>
            <span className="minesCount">{this.state.minesCount}</span>
          </div>
          <div>
            <div
              className="gameStatusIcon"
              onClick={() =>
                this.setState(
                  this.restartGame(
                    this.state.height,
                    this.state.width,
                    this.state.mines,
                    this.state.difficulty
                  )
                )
              }
            >
              <img src={this.getGameStatus(this.state.gameStatus)} />
            </div>
          </div>
          <div className="difficultyParent">
            <span className="difficulty">
              <img src={difficulty} />
            </span>
            <span className="difficultyTitle">{this.state.difficulty}</span>
          </div>
        </div>
        <div className="gameParent">
          <div className="game">
            <Board
              onClick={(row, column) => this.handleClick(row, column)}
              onRightClick={(event, row, column) =>
                this.handleRightClick(event, row, column)
              }
              board={this.state.board}
              gameOver={this.state.gameOver}
            />
            <div class="conc">
              <div className="con">
                <Confetti active={this.state.gameWon} config={config} />
              </div>
            </div>
            {/* <button onClick={this.setGameWon}>Reveal Mines</button>
            <button onClick={() => this.restartGame(16, 16, 20)}>
              Reveal Mines
            </button> */}
          </div>
        </div>
      </>
    )
  }
}

export default withSnackbar(Game, options)
