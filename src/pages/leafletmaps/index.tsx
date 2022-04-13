import React from "react";
import axios from "axios";
import { MapContainer, TileLayer, GeoJSON, GeoJSONProps } from "react-leaflet";

const position = { lat: 0.7893, lng: 113.9213 };

interface IMapsLeafletState {
  dataGeojson: GeoJSONProps["data"] | null;
  selectedProvince: string;
  selectedKab: string;
}

class MapsLeaflet extends React.Component<{}, IMapsLeafletState> {
  constructor(props: IMapsLeafletState) {
    super(props);
    this.state = {
      dataGeojson: null,
      selectedProvince: "",
      selectedKab: "",
    };
  }

  componentDidMount() {
    // axios.get("https://raw.githubusercontent.com/rifani/geojson-political-indonesia/master/IDN_adm_1_province.json")
    // .then(resp => {
    //   this.setState({dataGeojson: resp.data})
    // })

    axios
      // .get(
      //   "https://raw.githubusercontent.com/rifani/geojson-political-indonesia/master/IDN_adm_2_kabkota.json"
      // )
      .get("/json/geojson_kab.json")
      .then((resp) => {
        // this.setState({ dataGeojson: resp.data });

        const features = resp.data.features;
        const selected = features.filter(
          (el: any) => el.properties.NAME_1 === "Jawa Tengah"
        );

        // console.log(selected);

        let newJson = resp.data;
        newJson = { ...newJson, features: selected };

        // console.log(newJson);

        this.setState({ dataGeojson: newJson });
      });
  }

  render() {
    return (
      <div>
        <MapContainer center={position} zoom={5} style={{ height: "90vh" }}>
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
              style={(feat) => {
                const color = feat?.properties.VALUE_COLOR || "blue";

                return { weight: 0.8, color: color };
              }}
              onEachFeature={(feat, layer) => {
                const provName = feat.properties.NAME_1;
                const kabName = feat.properties.NAME_2;
                const value = feat.properties.VALUE_COUNT;

                let PopupContent = `
                  <Popup>
                      <div><b>Provinsi</b>: ${provName}</div>
                      <div><b>Kabupaten/Kota</b>: ${kabName}</div>
                      <div><b>Nilai</b>: ${value}</div><b>
                  </Popup>
                `;
                layer.bindPopup(PopupContent);
              }}
              eventHandlers={{
                click: (e) => {
                  this.setState({
                    selectedProvince:
                      e.propagatedFrom.feature.properties.NAME_1 ||
                      ("" as string),
                    selectedKab:
                      e.propagatedFrom.feature.properties.NAME_2 ||
                      ("" as string),
                  });
                },
              }}
            />
          )}
        </MapContainer>
        <div>
          <div>Selected Province: {this.state.selectedProvince}</div>
          <div>Selected Kab / Kota: {this.state.selectedKab}</div>
        </div>
      </div>
    );
  }
}

export default MapsLeaflet;
