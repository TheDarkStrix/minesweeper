import React from "react"
import Board from "../components/board"
import "../styles/index.css"

import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Tab from "react-bootstrap/Tab"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 8,
      mines: 10,
      width: 8,
      show: false,
      difficulty: "easy",
      selectedDifficulty: "",
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.selectDifficulty = this.selectDifficulty.bind(this)
    this.applyChanges = this.applyChanges.bind(this)
  }

  handleClose() {
    this.setState({
      show: false,
    })
  }

  handleShow() {
    this.setState({
      show: true,
    })
  }

  selectDifficulty(e) {
    console.log(e.target.value)
    this.setState({
      selectedDifficulty: e.target.value,
    })
  }

  applyChanges() {
    switch (this.state.selectedDifficulty) {
      case "easy":
        this.setState({
          height: 8,
          width: 8,
          mines: 10,
          difficulty: "easy",
        })
        this.handleClose()
        break
      case "medium":
        this.setState({
          height: 12,
          width: 12,
          mines: 18,
          difficulty: "medium",
        })
        this.handleClose()
        break
      case "hard":
        this.setState({
          height: 20,
          width: 20,
          mines: 80,
          difficulty: "hard",
        })
        this.handleClose()
        break
    }
  }

  render() {
    const { height, width, mines, difficulty } = this.state
    //const [show, setShow] = useState(false)

    // const handleClose = () => setShow(false)
    // const handleShow = () => setShow(true)
    return (
      <>
        <div>
          <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Difficulty</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">How To Play</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>Select Difficulty</Form.Label>
                          <Form.Control
                            as="select"
                            value={this.state.selectedDifficulty}
                            onChange={this.selectDifficulty}
                          >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </Form.Control>
                        </Form.Group>
                        <div className="saveChanges">
                          <Button variant="primary" onClick={this.applyChanges}>
                            Save & Play
                          </Button>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div class="how-to-play">
                          <h4>Rules</h4>
                          <ul>
                            <li>
                              You are presented with a board of squares. Some
                              squares contain mines (bombs), others don't. If
                              you click on a square containing a bomb, you lose.
                              If you manage to click all the squares (without
                              clicking on any bombs) or flag all the mines, you
                              win.
                            </li>
                            <li>
                              Clicking a square which doesn't have a bomb
                              reveals the number of neighbouring squares
                              containing bombs. Use this information plus some
                              guess work to avoid the bombs.
                            </li>
                            <li>
                              To open a square, point at the square and click on
                              it. To mark a square you think is a bomb, right
                              click on it.
                            </li>
                            <li>
                              On completing the game, click on the emoji bar to
                              restart the game.
                            </li>
                          </ul>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Modal.Body>
          </Modal>
        </div>
        <h1 className="game-heading">Minesweeper</h1>
        <div className="game">
          <div className="board-parent">
            <div className="settings" onClick={this.handleShow}>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-gear-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"
                />
              </svg>
            </div>
            <Board
              height={height}
              width={width}
              mines={mines}
              difficulty={difficulty}
            />
          </div>
        </div>
      </>
    )
  }
}
