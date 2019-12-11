import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import {Col, Button} from 'react-bootstrap';
import {GetCoords, UpdateRestaurant, GetRestaurant} from '../../actions/apicalls';
import {Link} from 'react-router-dom';

class EditRestaurant extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      sanitary_grade: "",
      cuisine_type: '',
      rating: 0,
      street: '',
      city: '',
      state: '',
      zipcode: '',
      latitude: 0,
      longitude: 0
    }
  }

  async componentDidMount(){
    let result = await GetRestaurant(this.props.id);

    this.setState(
      result
    )
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

  
  }
  

  handleSubmit = async e => {

    e.preventDefault();
    let coordinates = await GetCoords(this.state.street,this.state.city,this.state.zipcode) || {lat: 0, lng: 0};


    // Send to API
    let toSend = {
      restaurant_id: this.state.restaurant_id,
      name: this.state.name,
      cuisine_type: this.state.cuisine_type,
      sanitary_grade: this.state.sanitary_grade,
      rating: this.state.rating,
      street_adr: this.state.street,
      cityaddr: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      latitude: coordinates.lat,
      longitude: coordinates.lng
    }

    await UpdateRestaurant(toSend);
    window.location.href = `/restaurant/${this.props.id}`;
  }
  
  render(){

    return (
      <Form onSubmit={this.handleSubmit} className='form-two'>
        <Form.Group>
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            required  
            type="text"
            name="name" 
            placeholder="Enter Restaurant Name"
            defaultValue={this.state.name || ''}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group>
        <Form.Row>
          <Col>
            <Form.Label>Sanitary Grade</Form.Label>
            <Form.Control 
              as="select"
              name="sanitary_grade"
              defaultValue={this.state.sanitary_grade}
              onChange={this.handleChange}>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
            </Form.Control>
          </Col>

          <Col>
            <Form.Label>Cuisine Type</Form.Label>
            <Form.Control 
              as="select"
              name="cuisine_type"
              defaultValue={this.state.cuisine_type || 'Other'}
              onChange={this.handleChange}>
                <option value='Pizzera'>Pizzeria</option>
                <option value='Italian'>Italian</option>
                <option value='Bar'>Bar</option>
                <option calue='Other'>Other</option>
            </Form.Control>
          </Col>
          </Form.Row>
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            required  
            type="text"
            name="street" 
            placeholder="Enter Address"
            defaultValue={this.state.street}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>City</Form.Label>
              <Form.Control
                required  
                type="text" 
                name="city"
                placeholder="City"
                defaultValue={this.state.city}
                onChange={this.handleChange}
              />
            </Col>
            <Col>
              <Form.Label>State</Form.Label>
              <Form.Control
                required 
                type="text" 
                name="state"
                placeholder="State"
                defaultValue={this.state.state}
                onChange={this.handleChange}
              />
            </Col>

            <Col>
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                required 
                type="text" 
                name="zipcode"
                placeholder="zipcode"
                defaultValue={this.state.zipcode}
                onChange={this.handleChange}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        <Link to={`/restaurant/${this.props.id}`}><Button variant="danger" size='lg' block>Cancel</Button></Link>
        <br/>
        <Button variant="success" type="submit" size='lg' block>
          Save Changes
        </Button>
      </Form>
    )
  }

}

export default EditRestaurant;