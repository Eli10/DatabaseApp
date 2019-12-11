import React, {Component} from 'react';
import Test from '../map/Map';


class UserPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="page">
        <h1>Closest Restaurants</h1>
        <Test userID={this.props.userID}/>
      </div>
    )
  }
}

export default UserPage;