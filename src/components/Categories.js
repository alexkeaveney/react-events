import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Category from './Category';
import 'bootstrap/dist/css/bootstrap.min.css';


class Categories extends Component {

  constructor(props) {
      super(props);
      this.state = {
          categories: [],
          selected: []
      }
  }

  handleChildClick(childValue) {

      this.props.filterChange(childValue);

  }

  componentWillMount() {

      fetch ("https://www.eventbriteapi.com/v3/categories/?token=BH6C43BZNN6UUWYUDFHI")
      .then(response => {
          if(response.ok) return response.json();
          throw new Error("Request Failed");
      })
      .then(data => {

          const cats = data.categories.map(cat => {
             // console.log(cat);
             // console.log(cat.name);
             // console.log(cat.id);
             return {   name: cat.name,
                        id: cat.id
                    };
          });

          this.setState({categories: cats});

      })
    .catch(err => {
       console.log(err);
    });
  }



  submit() {
      console.log("submit tapped");
  }

  render() {

      const data = this.state.categories;

      var selections = localStorage.getItem("selections");
      var array = selections.split(',')

      let catList = data.map(cat => {
          let check = false;
          for (var i =0; i < array.length; i++) {
              if (cat.id == array[i]) {
                  check = true;
              }
          }

        return (
          <Category name={cat.name} id={cat.id} selected={check} key={cat.name + cat.id} onSubClicked={(value)=> this.handleChildClick(value)} />
        );
      });

      //console.log(catList[0]);

    return (
        <div>
            <div className="row filters">
                {catList}
            </div>

        </div>




    );
  }


}

export default Categories;
