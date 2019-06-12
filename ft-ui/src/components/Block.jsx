import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from "axios";
import { FiRefreshCcw } from 'react-icons/fi';
import { GoPencil } from 'react-icons/go';
import { GoArchive } from 'react-icons/go';

export default class Block extends Component {

    constructor() {
        super();
        this.state = {
            blockList: []
        }
    }

    onDragStart= (ev, block)=> {
        ev.dataTransfer.setData('dragData', JSON.stringify({
            type: "block",
            ...block
        }));
    };

    updateBlockList = ()=> {
        axios.get('/blocks').then((response)=> {
            this.setState({
                blockList: response.data
            })
        }).catch((err) => {console.log(err)});

    };

    componentDidMount() {
        this.updateBlockList();
    }

    deleteBlock = (blockName) => {
        axios.post(`/delete/block/${blockName}`).then(()=> {
            this.updateBlockList();
        }).catch((err) => {console.log(err)});

    };

    renderBlock = (block, index)=> {
        return(
            <Row key={index} draggable={true}
                     onDragStart={ev => this.onDragStart(ev, block)}
                     onDragEnd={this.onDragEnd}
            >
                    <div className="lego-card" >
                        <Row>
                            <Col sm="9">
                                {block.name}
                            </Col>
                            <Col sm="1">
                                <a href={`/edit/block/${block.name}`} target="_blank"><GoPencil/> </a>
                            </Col>
                            <Col sm="1">
                                <GoArchive onClick={()=>{this.deleteBlock(block.name)}}/>
                            </Col>
                        </Row>

                    </div>
            </Row>)
    };

    render() {
        return (
            <div>
                <Row className="block-header">
                    <Col>Drag a Block</Col>
                    <Col sm="1">
                        <div onClick={this.updateBlockList}>
                            <FiRefreshCcw/>
                        </div>
                    </Col>
                </Row>
                <div className="lego-list-container" >
                    {(this.state.blockList).map(this.renderBlock)}
                </div>
            </div>);
    }
}