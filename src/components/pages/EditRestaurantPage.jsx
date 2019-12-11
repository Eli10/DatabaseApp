import React, {Component} from 'react';
import EditRestaurant from '../Forms/EditRestaurant';
import {withRouter} from 'react-router-dom';

class EditRestaurantPage extends Component{


  render(){

    return(
      <div className="page">
        <EditRestaurant id={this.props.match.params.id}/>
      </div>
    )
  }
}

export default withRouter(EditRestaurantPage);