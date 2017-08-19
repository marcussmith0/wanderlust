var React = require('react');
var Mapper = require('./children/Mapper')

var helpers = require('./utils/helpers')

var Main = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Hello</h1>
                <Mapper />
            </div>
        );
    }
});

module.exports = Main;