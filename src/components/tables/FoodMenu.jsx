import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import {GetRestaurantFood} from '../../actions/apicalls';
import {withRouter} from 'react-router-dom';

class FoodMenu extends Component {
  constructor(){
    super();
    this.state = {
      menu: []
    }
  }

  async componentDidMount(){
    let menu_items = await GetRestaurantFood(this.props.match.params.id);
    this.setState({
      menu: menu_items || []
    });
  }
  render(){
    return(
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
        {this.state.menu.map((item,index) => (
            <tr key={item.item_name}>
              <td>{index+1}</td>
              <td>{item.item_name}</td>
              <td>{item.price.toFixed(2)}$</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default withRouter(FoodMenu);