import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Categories from './Categories';
import DistanceSlider from './DistanceSlider';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import { Redirect, BrowserRouter, Switch } from 'react-router-dom';





class Filters extends Component {

  constructor(props) {

      super(props);

      let distance = window.localStorage.getItem('slider');
      let selections = window.localStorage.getItem('selections');
      console.log(selections);
      var array = selections.split(',')
      console.log(array);
      if (array[0]=="") {
          array=[];
      }

      if (distance === undefined) {
          distance = 10;
      }

      this.state = {
          selected: array,
          sliderValue: distance,
          navigate: false
      }

  }

  componentWillMount() {
      console.log("Filters ====" + this.state.sliderValue);
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(location) {
              window.localStorage.setItem("position", [location.coords.latitude,
              location.coords.longitude]);
          });
      } else {
            console.log("Geolocation is not supported by this browser.");
      }
  }



  submit() {
      console.log("Submitted");
  }

  handleSliderChange(v) {
      console.log(v);
      this.setState({
         sliderValue: v
      });
      window.localStorage.setItem("slider", v);
  }

  handleFilterChange(f) {
      //this.props.filterBy(f);
      console.log(f);
      console.log("FITLER CHANGE!!!!");

            let check = false;
            for (let i =0; i < this.state.selected.length; i++) {
                if (f == this.state.selected[i]) {
                   check = true;
                   this.state.selected.splice(i, 1);
                }
            }
            if (!check) {
                this.state.selected.push(f);
            }
            window.localStorage.setItem("selections", this.state.selected);
  }

  submitForm = (e) => {
    e.preventDefault();
    console.log(this.state.selected);
    if (this.state.selected.length > 0) {
        console.log(this.state.selected);
        this.setState({
            navigate: true
        });
    }else{
        alert("You must select atleast one filter!!!");
    }

  }




  render() {

      if (this.state.navigate) {
        return <Redirect to="/Home" push={true} />
      }

    return (
        <div>
            <h1 className="filterHeader">What would you like?</h1>
                <form>
                    <Categories filterChange={(value)=> this.handleFilterChange(value)} />
                    <DistanceSlider start={this.state.sliderValue} onSlide={(value)=> this.handleSliderChange(value)} />
                    <div className="buttonContainer">
                        <input className="submitButton" type="submit" value="submit" onClick={this.submitForm} />
                    </div>
                </form>

        </div>
    );
  }


}

export default Filters;
