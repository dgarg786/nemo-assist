import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BlockDrawingBoard from './BlockDrawingBoard.jsx';
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

    fetchBlock = (blockId)=> {
        axios.get(`/block/${blockId}`).then((response)=> {
            this.setState({
                defaultBlock: response.data
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
                        <BlockDrawingBoard defaultBlock={this.state.defaultBlock}/>
                    </Col>
                </Row>
            </Container>
        );
    }

    componentDidMount() {
        this.fetchBlock(this.props.match.params.blockId);
    }


}

export default EditBlock;
