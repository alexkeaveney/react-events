import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range } from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';


class DistanceSlider extends Component {

  constructor(props) {
      super(props);
      this.state = {
          range: this.props.start
      }

  }

  componentWillMount() {
      console.log("Distance Slider class ===" + this.state.range);
  }

  changeValue(v) {
      this.setState({
         range: v
      });
      console.log(v);
      this.props.onSlide(v);
  }


  render() {

    return (
        <div>
            <p>Set max distance</p>
            <Slider min={1} max={20} value={this.state.range} onChange={this.changeValue.bind(this)} />
            <span>{this.state.range}</span>
        </div>
    );
  }


}

export default DistanceSlider;
