import React, { Component } from "react"
import "./index.css"
import SnackbarProvider from "react-simple-snackbar"
import Scrollbar from "react-scrollbars-custom"
import Game from "../components/game/game"

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
