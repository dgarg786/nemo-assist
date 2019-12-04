import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SearchContainer from "./SearchContainer";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      blockList: [],
      flowList: []
    };
  }

  updateBlockList = () => {
    axios
      .get("/blocks")
      .then(response => {
        this.setState({
          blockList: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateFlowList = () => {
    axios
      .get("/flows")
      .then(response => {
        this.setState({
          flowList: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderList(fb) {
    return flowDetails => (
      <div>
        <a
          href={`/edit/${fb}/${flowDetails.name}`}
          style={{ color: "rgb(182,182,182)" }}
        >
          {flowDetails.name}
        </a>
      </div>
    );
  }

  componentDidMount() {
    this.updateBlockList();
    this.updateFlowList();
  }

  render() {
    return (
      <Container fluid>
        <Row className="home-welcome">
          <div>
            <h1 className={"home-welcome-head"}>
              {" "}
              Welcome to nemo-assist FT studio
            </h1>
            <p>Manage and Create new FTs in a hassle free way</p>
            <a href={"https://google.com"}>view Documentation</a>
          </div>
        </Row>
        <Row className="home-new-options">
          <Col md="3" className="home-options-title">
            <a className={"home-options-title-link"} href={"/create/flow"}>
              + Create A New Flow
            </a>
          </Col>
          <Col md="3" className="home-options-title">
            <a className={"home-options-title-link"} href={"/create/block"}>
              + Create A New Block
            </a>
          </Col>
        </Row>

        <Row className="home-edit-options">
          <Col md="3" className="home-edit-options-title">
            <div className={"home-options-title-link"}>
              <SearchContainer
                title={
                  <div className={"home-options-title-link"}>
                    Edit Existing Flow
                  </div>
                }
                items={this.state.flowList}
                renderItem={this.renderList("flow")}
                toMatchStr={item => item.name}
                maxHeight={"250px"}
              />
            </div>
          </Col>
          <Col md="3" className="home-edit-options-title">
            <div className={"home-options-title-link"}>
              <SearchContainer
                title={
                  <div className={"home-options-title-link"}>
                    Edit Existing Block
                  </div>
                }
                items={this.state.blockList}
                renderItem={this.renderList("block")}
                toMatchStr={item => item.name}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
