import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import {Button, Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
const axios = require('axios');


// Should Import Links
// Import CSS Page
let instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL || 'https://cybertron-api.azurewebsites.net',
  headers: {'Content-Type': 'application/json'}
});

class SignUpBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      usermail: '',
      passcode: '',
      address: '',
      city: '',
      state: '',
      zipcode: '',

    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    console.log("h");
    e.preventDefault();
    // Does call to Login Route
    // And return result
    let body = JSON.stringify({
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      email: this.state.usermail,
      password: this.state.passcode,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zipcode: Number(this.state.zipcode),
    });

    let props = this.props; 
    instance.post('/sign-up',body)
    .then( (response) => {
      console.log(response);
      props.history.push('/sign-in');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    return (
      <Form onSubmit={this.handleSubmit} className='form-two'>
        <h2>Account Registration</h2>
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                onChange={this.handleChange}
                required
                type="text"
                name="firstname"
                placeholder="First Name"
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                onChange={this.handleChange}
                required
                type="text"
                name="lastname"
                placeholder="Last Name"
              />
            </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            onChange={this.handleChange}
            required
            type="email"
            name="usermail"
            placeholder="name@example.com"
          />

          <Form.Label>Password</Form.Label>
          <Form.Control 
            onChange={this.handleChange}
            required
            type="password"
            name="passcode"
            placeholder="Password"
          />
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
          <Form.Row>
            <Col>
              <Form.Label>City</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                required  
                type="text" 
                name="city"
                placeholder="City"
              />
            </Col>
            <Col>
              <Form.Label>State</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                required 
                type="text"
                maxLength="2" 
                name="state"
                placeholder="state"
              />
            </Col>

            <Col>
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                required 
                type="number"
                min="1"
                max="99999"
                name="zipcode"
                placeholder="zipcode"
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Button variant="success" size='lg' type='submit'>Sign up!</Button>
      </Form>
    )
  }
}

export default withRouter(SignUpBox);
