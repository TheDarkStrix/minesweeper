import React from "react"

export default class Cell extends React.Component {
  getValue() {}

  render() {
    return (
      <div ref="cell" className="cell hidden">
        {this.getValue()}
      </div>
    )
  }
}
