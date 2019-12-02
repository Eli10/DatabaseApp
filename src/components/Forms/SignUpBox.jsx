import React, { Component } from 'react';
// Should Import Links
// Import CSS Page

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
   // e.preventDefault();
    // Does call to Login Route
    // And return result
    alert(`Email: ${this.state.usermail}\nPass: ${this.state.passcode}\nFname: ${this.state.firstname}`);
  }
  render(){
    return (
      <div>
        <form>
          <h1>Sign Up Page</h1>
          <input
            type="name"
            name="firstname"
            onChange={this.handleChange}
            placeholder="First Name"
            required
          />
          <br/>
          <input
            type="name"
            name="lastname"
            onChange={this.handleChange}
            placeholder="Last Name"
            required
          />
          <br/>
          <input
            type="name"
            name="address"
            onChange={this.handleChange}
            placeholder="Address"
            required
          />
          <br/>
          <input
            type="name"
            name="city"
            onChange={this.handleChange}
            placeholder="City"
            required
          />
          <br/>
          <input
            type="name"
            name="state"
            onChange={this.handleChange}
            placeholder="State"
            required
          />
          <br/>
          <input
            type="name"
            name="zipcode"
            onChange={this.handleChange}
            placeholder="Zip Code"
            required
          />
          <br/>
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
