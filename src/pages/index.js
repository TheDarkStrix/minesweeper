import React, { Component } from "react"
import "./index.css"
import SnackbarProvider from "react-simple-snackbar"
import Game from "../components/game/game"
import "react-tiny-fab/dist/styles.css"

export default class Index extends Component {
  render() {
    return (
      <SnackbarProvider>
        <Game />
      </SnackbarProvider>
    )
  }
}
