import React, {Component} from 'react';
import {Col,Table} from 'react-bootstrap';
import {GetRestaurant} from '../../actions/apicalls';
import {withRouter} from 'react-router-dom';


class RestaurantInfo extends Component {
  constructor(){
    super();
    this.state = {
      information: {}
    }
  }

  async componentDidMount(){
    let info = await GetRestaurant(this.props.match.params.id);
    this.setState({
      information: info
    });
  }

  render(){
    return(
      <Col>
        <h1>{this.state.information.name}</h1>
        <h5>{this.state.information.cuisine_type}</h5>
        <h3>Information</h3>
        <Table>
          <thead>
            <th>Sanitary Grade</th>
            <th>Rating</th>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.information.sanitary_grade}</td>
              <td>{this.state.information.rating}</td>
            </tr>
          </tbody>
        </Table>
        <h3>Address</h3>
        <Table>
          <tbody>
            <tr>
              <td colSpan='3'>{this.state.information.street} </td>
            </tr>
            <tr>
              <td>{this.state.information.city}</td>
              <td>{this.state.information.state}</td>
              <td>{this.state.information.zipcode}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    )
  }
}

export default withRouter(RestaurantInfo);