import React from "react"
import Cell from "../components/cell"

export default class Board extends React.Component {
  state = {
    boardData: this.initBoardData(),
    gameWon: false,
    mineCount: this.props.mines,
  }

  // Gets initial board data
  initBoardData() {
    let data = []

    for (let i = 0; i < this.props.height; i++) {
      for (let j = 0; j < this.props.width; j++) {
        data.push({
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        })
      }
    }
    data = this.plantMines(data)
    data = this.getNeighbours(data)
    return data
  }

  // get random number given a dimension
  getRandomNumber(dimension) {
    return Math.floor(Math.random() * 1000 + 1) % dimension
  }

  // plant mines on the board
  plantMines(data) {
    let random,
      minesPlaced = 0
    const dimension = this.props.width * this.props.height

    while (minesPlaced < this.props.mines) {
      random = this.getRandomNumber(dimension)
      if (!data[random].isMine) {
        data[random].isMine = true
        minesPlaced++
      }
    }

    return data
  }

  // get number of neighbouring mines for each board cell
  getNeighbours(data) {
    let updatedData = data,
      index = 0

    for (let i = 0; i < this.props.height; i++) {
      for (let j = 0; j < this.props.width; j++) {
        if (data[index].isMine !== true) {
          let mine = 0
          const area = this.traverseBoard(data[index].x, data[index].y, data)
          area.map(value => {
            if (value.isMine) {
              mine++
            }
          })
          if (mine === 0) {
            updatedData[index].isEmpty = true
          }
          updatedData[index].neighbour = mine
        }
        index++
      }
    }

    return updatedData
  }

  // resolve two dimensional board index to one dimension
  resolveIndex(x, y) {
    return x * this.props.height + y
  }

  // looks for neighbouring cells and returns them
  traverseBoard(x, y, data) {
    const el = []

    //up
    if (x > 0) {
      el.push(data[this.resolveIndex(x - 1, y)])
    }

    //down
    if (x < this.props.height - 1) {
      el.push(data[this.resolveIndex(x + 1, y)])
    }

    //left
    if (y > 0) {
      el.push(data[this.resolveIndex(x, y - 1)])
    }

    //right
    if (y < this.props.width - 1) {
      el.push(data[this.resolveIndex(x, y + 1)])
    }

    // top left
    if (x > 0 && y > 0) {
      el.push(data[this.resolveIndex(x - 1, y - 1)])
    }

    // top right
    if (x > 0 && y < this.props.width - 1) {
      el.push(data[this.resolveIndex(x - 1, y + 1)])
    }

    // bottom right
    if (x < this.props.height - 1 && y < this.props.width - 1) {
      el.push(data[this.resolveIndex(x + 1, y + 1)])
    }

    // bottom left
    if (x < this.props.height - 1 && y > 0) {
      el.push(data[this.resolveIndex(x + 1, y - 1)])
    }

    return el
  }

  render() {
    return (
      <div className="board">
        {this.state.boardData.map((value, index) => (
          <div key={index}>
            <Cell value={value} />
            {(index + 1) % this.props.width === 0 ? (
              <div className="clear" />
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    )
  }
}
