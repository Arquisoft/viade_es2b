import L from 'leaflet-gpx';
import triangle from './img/triangle.png';
import circle from './img/circle.png';
import square from './img/square.png';
import pin from './img/pin.png';
import flag from './img/flag.png';

var mapInstance;

export default {

    parse: function (filePath) {

        if (mapInstance != null)
          mapInstance.remove();

        var xmlDoc = new DOMParser().parseFromString(filePath,'text/xml');
        var contador = 0;
        var points = null;
        if (xmlDoc.getElementsByTagName('rtept').length != 0) {
          points = xmlDoc.getElementsByTagName('rtept');
          if (xmlDoc.getElementsByTagName('wpt').length != 0)
            contador = contador - xmlDoc.getElementsByTagName('wpt').length;
        }
        else if (xmlDoc.getElementsByTagName('trkpt').length != 0) {
          points = xmlDoc.getElementsByTagName('trkpt');
          if (xmlDoc.getElementsByTagName('wpt').length != 0)
            contador = contador - xmlDoc.getElementsByTagName('wpt').length;
        }

        var container = L.DomUtil.get('map');
        if (container != null) {
          container._leaflet_id = null;
        }

        var map = L.map('map');
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

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
                    iconUrl: triangle
                  }),
                  'Circle': new L.Icon({
                    iconUrl: circle
                  }),
                  'Square': new L.Icon({
                    iconUrl: square
                  }),
                  'Pin': new L.Icon({
                    iconUrl: pin
                  }),
                  'Flag': new L.Icon({
                    iconUrl: flag
                  })
              },
              pointMatchers: [
                {
                  regex: /.\*?/,
                  icon: new L.Icon({
                    iconUrl: pin
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
            map.fitBounds(gpx.getBounds());
        }).addTo(map);

        L.control.layers({}, {'GPX':track}).addTo(map);
        map.dragging.disable();
        map.dragging.enable();
        mapInstance = map;
    }
};