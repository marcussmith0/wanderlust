// Contains the main-container div that holds the main layout. 
// This component is the Parent, and holds sub-components Search, Query, and Saved

// Include React
var React = require("react");

// Include the sub-components
var Query = require("./Query.jsx");
var Search = require("./Search.jsx");
var Saved = require("./Saved.jsx");

// Requiring our helper for making API calls
var helpers = require("../utilities/helpers.js");

// Create the Main Component
var Main = React.createClass({
  // Here we set a generic state
  getInitialState: function() {
    return {
      apiResults: [],
      mongoResults: [],
      searchTerms: ["","",""]
    };
  },
  // These functions allow children to update the parent.
  _setSearchFields: function(topic, start, end) {
    this.setState({ searchTerms: [topic, start, end] });
  },
  // Allow child to update Mongo data array
  _resetMongoResults: function(newData) {
    this.setState({ mongoResults: newData} );
  },
  // After the Main renders, collect the saved articles from the API endpoint
  componentDidMount: function() {
    // Hit the Mongo API to get saved articles.  This returns a Promise with a .then that we can use.
    helpers.apiGet().then(function(query) {
      this.setState({mongoResults: query.data});
    }.bind(this));
  },
  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function(prevProps, prevState) {
    // Only hit the API once; i.e. if the prev state does not equal the current
    if(this.state.searchTerms != prevState.searchTerms) {
      // Run the query for the address
      helpers.articleQuery(this.state.searchTerms[0], this.state.searchTerms[1], this.state.searchTerms[2]).then(function(data) {
        //console.log(data);
        this.setState({ apiResults: data });
      }.bind(this));
    }
  },
  // Here we render the parent Main, and the sub-components Query, Search, and Saved.
  render: function() {
    return (
      <div className="container" style = { {backgroundColor: "white", borderStyle: "solid", borderWidth: "1px"} }>
        <div className="page-header">
          <h1 className="text-center"><img style = { {width: "100%", paddingTop: "-10%"} } src = {"images/nytimes.png"} /></h1> 
          <h4 className="text-center">Use the "Search" function below to return articles of interest.  These articles can be clicked to retrieve the article for further reading, or saved for later.</h4>
        </div>
        <Query _setSearchFields = {this._setSearchFields} />
        <Search apiResults = {this.state.apiResults} _resetMongoResults = {this._resetMongoResults} />
        <Saved mongoResults = {this.state.mongoResults} _resetMongoResults = {this._resetMongoResults} /> 
      </div>
    );
  }
});

module.exports = Main;