import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class NavigationBar extends Component {

  render(){
    return (
      <Navbar bg='light' expand='lg' fixed='top'>
        <Navbar.Brand href="/">Pizza Near Ya!</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href="/map">View Map</Nav.Link>
          <Nav.Link href="/all-restaurants">All Restaurants</Nav.Link>
          <Nav.Link href="/create-restaurant">Add Restaurant</Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Create Account</Nav.Link>

        </Nav>

      </Navbar>
    )
  }
}

export default NavigationBar;