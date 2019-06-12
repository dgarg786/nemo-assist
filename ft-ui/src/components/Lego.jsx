import React, { Component } from 'react';

import { Row } from 'reactstrap';
import axios from "axios";

export default  class Lego extends Component {



    constructor() {
        super();
        this.state = {
            legoList: []
        }
    }

    onDragStart= (ev, lego)=> {
        ev.dataTransfer.setData('dragData', JSON.stringify({
            type: "lego",
            ...lego
        }));
    };
    renderLego = (lego, index)=> {
        return(
            <Row key={index} draggable={true}
                     onDragStart={ev => this.onDragStart(ev, lego)}
                     onDragEnd={this.onDragEnd}
            >
                <div className="lego-card" >{lego.name}</div>
            </Row>)
    };


    updateLegoList = ()=> {
        axios.get('/legos').then((response)=> {
            this.setState({
                legoList: response.data
            })
        }).catch((err) => {console.log(err)});

    };

    componentDidMount() {
        this.updateLegoList();
    }

    render() {
        return (
            <div>
                <div> Drag a Lego</div>
                <div className="lego-list-container" >
                    {(this.state.legoList || []).map(this.renderLego)}
                </div>
            </div>);
    }
}