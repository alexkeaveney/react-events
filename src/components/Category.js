import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Category extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected,
            name: this.props.name,
            id: this.props.id
        }

    }


      handleOnClick (value) {
          //console.log(value);
          this.setState({selected: !this.state.selected});
          this.props.onSubClicked(value);
      }


    selected(name) {
        //console.log(name);
        this.setState({
            selected: !this.state.selected
        })
    }

    render() {
        // <a href="#" onClick={() => this.selected(this.props.name)}>
      return (

              <div className="col-md-3 cats">

                  <a href="#" onClick={() => this.handleOnClick(this.state.id)} className="filter" value={this.state.selected} style={ this.state.selected ? {backgroundColor: "#2ecc71", color: "#ffffff"} : {} }>

                         {this.props.name}
                  </a>
              </div>

      );
    }

}

// Checks that the correct type of props are supplied:
Category.propTypes = {
  selected: PropTypes.boolean,
  name: PropTypes.string,
  id: PropTypes.string
};

export default Category;
