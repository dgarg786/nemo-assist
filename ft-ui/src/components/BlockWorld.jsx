import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import BlockDrawingBoard from "./BlockDrawingBoard.jsx";
import { Row, Col, Container } from "reactstrap";
import LeftPanel from "./LeftPanel";

class BlockWorld extends Component {
  render() {
    return (
      <Container fluid>
        <Row className="App-body">
          <LeftPanel />
          <Col className="work-book">
            <BlockDrawingBoard />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BlockWorld;
