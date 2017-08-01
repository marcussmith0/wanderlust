// Include React
var React = require("react");

var Query = React.createClass({
  getInitialState: function() {
    return {
      topic: "",
      startYear: "",
      endYear: ""
    };
  },
  // Upon submitting,
  Submit: function(event) {
    event.preventDefault();
    // Set the parent to have the search terms
    this.props._setSearchFields(this.state.topic, this.state.startYear, this.state.endYear);  
  },
  Change: function(e) {
    this.setState({topic: e.target.value});
  },
  startChange: function(e) {
    this.setState({startYear: e.target.value});
  },
  endChange: function(e) {
    this.setState({endYear: e.target.value});
  },
  // Render the Query User Form
  render: function() {
    return (
      <div className="panel panel-default center-block" style={ {width: "80%", align: "center"} }>
        <div className="panel-heading">
          <h2 className="panel-title text-center" style={ {fontSize: "26px"} }><b>Search our database for articles of interest.</b></h2>
          <h5 className="text-center">*All three fields are required</h5>
        </div>
        <div className="panel-body text-center">
          <form role="form" onSubmit={this.Submit}>
            <div className="form-group col-md-offset-4 col-md-4">
              <label htmlFor="topic" className="text-center">Topic</label>
              <input type="text" className="form-control text-center" id="topic" onChange={this.Change} />
            </div>
            <br />
            <div className="form-group col-md-offset-4 col-md-4">
              <label htmlFor="startYear">Start Year</label>
              <input type="text" className="form-control text-center" id="startYear" onChange={this.startChange} />
            </div>
            <br />
            <div className="form-group col-md-offset-4 col-md-4">
              <label htmlFor="endYear">End Year</label>
              <input type="text" className="form-control text-center" id="endYear" onChange={this.endChange} />
            </div>
            <br />
            <button type="submit" className="btn col-md-offset-5 col-md-2" id="searchBtn" style={{background: "#475892", color: "white"}}>Search</button>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Query;