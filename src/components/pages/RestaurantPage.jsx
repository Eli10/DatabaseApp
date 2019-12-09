import React, {Component} from 'react';
import FoodMenu from '../tables/FoodMenu';
import RestaurantInfo from '../tables/RestaurantInfo';
import {Container, Row, Col} from 'react-bootstrap';

class RestaurantPage extends Component {
  render(){
    return(
      <Container className="page">
        <Row>
          <RestaurantInfo/>
        <Col>
          <h2>Pizza Menu</h2>
          <FoodMenu/>
        </Col>

        </Row>
      </Container>
    )
  }
}

export default RestaurantPage;

