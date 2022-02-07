import React from 'react'
import GoogleMapReact from 'google-map-react';

interface IAnyReactComponent {
  text: string
  lat: number
  lng: number
}

const AnyReactComponent: React.FC<IAnyReactComponent> = (props) => <div>{props.text}</div>;

interface IGmapsProps {
  zoom: number
  center: {
    lat: number
    lng: number
  }  
}

class Gmaps extends React.Component<IGmapsProps, {}> {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <div>
        <div>gmaps</div>
        <div style={{ height: '80vh' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyA2YscPCa4jM9cqd1sEW1Vl-T_XRyBu-NU" }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={-3.596988}
              lng={113.405103}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}

export default Gmaps;