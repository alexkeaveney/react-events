import React, { Component } from 'react';
import LocationCard from './LocationCard';


class Favourites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favourites: []
        }

    }

    componentWillMount() {
        let fav = localStorage.getItem("favourites");

        console.log(fav);

        if (fav != undefined) {
            console.log("fav is not undefined");
            fetch('http://localhost:5000/api/getfavourites/' + fav)
            .then(function(response){
              if(response.ok) return response.json();
              throw new Error("Request Failed");
            })
           .then(data => {
               //console.log(data.locations);
               this.setState({
                  favourites: data.locations
               });
           })
           .catch(function(err) {
             console.log(err);
           });
        }
        else {
            alert("No Favourites");
        }

    }

    render() {

        const data = this.state.favourites;
        let locationList = data.map(location => {
            console.log(location);
            return  (
              <LocationCard infavourites={true} name={location.name} website={location.website} lat={location.lat} lng={location.lng} website={location.website} data={location.date} description={location.description} id={location.eventbrite} image={location.image_url} key={location.name + location.url}/>
          );
        });

      return (
            <div>
                <div className="row">
                    <div class="col-md-12">
                        <a href="/Home">Back to home</a>
                    </div>
                </div>
                <div className="row">
                    {locationList}
                </div>

            </div>


      );
    }

}


export default Favourites;
