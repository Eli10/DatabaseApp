import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class NavigationBar extends Component {

  render(){
    return (
      <Navbar bg='light' expand='lg' fixed='top'>
        <Navbar.Brand href="/">Pizza Near Ya!</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href="/map">Map</Nav.Link>
        </Nav>

      </Navbar>
    )
  }
}

export default NavigationBar;