import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ViewLocations extends Component {

  constructor(props) {
      super(props);
      this.state = {
          id: this.props.match.params.id,
          name: "",
          desc: "",
          image_url: "",
          latitude: 0,
          longitude: 0,
          venue: "",
          url: "",
          date: ""
      }
      this.token = "BH6C43BZNN6UUWYUDFHI";
      this.url = "https://www.eventbriteapi.com/v3/events/";
  }

  componentWillMount() {

      let id = this.state.id;
      let token = this.token;
      let requestURL = this.url + id + "/?token=" + token + "&expand=venue";

      fetch(requestURL)
        .then(function(response){
          if(response.ok) return response.json();
          throw new Error("Request Failed");
        })
       .then(data => {

           let n = data.name.text;
           let d = data.description.text;
           let i = data.logo.url;
           let lat = data.venue.latitude;
           let lng = data.venue.longitude;
           let ven = data.venue.name;
           let url = data.url;
           let date = data.start.local;
           console.log(n);
           console.log(d);
           console.log(i);
           console.log(lat);
           console.log(lng);
           console.log(ven);
           console.log(url);
           console.log(date);

           this.setState({
               name: n,
               desc: d,
               image_url: i,
               latitude: lat,
               longitude: lng,
               venue: ven,
               url: url,
               date: date
           });

       })
       .catch(function(err) {
         console.log(err);
       });



  }


  render() {

    return (
        <div>
            <div className="col-md-12"><a href="/Home">Back to search results</a></div>
            <div className="col-md-12 space"><img src={this.state.image_url} /></div>
            <div className="col-md-12 space"><b>Name: </b> {this.state.name}</div>
            <div className="col-md-12 space"><b>Venue: </b> {this.state.venue}</div>
            <div className="col-md-6 space" style={{"overflow-y": "scroll", "max-height": "250px"}}><b>Description: </b>{this.state.desc}</div>
            <div className="col-md-12 space"><a href={this.state.url} class="btn btn-primary">Buy Tickets</a></div>
        </div>
    );
  }


}

export default ViewLocations;
