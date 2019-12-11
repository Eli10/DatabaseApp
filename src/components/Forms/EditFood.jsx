import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import {UpdateMenu, DeleteMenu} from '../../actions/apicalls';

class EditFood extends Component {
  constructor(props){
    super(props);
    this.state = {
      price: props.item.price,
      item_name: props.item.item_name

    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);

  
  }

  handleSubmit = async e => {
    e.preventDefault();
    let contents = {
      item_id: this.props.item.item_id,
      item_name: this.state.item_name,
      description: this.props.item.description,
      price: this.state.price,
    }

    await UpdateMenu(contents);
    // Refresh page
    window.location.reload();


  }

  handleDelete = async e => {
    e.preventDefault();
    let contents = {
      item_id: this.props.item.item_id
    }
    console.log(contents);
    console.log(await DeleteMenu(contents));
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
            placeholder="Enter Restaurant Name"
            defaultValue={this.props.item.item_name}
            onChange={this.handleChange}
          />
          <Form.Label>Price</Form.Label>
          <Form.Control
            required  
            type="number"
            step="0.01"
            min='0'
            name="price" 
            defaultValue={this.props.item.price}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button variant="danger" onClick={this.handleDelete} size='lg'>
          Delete
        </Button>
        <Button variant="success" type="submit" size='lg'>
          Submit
        </Button>
      </Form>
    )
  }

}

export default EditFood;