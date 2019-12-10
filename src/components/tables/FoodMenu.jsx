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
      <Table striped bordered hover size="sm" className='grey-bkg'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th  style={{textAlign:'right'}}>Price</th>
          </tr>
        </thead>
        <tbody>
        {this.state.menu.map((item,index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.item_name}</td>
              <td style={{textAlign:'right'}}>{item.price.toFixed(2)}$</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default withRouter(FoodMenu);