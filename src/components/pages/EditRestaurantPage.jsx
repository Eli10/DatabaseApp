import React, {Component} from 'react';
import CreateRestaurant from '../Forms/CreateRestaurant';

class EditRestaurantPage extends Component{
  
  render(){
    return(
      <div className="page">
        <CreateRestaurant/>
      </div>
    )
  }
}

export default EditRestaurantPage;