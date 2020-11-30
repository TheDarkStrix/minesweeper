import React, { Component } from "react"
import SnackbarProvider from "react-simple-snackbar"
import Game from "../components/game/game"

export default class Index extends Component {
  render() {
    return (
      <SnackbarProvider>
        <Game />
      </SnackbarProvider>
    )
  }
}
