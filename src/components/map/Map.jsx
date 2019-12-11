import React, {Component} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {Link} from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {GetAllRestaurants, GetClosestRestaurants} from '../../actions/apicalls';

const stamenTonerTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const mapCenter = [40.7128, -73.9000];
const zoomLevel = 11;

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class Test extends Component {
  constructor(props){
    super(props);
    this.state = {
      restaurants: []
    }
  }
  async componentDidMount(){
    // Does API Request
    let r;
    if(this.props.userID) {
      r = await GetClosestRestaurants(this.props.userID);
    }
    else
      r = await GetAllRestaurants();
    this.setState({
      restaurants: r.restaurants || []
    });
  }

  render(){
    return(
      <div>
        <Map
        center={mapCenter}
        zoom={zoomLevel}
      >
        <TileLayer
          attribution={stamenTonerAttr}
          url={stamenTonerTiles}
        />
        { this.state.restaurants.map( (location,index) => (
            <Marker position = {[location.latitude, location.longitude]} key={index}>

            <Popup>
            {location.name} 
            <br/> 
            {location.rating} Stars
            <br/>
            <Link to={`/restaurant/${location.restaurant_id}`}> More info </Link>
            </Popup>

            </Marker>
          ))
        }
      </Map>

      </div>
    )
  }

} 

export default Test;