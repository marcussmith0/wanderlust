// Include React
var React = require('react');
// var googleMaps = require('react-google-maps');

var helpers = require('../utils/helpers')

var Mapper = React.createClass({
    render: function () {
        return (
            <div>
                <div id="map"></div>
            </div>
        );
    }
});

module.exports = Mapper;