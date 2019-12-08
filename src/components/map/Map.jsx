import React, {Component} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const stamenTonerTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const mapCenter = [39.9528, -75.1638];
const zoomLevel = 12;

class Test extends Component {
  constructor(){
    super();
    this.state = {
      locations: [
        { longitude: 12.234,
          latitude: 13.423
        }
      ],
      restaurants: []
    }
  }
  componentDidMount(){
    // Does API Request

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
        { this.state.locations.map( location => (
            <Marker position = {[location.latitude, location.longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
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