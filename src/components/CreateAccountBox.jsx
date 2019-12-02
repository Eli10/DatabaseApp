import React, { Component } from 'react';
// Should Import Links
// Import CSS Page

class CreateAccountBox extends Component {
  constructor(){
    super();
    this.state = {
      usermail: '',
      passcode: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
   // e.preventDefault();
    // Does call to Login Route
    // And return result
    alert(`Email: ${this.state.usermail}\nPass: ${this.state.passcode}`);
  }
  render(){
    return (
      <div>
        <form>
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
        <button>Create Account</button>
      </div>

    )
  }
}

export default LoginBox;