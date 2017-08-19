// Include React
var React = require('react');
// var googleMaps = require('react-google-maps');

var helpers = require('../utils/helpers')

var Mapper = React.createClass({
    render: function () {
        return (
            <div>
                {/* <div id="floating-panel"></div>
                    <input id="latlng" type="text" value="40.714224,-73.961452" />
                    <input id="submit" type="button" value="Reverse Geocode" /> */}
                <div id="map"></div>
            </div>
        );
    }
});

module.exports = Mapper;