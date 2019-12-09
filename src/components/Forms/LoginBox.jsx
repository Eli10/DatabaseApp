import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
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

  test = () => {
    return <Redirect to="/signup"/>
  }
  handleSubmit = e => {
   e.preventDefault();
    // Does call to Login Route
    // And return result
    // if(this.state.passcode === this.state.passcodeCheck)
    //   alert(`Email: ${this.state.usermail}\nPass: ${this.state.passcode}`);
    // else
    //   alert(`Passcode does not match`)
    let body = JSON.stringify({
      email: this.state.usermail,
      password: this.state.passcode,
    })

    instance.post('/sign-in',body)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render(){
    return (
      <div className="form">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            name="usermail"
            onChange={this.handleChange}
            placeholder="Email"
            required
          />
          <br/>
          <input
            type="password"
            name="passcode"
            onChange={this.handleChange}
            placeholder="Password"
            required
          />
          <br/>

          <input
            type="submit"
            value="Login"
            onClick={this.handleSubmit}
          />
        </form>
        <button onClick={this.test}><Link to="/signup">Create Account</Link></button>
      </div>

    )
  }
}

export default LoginBox;
