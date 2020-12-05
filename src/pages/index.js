import React, { Component } from "react"
import "./index.css"
import SnackbarProvider from "react-simple-snackbar"
import Scrollbar from "react-scrollbars-custom"
import Game from "../components/game/game"

import {
  Fab,
  Action,
  mainButtonStyles,
  actionButtonStyles,
} from "react-tiny-fab"
import "react-tiny-fab/dist/styles.css"

import GameOptions from "../components/options/options"
export default class Index extends Component {
  render() {
    return (
      <Scrollbar style={{ width: "100vw", height: "100vh" }}>
        <SnackbarProvider>
          <Game />
        </SnackbarProvider>
      </Scrollbar>
    )
  }
}
