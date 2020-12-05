import React, { Component } from "react"
import Cell from "../cell/cell"
import "./board.css"

export default class Board extends Component {
  renderCell(row, column, value) {
    return (
      <Cell
        key={row + "*" + column}
        value={value}
        onClick={() => this.props.onClick(row, column)}
        onRightClick={event => this.props.onRightClick(event, row, column)}
      />
    )
  }

  renderRow(row, items) {
    return (
      <div className="row" key={row}>
        {items.map((value, key) => this.renderCell(row, key, value))}
      </div>
    )
  }

  render() {
    return (
      <div className="board">
        {this.props.board.map((value, key) => this.renderRow(key, value))}
      </div>
    )
  }
}
