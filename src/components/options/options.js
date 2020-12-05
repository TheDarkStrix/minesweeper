import React, { Component } from "react"
import revealMines from "../../includes/img/mine.svg"
import difficulty from "../../includes/img/difficulty.svg"

import { Fab, Action } from "react-tiny-fab"
import "react-tiny-fab/dist/styles.css"

export default class GameOptions extends Component {
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
        <div className="minesweeper">minesweeper</div>

        <Fab
          mainButtonStyles={("mainButtonStyles", this.challengeMainbtn)}
          actionbuttonstyles={this.actionbtn}
          icon={<img src={difficulty} alt="difficultyBtn" />}
          alwaysShowTitle={true}
          event="hover"
          style={this.challengeStyle}
          onClick={() => 0}
        >
          <Action
            style={this.challengeMainbtn}
            text="Easy"
            onClick={() => this.props.restartGame(9, 9, 10, "easy")}
          >
            I
          </Action>
          <Action
            style={this.challengeMainbtn}
            text="Medium"
            onClick={() => this.props.restartGame(16, 16, 40, "medium")}
          >
            II
          </Action>
          <Action
            style={this.challengeMainbtn}
            text="Hard"
            // 16 , 30 , 99 makes it too long
            onClick={() => this.props.restartGame(16, 30, 99, "hard")}
          >
            III
          </Action>
          <Action
            style={this.challengeMainbtn}
            text="Reveal Mines"
            onClick={this.props.sudoMode}
          >
            <img style={{ maxWidth: "70%" }} src={revealMines} alt="mineBtn" />
          </Action>
        </Fab>
      </div>
    )
  }
}
