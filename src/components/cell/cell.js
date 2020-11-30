import React, { Component } from "react"
import "./cell.css"

export default class Cell extends Component {
  constructor(props) {
    super(props)
  }
  gameIcons = {
    bomb: "💣",
    bomb_exploded: "💣",
    flag: "🚩",
    exploded: "❌",
  }

  getIcon(value) {
    // check undefined vs. value
    return this.gameIcons[value] || (value ? value : null)
  }

  render() {
    return (
      <button
        className={
          "cell" +
          (this.props.value === "*"
            ? " mine"
            : this.props.value !== null
            ? " cell-" + this.props.value
            : "")
        }
        onClick={this.props.onClick}
        onContextMenu={this.props.onRightClick}
      >
        {this.props.value ? this.getIcon(this.props.value) : ""}
      </button>
    )
  }
}
