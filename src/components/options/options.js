import React, { Component } from "react"
import "./options.css"
import revealMines from "../../includes/img/mine.svg"

export default class GameOptions extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div class="minesweeper">minesweeper</div>
        <div class="options">
          <div class="revealMines" onClick={this.props.sudoMode}>
            <img src={revealMines} />
          </div>
        </div>
      </div>
    )
  }
}
