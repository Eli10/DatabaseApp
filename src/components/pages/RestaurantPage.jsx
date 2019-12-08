import React, {Component} from 'react';
import FoodMenu from '../tables/FoodMenu';
import {Container, Row, Col} from 'react-bootstrap';

class RestaurantPage extends Component {
  render(){
    return(
      <Container className="page">
        <Row>
        <Col>
        {/* Must Include General Restaurant Information */}
        </Col>
        <Col>
          <FoodMenu/>
          </Col>

        </Row>
      </Container>
    )
  }
}

export default RestaurantPage;

