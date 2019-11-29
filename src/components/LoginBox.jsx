import React, { Component } from 'react';
// Should Import Links
// Import CSS Page

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
   // e.preventDefault();
    // Does call to Login Route
    // And return result
    // if(this.state.passcode === this.state.passcodeCheck)
    //   alert(`Email: ${this.state.usermail}\nPass: ${this.state.passcode}`);
    // else
    //   alert(`Passcode does not match`)
    alert(`Email: ${this.state.usermail}\nPass: ${this.state.passcode}`);
  }
  render(){
    return (
      <div>
        <form>
          <h1>Login Page</h1>
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
        <button onClick={() => {this.props.setPage('SignUp')}}>Create Account</button>
      </div>

    )
  }
}

export default LoginBox;
