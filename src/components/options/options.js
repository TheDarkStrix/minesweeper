import React, { Component } from "react"
import revealMines from "../../includes/img/mine.svg"
import difficulty from "../../includes/img/difficulty.svg"

import {
  Fab,
  Action,
  mainButtonStyles,
  actionButtonStyles,
} from "react-tiny-fab"
import "react-tiny-fab/dist/styles.css"

export default class GameOptions extends Component {
  constructor(props) {
    super(props)
  }

  challengeMainbtn = {
    backgroundColor: "white",
    boxShadow: "none",
    margin: "0",
    color: "black",
  }

  actionbtn = {
    backgroundColor: "white !important",
    boxShadow: "none",
    margin: "0",
  }

  challengeStyle = {
    bottom: "0px",
    right: "0px",
  }

  mineStyle = {
    top: "1.5em",
    right: "0px",
  }

  render() {
    return (
      <div>
        <div class="minesweeper">minesweeper</div>

        <Fab
          mainButtonStyles={(mainButtonStyles, this.challengeMainbtn)}
          actionButtonStyles={this.actionbtn}
          icon={<img src={difficulty} />}
          alwaysShowTitle={true}
          style={this.challengeStyle}
          onClick={() => 0}
        >
          <Action
            style={this.challengeMainbtn}
            text="Easy"
            onClick={() => this.props.restartGame(9, 9, 10)}
          >
            I
          </Action>
          <Action
            style={this.challengeMainbtn}
            text="Medium"
            onClick={() => this.props.restartGame(16, 16, 40)}
          >
            II
          </Action>
          <Action
            style={this.challengeMainbtn}
            text="Hard"
            // 16 , 30 , 99 makes it too long
            onClick={() => this.props.restartGame(16, 30, 99)}
          >
            III
          </Action>
          <Action
            style={this.challengeMainbtn}
            text="Reveal Mines"
            onClick={this.props.sudoMode}
          >
            <img style={{ maxWidth: "70%" }} src={revealMines} />
          </Action>
        </Fab>
      </div>
    )
  }
}
