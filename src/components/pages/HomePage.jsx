import React, {Component} from 'react';
import { Jumbotron, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div className="page">
        <Jumbotron>
          <h1>Finding Pizza, Quicker.</h1>
          <p>
            Pizza Near Ya! is a simple webapp to help you find a location that serves pizza.
            Anyone can help contribute, so just add a pizza-serving area if you don't see one!
          </p>
          <Row style={{justifyContent: 'space-between'}}>
            <Link to="/map" className="btn btn-danger">Find Pizza</Link>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </Row>
        </Jumbotron>

      </div>
    )
  }
}

export default HomePage;