import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import {Col, Button} from 'react-bootstrap';
import {GetCoords, SetRestaurant} from '../../actions/apicalls';
import {Redirect} from 'react-router-dom';

class CreateRestaurant extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      sanitary_grade: 'A',
      cuisine_type: 'Pizzeria',
      rating: 0,
      street: '',
      city: '',
      state: '',
      zipcode: '',
      latitude: 0,
      longitude: 0
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

  
  }

  handleSubmit = async e => {

    e.preventDefault();
    let coordinates = await GetCoords(this.state.street,this.state.city,this.state.zipcode);
    // Get Location using api
    console.log(coordinates);

    // Send to API
    let toSend = {
      name: this.state.name,
      cuisine_type: this.state.cuisine_type,
      sanitary_grade: this.state.sanitary_grade,
      rating: 0,
      street_adr: this.state.street,
      cityaddr: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      latitude: coordinates.lat,
      longitude: coordinates.lng
    }
    console.log(toSend);
    let result = await SetRestaurant(toSend);
    console.log(result);

    
  }
  render(){
    return (
      <Form onSubmit={this.handleSubmit} className='form-two'>
        <Form.Group>
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            required  
            type="text"
            name="name" 
            placeholder="Enter Restaurant Name"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group>
        <Form.Row>
          <Col>
            <Form.Label>Sanitary Grade</Form.Label>
            <Form.Control 
              as="select"
              name="sanitary_grade"
              onChange={this.handleChange}>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </Form.Control>
          </Col>

          <Col>
            <Form.Label>Cuisine Type</Form.Label>
            <Form.Control 
              as="select"
              name="cuisine_type"
              onChange={this.handleChange}>
                <option>Pizzeria</option>
                <option>Italian</option>
                <option>Bar</option>
                <option>Other</option>
            </Form.Control>
          </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            required  
            type="text"
            name="street" 
            placeholder="Enter Address"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>City</Form.Label>
              <Form.Control
                required  
                type="text" 
                name="city"
                placeholder="City"
                onChange={this.handleChange}
              />
            </Col>
            <Col>
              <Form.Label>State</Form.Label>
              <Form.Control
                required 
                type="text" 
                name="state"
                placeholder="state"
                onChange={this.handleChange}
              />
            </Col>

            <Col>
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                required 
                type="text" 
                name="zipcode"
                placeholder="zipcode"
                onChange={this.handleChange}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Button variant="success" type="submit" size='lg' block>
          Submit
        </Button>
      </Form>
    )
  }

}

export default CreateRestaurant;