import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter, Redirect } from "react-router-dom";
import Filters from './Filters';

class Login extends Component {

  constructor(props) {
      super(props);
      this.state = {
          navigate: false
      }
  }

  componentWillMount() {

      //localStorage.removeItem('favourites');

      window.fbAsyncInit = function() {
      	//SDK loaded, initialize it

      	window.FB.init({
      		appId      : '155111421837250',
      		xfbml      : true,
      		version    : 'v2.9'
      	});

        window.FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
        }.bind(this));
    }.bind(this);



      //load the JavaScript SDK
      (function(d, s, id){
      	var js, fjs = d.getElementsByTagName(s)[0];
      	if (d.getElementById(id)) {return;}
      	js = d.createElement(s); js.id = id;
      	js.src = "http://connect.facebook.com/en_US/sdk.js";
      	fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

  }
  statusChangeCallback(response) {
      console.log('statusChangeCallback');


      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        //this.testAPI();
        //this.requestPlaces();
        console.log("connected");

        document.getElementsByClassName('fb-login-button')[0].style = "display: none";
        document.getElementById("spinner").style = "display: none";

        //either sign up or sign in with user id
        console.log(response.authResponse.userID);

        this.login(response.authResponse.userID);



        //redirect to filters screen

      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        console.log("not authorized");
        document.getElementsByClassName('fb-login-button')[0].style = "display: block";
        document.getElementById("spinner").style = "display: none";

      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        console.log("Log into fb");
        document.getElementsByClassName('fb-login-button')[0].style = "display: block";
        document.getElementById("spinner").style = "display: none";

      }
    }

    showLoginButton() {
        var finished_rendering = function() {
  console.log("finished rendering plugins");
  var spinner = document.getElementById("spinner");
  spinner.removeAttribute("style");
  spinner.removeChild(spinner.childNodes[0]);
}
window.FB.Event.subscribe('xfbml.render', finished_rendering);
    }

    login(id) {
        fetch("http://localhost:5000/api/login/" + id)
          .then(function(response){
            if(response.ok) return response.json();
            throw new Error("Request Failed");
          })
         .then(data => {
             console.log(data);
             window.localStorage.setItem("id", data.id);
             window.localStorage.setItem("facebook", data.facebook);
             this.setState({
                 navigate: true
             })
         })
         .catch(function(err) {
           console.log(err);
         });
    }

  render() {

      if (this.state.navigate) {
        return <Redirect to="/Filters" push={true} />
      }

    return (
        <div id="login">
            <div id="spinner">
                Loading

            </div>
            <div
            className="fb-login-button"
            data-max-rows="1"
            data-size="large"
            data-button-type="continue_with"
            data-use-continue-as="true"
            ></div>
        </div>
    );
  }


}

export default Login;
