var React = require('react');
var Mapper = require('./children/Mapper')

var helpers = require('./utils/helpers')

var Main = React.createClass({
    render: function() {
        return (
            <div>
                <Mapper />
            </div>
        );
    }
});

module.exports = Main;