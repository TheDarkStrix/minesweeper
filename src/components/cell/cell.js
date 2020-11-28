import React from "react"
import "./cell.css"

export default function Cell(props) {
  return (
    <button
      className={
        "cell" +
        (props.value === "*"
          ? " mine"
          : props.value !== null
          ? " " + props.value
          : "")
      }
      onClick={props.onClick}
    >
      {props.value ? props.value : ""}
    </button>
  )
}
