import React from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet-gpx";

export default class RouteMap extends React.Component {

  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    };
  }

  componentDidUpdate(prevProps) {

    if (this.props.gpx && this.props.gpx !== prevProps.gpx){
      this.updateMap();
    } 

  }

  updateMap() {
    this.parse(this.props.gpx);
  }
  
  parse (filePath) {

    if (this.refs.mapInstance.leafletElement !== null) {
      this.refs.mapInstance.leafletElement.eachLayer((layer) => {this.refs.mapInstance.leafletElement.removeLayer(layer);});
    }
	
	if (this.control != null) {
		this.control.remove();
	}

    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.refs.mapInstance.leafletElement);

    var track = new L.GPX(filePath, {
        async: true,
        polyline_options: {
          color: "green",
          opacity: 0.75,
          weight: 3,
          lineCap: "round"
        },
        marker_options: {
          wptIcons: {
			  "": new L.Icon({
                iconUrl: "img/pin.png"
              }),
              "Triangle": new L.Icon({
                iconUrl: "img/triangle.png"
              }),
              "Circle": new L.Icon({
                iconUrl: "img/circle.png"
              }),
              "Square": new L.Icon({
                iconUrl: "img/square.png"
              }),
              "Pin": new L.Icon({
                iconUrl: "img/pin.png"
              }),
              "Flag": new L.Icon({
                iconUrl: "img/flag.png"
              })
          },
          pointMatchers: [
            {
              regex: /.\*?/,
              icon: new L.Icon({
                iconUrl: "img/pin.png"
              })
            }
          ],
          startIconUrl: "img/pin-icon-start.png",
          endIconUrl:   "img/pin-icon-end.png",
          shadowUrl:    "img/pin-shadow.png",
        },
        gpx_options: {
          parseElements: ["track", "route", "waypoint"],
          joinTrackSegments: false
        },
      }).on("addpoint", function(e) {
        if (e.element.getElementsByTagName("name")[0] != null) {
          var marker = e.point;
          marker.bindPopup(e.element.getElementsByTagName("name")[0].innerHTML);
        }
      }).on("loaded", ((e) => {var gpx = e.target;
                               this.refs.mapInstance.leafletElement.fitBounds(gpx.getBounds());}))
                               .addTo(this.refs.mapInstance.leafletElement);

    this.control = L.control.layers({}, {"GPX":track}).addTo(this.refs.mapInstance.leafletElement);
    this.refs.mapInstance.leafletElement.dragging.disable();
    this.refs.mapInstance.leafletElement.dragging.enable();
}

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref = "mapInstance">
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
      </Map>
    );
  }
}
