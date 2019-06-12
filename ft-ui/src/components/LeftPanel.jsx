import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Lego from './Lego.jsx';
import Block from './Block.jsx';
import { Row, Col } from 'reactstrap';

class LeftPanel extends Component {

    render() {
        return (<Col sm="3">
            <Row className="lego">
                <Col>
                    <Lego />
                </Col>
            </Row>
            <Row className="block">
                <Col>
                    <Block />
                </Col>
            </Row>
        </Col>);
    }
}

export default LeftPanel;
