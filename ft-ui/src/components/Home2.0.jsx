import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import FlowWorld from './FlowWorld.jsx';
import BlockWorld from './BlockWorld.jsx';
import { Container, Row, Col } from 'reactstrap';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            isCreateForm: true,
            isCreateBlock: false
        };
    }

    onCreateBlock = () => {
        this.setState({
            isCreateForm: false,
            isCreateBlock: true
        });
    };

    onCreateFlow = () => {
        this.setState({
            isCreateForm: true,
            isCreateBlock: false
        });
    };

    render() {
        return (
            <Container fluid>
                <Row className="App-header">
                    <Col
                        onClick={this.onCreateFlow}
                        className={this.state.isCreateForm ? 'App-header-tile-selected' : 'App-header-tile'}
                    >
                        Create A New Flow
                    </Col>
                    <Col
                        onClick={this.onCreateBlock}
                        className={this.state.isCreateBlock ? 'App-header-tile-selected' : 'App-header-tile'}
                    >
                        Create A New Block
                    </Col>
                </Row>
                {this.state.isCreateForm && <FlowWorld />}
                {this.state.isCreateBlock && <BlockWorld />}
            </Container>
        );
    }
}

export default Home;
