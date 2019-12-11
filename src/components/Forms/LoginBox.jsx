import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import {withRouter, Link} from 'react-router-dom';
const axios = require('axios');

// Should Import Links
// Import CSS Page

let instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASEURL || 'https://cybertron-api.azurewebsites.net',
    headers: {'Content-Type': 'application/json'}
  });


class LoginBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      usermail: '',
      passcode: '',
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
   e.preventDefault();
    let body = JSON.stringify({
      email: this.state.usermail,
      password: this.state.passcode,
    })

    let props = this.props;
    
    instance.post('/sign-in',body)
    .then(function (response) {
      props.setUserID(response.data.user_id);
      props.history.push({
        pathname:'/user',
        state: {
          userID: response.data.user_id,
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render(){
    return (
      <Form onSubmit={this.handleSubmit} className='form-two'>
        <h2>Sign in to Account</h2>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control 
            onChange={this.handleChange}
            required
            type="email"
            name="usermail"
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            required
            type="password"
            name="passcode"
          />
        </Form.Group>
        <Button variant="success" size='lg' block type="submit">
          Login
        </Button>
        <h6>
          Don't have an account? <Link to='signup'>Click here!</Link>
        </h6>
      </Form>

    )
  }
}

export default withRouter(LoginBox);
