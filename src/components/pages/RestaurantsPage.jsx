import React, {Component} from 'react';
import AllRestaurantsTable from '../tables/AllRestaurantsTable';

class RestaurantsPage extends Component{
  
  render(){
    return(
      <div className="page">
        <AllRestaurantsTable/>
      </div>
    )
  }
}

export default RestaurantsPage;