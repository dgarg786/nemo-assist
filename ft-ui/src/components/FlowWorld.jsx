import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DrawingBoard from './DrawingBoard.jsx';
import {Row, Col, Container} from 'reactstrap';
import LeftPanel from './LeftPanel';

class FlowWorld extends Component {
    render() {
        return (

            <Container fluid>

                <Row className="App-body">
                    <LeftPanel />
                    <Col className="work-book">
                        <DrawingBoard />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default FlowWorld;