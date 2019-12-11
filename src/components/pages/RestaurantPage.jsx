import React, {Component} from 'react';
import FoodMenu from '../tables/FoodMenu';
import EditFood from '../Forms/EditFood';
import AddFood from '../Forms/AddFood';
import RestaurantInfo from '../tables/RestaurantInfo';
import {GetRestaurantFood, DeleteRestaurant} from '../../actions/apicalls';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col, Modal, Button} from 'react-bootstrap';

class RestaurantPage extends Component {
  constructor(){
    super();
    this.state = {
      show: false,
      add_show: false,
      delete: false,
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
      show: false,
      add_show: false,
      delete: false
    })
  }

  handleAdd = () => {
    this.setState({
      add_show: true
    })
  }
  handleDelete = () => {
    this.setState({
      delete: true
    })
  }

  deleteRestaurant = async () => {
    await DeleteRestaurant({restaurant_id: this.props.match.params.id})
    window.location.href = '/map';
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

        <Modal show={this.state.add_show} onHide={this.handleClose}>
          <AddFood restaurant_id={this.props.match.params.id}/>
        </Modal>

        <Modal show={this.state.delete} onHide={this.handleClose}>
          <Modal.Header>
            <h2>Delete Restaurant</h2>
          </Modal.Header>
            <Modal.Body>
          You are about to delete a Restaurant, are you sure about that?
          <br/>
          <div style={{display:'flex', justifyContent:"space-between"}}>
              <Button variant='danger' onClick={this.handleClose}>No</Button>
              <Button variant='success' onClick={this.deleteRestaurant}>Yes</Button>
          </div>
            </Modal.Body>
        </Modal>
        <Row>
          <Col>
          <RestaurantInfo/>
          <Button block variant="warning" onClick={this.handleDelete}>Delete Restaurant</Button>
          </Col>
          <Col>
          <h2>Pizza Menu</h2>
          <FoodMenu menus={this.state.menu} button_toggle={this.handleShow}/>
          <Button onClick={this.handleAdd} variant='success'>Add Item</Button>
        </Col>

        </Row>
      </Container>
    )
  }
}

export default withRouter(RestaurantPage);

