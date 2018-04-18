import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class LocationCard extends Component {

  constructor(props) {
      super(props);
      this.state = {
          infavourites: this.props.infavourites,
          name: this.props.name,
          description: this.props.description,
          id: this.props.id,
          image_url: this.props.image,
          lat: this.props.lat,
          lng: this.props.lng,
          website: this.props.website,
          date: this.props.date
      }
  }

  componentWillMount() {
  }

  favourite(e) {
      e.preventDefault();
      let fav = localStorage.getItem('favourites');
      if (fav === null) {
          localStorage.setItem('favourites', [this.state.id]);
      }else {
          console.log(fav);
          var array = fav.split(',');
          let check = false;
          for (let i = 0; i < array.length; i++) {
              if (array[i]==this.state.id) {
                  check = true;
              }
          }
          if (!check) {
              array.push(this.state.id);
              localStorage.setItem('favourites', array);
          }
      }

      fetch('http://localhost:5000/api/favourite/' + this.state.id)
      .then(function(response){
        if(response.ok) return response.json();
        throw new Error("Request Failed");
      })
     .then(data => {
         console.log(data);
     })
     .catch(function(err) {
       console.log(err);
     });

  }


  render() {
      const url = "/ViewLocation/" + this.state.id;




        if (this.state.infavourites) {
            return (
                <div className="locContainer col-md-3 align-items-stretch">
                    <a href={url}>
                    <div class="card">
                    <img class="card-img-top" src={this.state.image_url} alt="Card image cap" />
                      <div class="card-body">
                        <h5 class="card-title"><p>{this.state.name}</p></h5>
                      </div>
                    </div>
                    </a>
                </div>
            );
        }
        else {
            return (
                <div className="locContainer col-md-3 align-items-stretch">
                    <a href={url}>
                    <div class="card">
                    <img class="card-img-top img-change" src={this.state.image_url} alt="Card image cap" />
                      <div class="card-body cbody">
                        <h5 class="card-title"><p>{this.state.name}</p></h5>
                        <a onClick={this.favourite} class="btn btn-primary favButton">Add to favourite</a>
                      </div>
                    </div>
                    </a>
                </div>
            );
        }
  }
}

// <a href={url}>
//     <img src={this.state.image_url} height={"200px"} width={"200px"} />
//     <p>{this.state.name}</p>
//
// </a>

export default LocationCard;
