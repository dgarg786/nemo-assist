import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import FlowDrawingBoard from './DrawingBoard.jsx';
import {Row, Col, Container} from 'reactstrap';
import LeftPanel from './LeftPanel';
import axios from 'axios';


class EditBlock extends Component {

    constructor() {
        super();
        this.state = {
            defaultBlock: undefined
        }
    }

    fetchFlow = (flowId)=> {
        axios.get(`/flow/${flowId}`).then((response)=> {
            this.setState({
                defaultFlow: response.data
            })
        }).catch((err) => {console.log(err)});
    };

    render() {
        return (
            <Container fluid>
                <Row className="App-header">
                </Row>
                <Row className="App-body">
                    <LeftPanel />
                    <Col className="work-book">
                        <FlowDrawingBoard defaultFlow={this.state.defaultFlow}/>
                    </Col>
                </Row>
            </Container>
        );
    }

    componentDidMount() {
        this.fetchFlow(this.props.match.params.flowId);
    }


}

export default EditBlock;
