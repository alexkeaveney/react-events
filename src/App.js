import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Filters from './components/Filters';
import Favourites from './components/Favourites';
import Login from './components/Login';
import ViewLocation from './components/ViewLocation';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./components/Home";
import { Redirect, BrowserRouter, Switch } from 'react-router-dom';


class App extends Component {

  constructor() {
      super();
      this.state = {
          selected: [],
          sliderValue: 11
      }
      window.sliderValue = 11;

  }
  filterChange(f) {

  }

  render() {
      let dist = window.localStorage.getItem("slider");
      if (dist == undefined) {
          dist = 10;
      }

    return (

        <div className="container">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() =>
                        <Login  />}
                    />
                    <Route path="/Filters" render={() =>
                        <Filters />}
                    />
                    <Route path="/Home" render={() => (
                        <Home categories={[this.state.selected]} distance={dist} {...this.props} />
                    )}
                    />
                    <Route path="/ViewLocation/:id" render={(props) => <ViewLocation {...props} />}/>
                    <Route path="/Favourites" render={() =>
                        <Favourites />}
                    />
                </Switch>
            </BrowserRouter>

        </div>
    );
  }
}
// filterBy={(value)=> this.filterChange(value).bind(this)}
// <Route exact path='/' render={(props) => (
//   <PageContent {...props} pass_to_page_content='hi' />
// )}/>

export default App;
