import React, { Component } from 'react';
// Should Import Links
// Import CSS Page

class SignUpBox extends Component {
  constructor(props){
    super(props);
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
          <h1>Sign Up Page</h1>
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
            value="Create Account"
            onClick={this.handleSubmit}
          />
        </form>
        <button onClick={() => {this.props.setPage('Login')}}>Login</button>
      </div>

    )
  }
}

export default SignUpBox;