import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

class NavigationBar extends Component {

  render(){
    return (
      <Navbar bg='light' expand='lg' fixed='top'>
        <Navbar.Brand as={Link} to="/">Pizza Near Ya!</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to="/map">View Map</Nav.Link>
          <Nav.Link as={Link} to="/all-restaurants">All Restaurants</Nav.Link>
          <Nav.Link as={Link} to='/user'>Account</Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link as={Link} to="/login">login</Nav.Link>
          <Nav.Link as={Link} to="/signup">Create Account</Nav.Link>

        </Nav>

      </Navbar>
    )
  }
}

export default NavigationBar;