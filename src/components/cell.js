import React from "react"

import Bomb from "./images/bomb.png"
import Flag from "./images/flag.png"
export default class Cell extends React.Component {
  getCellValue() {
    if (!this.props.value.isRevealed) {
      return this.props.value.isFlagged ? (
        <span class="sweeper-icons">
          <img src={Flag} />
        </span>
      ) : null
    }
    if (this.props.value.isMine) {
      return (
        <span class="sweeper-icons">
          <img src={Bomb} />
        </span>
      )
    }
    if (this.props.value.neighbour === 0) {
      return null
    }
    return this.props.value.neighbour
  }

  render() {
    let className =
      "cell" +
      (this.props.value.isRevealed ? "" : " hidden") +
      (this.props.value.isMine ? " is-mine" : "") +
      (this.props.value.isFlagged ? " is-flag" : "")

    return (
      <div
        ref="cell"
        onClick={this.props.onClick}
        className={className}
        onContextMenu={this.props.cMenu}
      >
        {this.getCellValue()}
      </div>
    )
  }
}
