import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

class FoodMenu extends Component {


  render(){
    return(
      <Table striped bordered hover size="sm" className='grey-bkg'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th  style={{textAlign:'right'}}>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
        {this.props.menus.map((item,index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.item_name}</td>
              <td style={{textAlign:'right'}}>{item.price.toFixed(2)}$</td>
              <td><Button onClick={() => this.props.button_toggle(index)}>Edit</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default withRouter(FoodMenu);