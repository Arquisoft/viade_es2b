import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import L from 'leaflet-gpx';

export default class RouteMap extends React.Component {

  constructor() {
    super()
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
    this.mapInstance = null
  }
  
  parse (filePath) {

    if (this.mapInstance !== null) {
      this.mapInstance.eachLayer(function(layer){
        this.mapInstance.removeLayer(layer);
      });
    }

    var xmlDoc = new DOMParser().parseFromString(filePath,'text/xml');
    var contador = 0;
    var points = null;
    if (xmlDoc.getElementsByTagName('rtept').length !== 0) {
      points = xmlDoc.getElementsByTagName('rtept');
      if (xmlDoc.getElementsByTagName('wpt').length !== 0)
        contador = contador - xmlDoc.getElementsByTagName('wpt').length;
    }
    else if (xmlDoc.getElementsByTagName('trkpt').length !== 0) {
      points = xmlDoc.getElementsByTagName('trkpt');
      if (xmlDoc.getElementsByTagName('wpt').length !== 0)
        contador = contador - xmlDoc.getElementsByTagName('wpt').length;
    }

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.mapInstance);

    var track = new L.GPX(filePath, {
        async: true,
        polyline_options: {
          color: 'green',
          opacity: 0.75,
          weight: 3,
          lineCap: 'round'
        },
        marker_options: {
          wptIcons: {
              'Triangle': new L.Icon({
                iconUrl: '../img/triangle.png'
              }),
              'Circle': new L.Icon({
                iconUrl: '../img/circle.png'
              }),
              'Square': new L.Icon({
                iconUrl: '../img/square.png'
              }),
              'Pin': new L.Icon({
                iconUrl: '../img/pin.png'
              }),
              'Flag': new L.Icon({
                iconUrl: '../img/flag.png'
              })
          },
          pointMatchers: [
            {
              regex: /.\*?/,
              icon: new L.Icon({
                iconUrl: '../img/pin.png'
              })
            }
          ],
          startIconUrl: 'http://github.com/mpetazzoni/leaflet-gpx/raw/master/pin-icon-start.png',
          endIconUrl:   'http://github.com/mpetazzoni/leaflet-gpx/raw/master/pin-icon-end.png',
          shadowUrl:    'http://github.com/mpetazzoni/leaflet-gpx/raw/master/pin-shadow.png',
        },
        gpx_options: {
          parseElements: ['track', 'route', 'waypoint'],
          joinTrackSegments: false
        },
        
      }).on('addpoint', function(e) {
        var marker = e.point;
        if (points != null && contador >= 0 && contador < points.length) {
          console.log(points[contador].getElementsByTagName('name')[0].innerHTML);
          marker.bindPopup("Nombre del punto: " + points[contador].getElementsByTagName('name')[0].innerHTML);
        }
        contador++;
      }).on('loaded', function(e) {
        var gpx = e.target;
        this.mapInstance.fitBounds(gpx.getBounds());
    }).addTo(this.mapInstance);

    L.control.layers({}, {'GPX':track}).addTo(this.mapInstance);
    this.mapInstance.dragging.disable();
    this.mapInstance.dragging.enable();
}

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref = {(ref) => { this.mapInstance = ref; }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      </Map>
    );
  }
}