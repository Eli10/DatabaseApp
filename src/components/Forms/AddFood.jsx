import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import {AddMenu} from '../../actions/apicalls';

class AddFood extends Component {
  constructor(props){
    super(props);
    this.state = {
      price: '',
      item_name: ''

    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

  
  }

  handleSubmit = async e => {
    e.preventDefault();
    let contents = {
      restaurant_id: this.props.restaurant_id,
      item_name: this.state.item_name,
      price: this.state.price,
      description: ''
    }

    await AddMenu(contents);
    // Refresh page
    window.location.reload();


  }
  render(){
    return (
      <Form onSubmit={this.handleSubmit} className='form-two'>
        <Form.Group>
          <Form.Label>Food Item name</Form.Label>
          <Form.Control
            required  
            type="text"
            name="item_name" 
            placeholder="Food Name"
            onChange={this.handleChange}
          />
          <Form.Label>Price</Form.Label>
          <Form.Control
            required  
            type="number"
            step="0.01"
            min='0'
            name="price" 
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button variant="success" type="submit" size='lg' block>
          Add Item
        </Button>
      </Form>
    )
  }

}

export default AddFood;