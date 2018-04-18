import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LocationCard from './LocationCard';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {

  constructor(props) {
      super(props);
      this.state = {
          events: [],
          distance: this.props.distance,
          categories: this.props.categories,
          loaded: false
      }
      this.token = "BH6C43BZNN6UUWYUDFHI";
      this.url = "https://www.eventbriteapi.com/v3/events/search/?";

  }

  componentWillMount() {

      var selections = localStorage.getItem("selections");
      console.log(selections)
      var slider = localStorage.getItem("slider");
      console.log(slider);

      var position = localStorage.getItem("position");
      var array = position.split(',')
      console.log(array);

      //selections = selections.replace(/,/g , "&");
      console.log(selections);
      const requestURL = this.url + "token=" + this.token + "&categories=" + selections + "&location.within=" + slider + "km&location.latitude="+ array[0] +"&location.longitude=" + array[1];
      // token=&categories=110&location.within=15km&location.latitude=53.27944&location.longitude=-6.15410



      fetch(requestURL)
        .then(function(response){
          if(response.ok) return response.json();
          throw new Error("Request Failed");
        })
       .then(data => {

            const locations = data.events.map(location => {

                let name;
                try {
                    name = location.name.text;
                }catch(e) {
                    name = "No name"
                }

                let description;
                try {
                    description = location.description.text;
                }catch(e) {
                    description = "No description";
                }

                let id;
                try {
                    id = location.id;
                }catch(e) {
                    id = "No id"
                }

                let image_url;
                try {
                    image_url = location.logo.url;
                }catch (e) {
                    image_url = "http://waterfordrva.com/wp-content/uploads/2014/04/Events-Icon.png";
                }

                let lat;
                try {
                    lat = location.venue.latitude;
                }catch (e) {
                    lat = 0;
                }


                let lng;
                try {
                    lng = location.venue.longitude;
                }catch(e) {
                    lng = 0;
                }


                let website;
                try {
                    website = location.url;
                }catch(e) {
                    website = "No Website";
                }

                let date;
                try {
                    date = location.state.local;
                }catch(e) {
                    date = "No start date";
                }


                return {name: name,
                        description: description,
                        id: id,
                        url: image_url,
                        lat: lat,
                        lng: lng,
                        website: website,
                        date: date
                    };
            });

            //console.log(locations);

           this.setState({
               events: locations,
               loaded: true
           });


       })
       .catch(function(err) {
         console.log(err);
       });

  }


  render() {

      const data = this.state.events;
      let locationList = data.map(location => {
          return  (
            <LocationCard infavourites={false} name={location.name} website={location.website} lat={location.lat} lng={location.lng} website={location.website} data={location.date} description={location.description} id={location.id} image={location.url} key={location.name + location.url}/>
        );
      });


      if (locationList.length == 0 && this.state.loaded) {
          locationList = "Sorry there are no upcoming events for the filters you entered. Try to update them.";
      }

    return (
        <div>
            <a href="/Filters">Back to filters</a>
            <a href="/Favourites" style={{"float": "right"}}>Go to favourites</a>
            <div className="row">{locationList}</div>
        </div>
    );
  }


}

export default Home;
