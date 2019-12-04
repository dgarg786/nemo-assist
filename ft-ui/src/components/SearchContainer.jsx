import React, { Component } from "react";
import { IoIosSearch } from 'react-icons/io';
import { Row, Col } from 'reactstrap';
export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      show: false
    };
  }

  // componentWillReceiveProps(nextProps) {
  //
  // }

  onChangeStr(ev) {
    this.setState({
      searchString: ev.target.value
    });
  }

  searchBlock() {
    return (
      <div style={{'margin': '6px 0px', 'justify-content': 'center', 'padding': '0 10%'}}>
        <Row>
          <Col md={2} style={{'padding':'0px'}}>
            <span><IoIosSearch/></span>
          </Col>
          <Col md={10} style={{'padding':'0px'}}>
            <input
                value={this.state.searchString}
                onChange={ev => this.onChangeStr(ev)}
                style={{'background': 'rgb(30,30,30)', 'color': 'rgb(182,182,182)', 'border': '0', 'outline': 'none'}}
            />
          </Col>

        </Row>

        <Row style={{'justify-content':'center'}}>
          <div style={{'background': 'rgb(50,30,30)', 'color': 'white', 'height': '3px', 'width': '80%'}}/>
        </Row>
      </div>
    );
  }

  isMatch(stringToMatch) {
    let str1 = stringToMatch.toLowerCase();
    let str2 = this.state.searchString.toLowerCase();

    let i = 0,
      j = 0; // check if str2 is subsequence of str1
    while (i < str1.length && j < str2.length) {
      if (str1[i] === str2[j]) j++;
      i++;
    }
    return j >= str2.length;
  }

  renderItems() {
    let renderItem = this.props.renderItem || (() => null);
    let items = this.props.items || [];
    let toMatchStr = this.props.toMatchStr || (a => a);

    return (
      <div style={{'maxHeight': this.props.maxHeight || '100px', 'overflow': 'scroll'}}>
        {items.filter(item => this.isMatch(toMatchStr(item))).map(renderItem)}
      </div>
    );
  }

  toggle() {
        this.setState({
          show: !this.state.show
        })
  }

  render() {
    let title = this.props.title;

    return (
      <div className={"search-container"} >
        <div onClick={this.toggle.bind(this)} style={{'cursor': 'pointer'}}>
          {title}
        </div>
        {(!this.props.enableToggle || (this.props.enableToggle && this.state.show)) && (<div>
          {this.searchBlock()}
          {this.renderItems()}
        </div>)}
      </div>
    );
  }
}
