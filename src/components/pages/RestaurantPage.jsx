import React, {Component} from 'react';
import FoodMenu from '../tables/FoodMenu';
import EditFood from '../Forms/EditFood';
import RestaurantInfo from '../tables/RestaurantInfo';
import {GetRestaurantFood} from '../../actions/apicalls';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col, Modal} from 'react-bootstrap';

class RestaurantPage extends Component {
  constructor(){
    super();
    this.state = {
      show: false,
      menu: [],
      item_to_pass: 0
    }
  }
  handleShow = (item_id) => {
    console.log(item_id);
    this.setState({
      show: true,
      item_to_pass: item_id
    })
  }

  handleClose = () => {
    this.setState({
      show: false
    })
  }

  async componentDidMount(){
    let menu_items = await GetRestaurantFood(this.props.match.params.id);
    this.setState({
      menu: menu_items || []
    });
  }
  render(){
    return(
      <Container className="page">
        <Modal show={this.state.show} onHide={this.handleClose}>
          <EditFood item={this.state.menu[this.state.item_to_pass]} />
        </Modal>
        <Row>
          <RestaurantInfo/>
        <Col>
          <h2>Pizza Menu</h2>
          <FoodMenu menus={this.state.menu} button_toggle={this.handleShow}/>
        </Col>

        </Row>
      </Container>
    )
  }
}

export default withRouter(RestaurantPage);

