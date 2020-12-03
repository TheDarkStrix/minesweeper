import React, { Component } from "react"
import "./index.css"
import SnackbarProvider from "react-simple-snackbar"
import Scrollbar from "react-scrollbars-custom"
import Game from "../components/game/game"

import revealMines from "../includes/img/mine.svg"
export default class Index extends Component {
  render() {
    return (
      <Scrollbar style={{ width: "100vw", height: "100vh" }}>
        <SnackbarProvider>
          <div>
            <div class="minesweeper">minesweeper</div>
            <div class="options">
              <div class="revealMines">
                <img src={revealMines} />
              </div>
            </div>
          </div>

          <Game />
        </SnackbarProvider>
      </Scrollbar>
    )
  }
}
