import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import {GetAllRestaurants} from '../../actions/apicalls';
import {Link} from 'react-router-dom';

class AllRestaurantsTable extends Component {
  constructor(){
    super();
    this.state = {
      list: {
        restaurants: []
      } 
    }
  }

  async componentDidMount(){
    let list = await GetAllRestaurants();
    this.setState({
      list: list
    })
  }

  render(){
    return (

    <div className='grey-bkg'>
      <Table striped bordered hover>
        <thead>
          <th>Restaurant Name</th>
          <th>Address</th>
          <th>Rating</th>
          <th>Menu Link</th>
        </thead>

        <tbody>
          {this.state.list.restaurants.map((r,index) => (
            <tr>
              <td>{r.name}</td>
              <td>{`${r.street}, ${r.city}, ${r.state}, ${r.zipcode}`}</td>
              <td style={{textAlign: 'center'}}>{r.rating}</td>
              <td>{<Link to={`/restaurant/${r.restaurant_id}`}>[Click Here!]</Link>}</td>
            </tr>
          ))}
        </tbody>

      </Table>
    </div>
    )
  }
}

export default AllRestaurantsTable;