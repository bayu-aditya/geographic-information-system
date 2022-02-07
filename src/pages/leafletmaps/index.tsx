import React from 'react'
import axios from 'axios'
import { 
  MapContainer, 
  TileLayer, 
  GeoJSON,
  GeoJSONProps } from "react-leaflet";

const position = {lat: 0.7893, lng: 113.9213}


interface IMapsLeafletState {
  dataGeojson: GeoJSONProps["data"] | null
  selectedProvince: string
}

class MapsLeaflet extends React.Component<{}, IMapsLeafletState> {
  constructor(props: IMapsLeafletState) {
    super(props)
    this.state = {
      dataGeojson: null,
      selectedProvince: "",
    }
  }

  componentDidMount() {
    axios.get("https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json")
    .then(resp => {
      this.setState({dataGeojson: resp.data})
    })
  }
  
  render() {
    return (
      <div>
        <MapContainer center={position} zoom={5} style={{height: '90vh'}}> 
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <TileLayer
            attribution='&copy; OSM contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          /> */}
          {this.state.dataGeojson && (
            <GeoJSON 
              attribution="attribution hupla"
              data={this.state.dataGeojson}
              style={{weight: .5, color: 'red'}}
              eventHandlers={{
                click: (e) => {
                  console.log(e)
                  this.setState({selectedProvince: e.propagatedFrom.feature.properties.Propinsi as string})
                }
              }}
            />
          )}
        </MapContainer>
        <div>Selected Province: {this.state.selectedProvince}</div>
      </div>
    )
  }
}

export default MapsLeaflet
