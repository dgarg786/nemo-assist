import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import set from 'lodash/set';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { GoArchive } from 'react-icons/go';
import { GoPencil } from 'react-icons/go';
import axios from 'axios';
const skipParams = ['type', 'label'];
const delimiter = '##';

export default class BlockDrawingBoard extends Component {
    constructor() {
        super();
        this.state = {
            type: 'block',
            params: {},
            name: '',
            ftConfig: []
        };

        this.onDrop = this.onDrop.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultBlock && !isEqual(nextProps.defaultBlock, this.props.defaultBlock)) {
            const paramKeys = Object.keys(nextProps.defaultBlock.params);
            const newFtConfig = nextProps.defaultBlock.workFlow.map(configData => {
                let variableConfigData = {};
                paramKeys.forEach(key => {
                  if(key.split(delimiter)[0] === configData.label) {
                      let childParamKey = key.split(delimiter).splice(1).join(delimiter);
                      variableConfigData[childParamKey] = true
                  }
                });

                return {
                    stateData: { editMode: false },
                    configData,
                    variableConfigData
                };
            });

            this.setState({
                name: nextProps.defaultBlock.name,
                ftConfig: newFtConfig
            });
        }
    }

    onDrop = ev => {
        try {
            const newDropData = JSON.parse(ev.dataTransfer.getData('dragData'));
            const newFtConfig = cloneDeep(this.state.ftConfig);
            newFtConfig.push({ configData: newDropData, stateData: { editMode: true }, variableConfigData: {} });
            this.setState({ ftConfig: newFtConfig });
        } catch (e) {
            /*
             Do Nothing
             */
        }
    };

    clearState = () => {
        this.setState({ ftConfig: [] });
    };

    onChange = (ev, index, param) => {
        const newFtConfig = cloneDeep(this.state.ftConfig);
        set(newFtConfig, `[${index}].configData.params.${param}`, ev.target.value);
        this.setState({ ftConfig: newFtConfig });
    };

    onChangeLabel = (ev, index) => {
        const newFtConfig = cloneDeep(this.state.ftConfig);
        set(newFtConfig, `[${index}].configData.label`, (ev.target.value || '').replace(/ /g, ''));
        this.setState({ ftConfig: newFtConfig });
    };

    onChangeVarData = (ev, index, param) => {
        const newFtConfig = cloneDeep(this.state.ftConfig);
        set(newFtConfig, `[${index}].variableConfigData.${param}`, ev.target.checked || false);
        this.setState({ ftConfig: newFtConfig });
    };

    renderEditParam = (param, value, index) => {
        return (
            <Row key={param} className="brick-edit-param">
                <Col>{param}</Col>
                <Col>
                    <input value={value} onChange={ev => this.onChange(ev, index, param)} />
                </Col>
                <Col>
                    <input
                        type="checkbox"
                        defaultChecked={get(this, `state.ftConfig[${index}].variableConfigData.${param}`)}
                        onChange={ev => this.onChangeVarData(ev, index, param)}
                    />
                </Col>
            </Row>
        );
    };

    doneBrickEdit = index => {
        const newFtConfig = cloneDeep(this.state.ftConfig);
        set(newFtConfig, `[${index}].stateData.editMode`, false);
        this.setState({ ftConfig: newFtConfig });
    };

    removeBrick(index) {
        const newFtConfig = cloneDeep(this.state.ftConfig);
        newFtConfig.splice(index, 1);
        this.setState({ ftConfig: newFtConfig });
    }

    editBrick(index) {
        const newFtConfig = cloneDeep(this.state.ftConfig);
        set(newFtConfig, `[${index}].stateData.editMode`, true);
        this.setState({ ftConfig: newFtConfig });
    }

    renderBrickEdit = (brickConfig, index) => {
        const configData = brickConfig.configData;
        return (
            <div key={index} className="brick-edit">
                <div>
                    <Row>
                        <Col sm="9">
                            <input
                                className="brick-edit-title"
                                value={configData.label || configData.name}
                                onChange={ev => this.onChangeLabel(ev, index)}
                            />
                        </Col>
                        <Col sm="3">
                            <span onClick={ev => this.removeBrick(index)}>
                                <GoArchive />
                            </span>
                        </Col>
                    </Row>
                </div>
                <div className="brick-edit-params">
                    {Object.keys(configData.params)
                        .filter(param => skipParams.indexOf(param) === -1)
                        .map(param => this.renderEditParam(param, configData.params[param], index))}
                </div>
                <button onClick={ev => this.doneBrickEdit(index)}>Done</button>
            </div>
        );
    };

    renderBrick = (brickConfig, index) => {
        if (brickConfig.stateData.editMode) {
            return this.renderBrickEdit(brickConfig, index);
        }
        return (
            <div className="brick" key={index}>
                <Row>
                    <Col />
                    <Col sm="9">{brickConfig.configData.label || brickConfig.configData.name}</Col>
                    <Col sm="1">
                        <span onClick={ev => this.editBrick(index)}>
                            <GoPencil />
                        </span>
                    </Col>
                    <Col sm="1">
                        <span onClick={ev => this.removeBrick(index)}>
                            <GoArchive />
                        </span>
                    </Col>
                </Row>
            </div>
        );
    };
    onDragOver = ev => {
        ev.preventDefault();
    };

    saveBlock = () => {
        const params = {};
        this.state.ftConfig.forEach((brickConfig, index) => {
            const varParams = Object.keys(brickConfig.variableConfigData || {}).filter(
                param => brickConfig.variableConfigData[param]
            );
            const brickLabel = brickConfig.configData.label;
            varParams.forEach(param => {
                params[`${brickLabel}${delimiter}${param}`] = '';
            });
        });
        const finalBlockConfig = {
            type: 'block',
            name: this.state.name,
            params,
            workFlow: this.state.ftConfig.map(br => br.configData)
        };

        // console.log(finalBlockConfig);
        axios
            .post('/save/block', finalBlockConfig)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    };

    onChangeBlockName = ev => {
        this.setState({ name: (ev.target.value || '').replace(/ /g, '') });
    };

    renderHeader = () => {
        return (
            <Row className="drawing-board-header">
                <Col className="drawing-board-button-container">
                    <button className="drawing-board-button" onClick={this.clearState}>
                        Clear
                    </button>
                </Col>
                <Col className="drawing-board-button-container">
                    <input value={this.state.name} placeholder={'Block Name'} onChange={this.onChangeBlockName} />
                </Col>
                <Col className="drawing-board-button-container">
                    <button className="drawing-board-button" onClick={this.saveBlock}>
                        Save Block
                    </button>
                </Col>
            </Row>
        );
    };

    render() {
        return (
            <div className="drawing-board">
                {this.renderHeader()}
                <Row className="drawing-board-container" onDrop={this.onDrop} onDragOver={this.onDragOver}>
                    <Col sm="9">{this.state.ftConfig.map(this.renderBrick)}</Col>
                </Row>
            </div>
        );
    }
}
