import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DrawingBoard from './DrawingBoard.jsx';
import { Row, Col } from 'reactstrap';
import LeftPanel from './LeftPanel';

class BlockWorld extends Component {
    render() {
        return (
            <Row className="App-body">
                <LeftPanel />
                <Col className="work-book">
                    <DrawingBoard />
                </Col>
            </Row>
        );
    }
}

export default BlockWorld;