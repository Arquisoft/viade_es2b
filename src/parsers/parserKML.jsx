import React from 'react';
import L from 'leaflet';

class RoutesParser extends React.Component{

    parse(filePath) {

        var map = L.map('routesMap');
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        var track = new L.KML(filePath, {
            async: true,
            marker_options: {
              startIconUrl: 'http://github.com/mpetazzoni/leaflet-gpx/raw/master/pin-icon-start.png',
              endIconUrl:   'http://github.com/mpetazzoni/leaflet-gpx/raw/master/pin-icon-end.png',
              shadowUrl:    'http://github.com/mpetazzoni/leaflet-gpx/raw/master/pin-shadow.png',
            },
          }).on('loaded', function(e) {
            var kml = e.target;
            map.fitBounds(kml.getBounds());
        }).addTo(map);

        L.control.layers({}, {'Track':track}).addTo(map);
    }
};

var parser = new RoutesParser();