// Include React
var React = require("react");

// Requiring our helper for making API calls
var helpers = require("../utilities/helpers.js");

// Create the Search Component
var Saved = React.createClass({
  // Here we set a generic state
  getInitialState: function() {
    return {
      doIneedThis: false
    };
  },
  _handleDelete: function(event) {
    // Collect the clicked article's id
    var articleMongoId = event.target.value;
    // Copy "this" into "that" so that component is accessible inside the functions.
    var that = this;
    // Send this data to the API endpoint to save it to Mongo
    helpers.apiDelete(articleMongoId).then(function(){
      // Query Mongo Again for new Data (this will re-render the component to account for deletion)
      helpers.apiGet().then(function(query){
        that.props._resetMongoResults(query.data);
      });
    });
  },
  // Here we render the Search Results Panel
  render: function() {
    var that = this;
    return (
      <div className="panel panel-default center-block" style={ {width: "80%", align: "center"} }>
        <div className="panel-heading">
          <h3 className="panel-title text-center" style={ {fontSize: "20px"} }><b>Your Saved Articles</b></h3>
        </div>
        <div className="panel-body">
          <ul className="list-group col-md-10 col-md-offset-1">
            {/* Use a map function to loop through an array in JSX */}
            {this.props.mongoResults.map(function(search, i) {
              return (
                <li key={search._id} className="list-group-item" style={ {borderWidth: "0px"} }>
                  <div className="input-group">
                    <div type="text" className="form-control">
                      <b><a href={search.url} target="_new" style={ {color: "black"} }>{search.title}</a></b>
                      <i style={ {float: "right"} }> {search.date.substring(0, 10)}</i>
                    </div>
                    <span className="input-group-btn">
                      <button className="btn" type="button" onClick={that._handleDelete} value={search._id} style={{background: "#B13C3C", color: "white"}}>Remove</button>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>      
    );
  }
});

// Export the component back for use in Main file
module.exports = Saved;